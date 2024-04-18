const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;
      const existingCommand = await applicationCommands.cache.find(
          (cmd) => cmd.name === name
          );
          
      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`삭제 ${name}`);
          continue;
        }
        

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`수정 : ${name}`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(`삭제하는 중 -- ${name} `);
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });
      }
      console.log(`command 등록 ${name}`);
    }
  } catch (error) {
    console.log(error);
  }
};

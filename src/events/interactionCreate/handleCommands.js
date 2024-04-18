const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();
    
  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {

        console.log(commandObject.devOnly)
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: "개발자만 이 명령어를 쓸 수 있습니다.",
          ephemeral: true,
        });
        return;
      }
    }
    if (commandObject.testOnly) {
        if (!(interaction.guild.id === testServer)) {
          interaction.reply({
            content: "이 명령어는 여기서 실행할 수 없습니다",
            ephemeral: true,
          });
          return;
        }
      }
  
      if (commandObject.permissionsRequired?.length) {
        for (const permisson of commandObject.permissionsRequired) {
          if (!interaction.member.perssions.has(permisson)) {
            interaction.reply({
              content: "권한이 없습니다",
              ephemeral: true,
            });
            return;
          }
        }
      }
  
      if (commandObject.botPermissions?.length) {
        for (const permission of commandObject.botPermissions) {
          const bot = interaction.guild.members.me;
  
          if (!bot.permissions.has(permission)) {
            interaction.reply({
              content: "권한이 부족합니다.",
              ephemeral: true,
            });
            return;
          }
        }
      }
      await commandObject.callback(client, interaction);

  } catch (error) {
    console.log(`커맨드 오류 : ${error}`);
  }
};

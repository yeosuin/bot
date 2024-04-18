const { ActivityType } = require("discord.js");
const getAllFiles = require("../utils/getAllFiles");
const path = require("path");

module.exports = (client) => {

    let status = [
        {
          name: "디코 개발 공부",
          type: ActivityType.Playing,
        },
        {
          name: "개발",
          type: ActivityType.Watching,
          url: "https://youtu.be/OqxHy8sCtvA?si=vZ5l_7pgYxndYmMl",
        },
        {
          name: "노래",
          type: ActivityType.Listening,
        },
      ];

    client.on("ready", (c) => {
      
          /* setInterval(() => {
            let random = Math.floor(Math.random() * status.length)
            client.user.setActivity((status[random]))
      
          }, 10000); */
      
        client.user.setActivity((status[0]))
      });

      const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

      for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a,b) => a > b);

        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        
        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
            }
        })
      }
}
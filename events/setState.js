const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.user.setActivity('activity', { type: ActivityType.Playing });
};
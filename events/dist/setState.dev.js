"use strict";

var _require = require("discord.js"),
    ActivityType = _require.ActivityType;

module.exports = function (client) {
  client.user.setActivity('activity', {
    type: ActivityType.Playing
  });
};
"use strict";

var _require = require('discord.js'),
    Events = _require.Events;

module.exports = {
  name: Events.MessageCreate,
  once: false,

  /**
   *
   * @param {import("discord.js").Message} message
   */
  execute: function execute(message) {
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (message.content === '안녕') {
              message.reply({
                content: "**\uBC18\uAC11\uC2B5\uB2C8\uB2E4!**"
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
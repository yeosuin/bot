"use strict";

var _require = require('discord.js'),
    Events = _require.Events;

module.exports = {
  name: Events.ClientReady,
  once: true,

  /**
   *
   * @param {import("discord.js").Client} client
   */
  execute: function execute(client) {
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("".concat(client.user.tag, " \uB85C\uADF8\uC778"));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
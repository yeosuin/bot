"use strict";

require("dotenv").config();

var _require = require("discord.js"),
    REST = _require.REST,
    Routes = _require.Routes,
    ApplicationCommandOptionType = _require.ApplicationCommandOptionType;

var commands = [{
  name: "add",
  description: "Adds two numbers",
  options: [{
    name: "first-number",
    description: "첫번째 숫자",
    type: ApplicationCommandOptionType.Number,
    choices: [{
      name: "one",
      value: 1
    }, {
      name: "two",
      value: 2
    }, {
      name: "three",
      value: 3
    }],
    required: true
  }, {
    name: "second-number",
    description: "두번째 숫자",
    type: ApplicationCommandOptionType.Number,
    required: true
  }]
}, {
  name: "embed",
  description: "Sends an embed!"
}];
var rest = new REST({
  version: "10"
}).setToken(process.env.TOKEN);

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("Registering slash commands...");
          _context.next = 4;
          return regeneratorRuntime.awrap(rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
            body: commands
          }));

        case 4:
          console.log("Slash commands 완료 ");
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("error : ".concat(_context.t0));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
})();
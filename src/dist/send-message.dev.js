"use strict";

require("dotenv").config();

var _require = require("@discordjs/builders"),
    ActionRowBuilder = _require.ActionRowBuilder,
    ButtonBuilder = _require.ButtonBuilder;

var _require2 = require("discord.js"),
    Client = _require2.Client,
    IntentsBitField = _require2.IntentsBitField,
    EmbedBuilder = _require2.EmbedBuilder,
    ButtonStyle = _require2.ButtonStyle;

var client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});
var roles = [{
  id: '1229976290879078431',
  label: 'Red'
}, {
  id: '1229976366233948180',
  label: 'Blue'
}, {
  id: '1229976403664048128',
  label: 'Green'
}];
client.on('ready', function _callee(c) {
  var channel, row;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.channels.cache.get(process.env.GUILD_ID));

        case 3:
          channel = _context.sent;

          if (channel) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return");

        case 6:
          row = new ActionRowBuilder();
          roles.forEach(function (role) {
            row.components.push(new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary));
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(channel.send({
            content: '역할을 고르시오',
            components: [row]
          }));

        case 10:
          process.exit();
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // Log in to Discord with your client's token

client.login(process.env.TOKEN);
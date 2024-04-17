"use strict";

require("dotenv").config();

var _require = require("discord.js"),
    Client = _require.Client,
    IntentsBitField = _require.IntentsBitField,
    EmbedBuilder = _require.EmbedBuilder;

var client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});
client.on("ready", function (c) {
  console.log("\u2611\uFE0F  ".concat(c.user.tag));
});
client.once("interactionCreate", function (interaction) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    var num1 = interaction.options.get("first-number").value;
    var num2 = interaction.options.get("second-number").value;
    interaction.reply("\uCD1D \uD569\uC740 : ".concat(num1 + num2));
  }

  if (interaction.commandName === "embed") {
    var embed = new EmbedBuilder().setTitle("Embed title").setDescription("This is an embed description").setColor("Random").addFields({
      name: "Field tile",
      value: "same random value",
      inline: true
    }, {
      name: "2Field tile",
      value: "same random value",
      inline: true
    });
    interaction.reply({
      embeds: [embed]
    });
  }
});
client.on("messageCreate", function (message) {
  if (message.content === "embed") {
    var embed = new EmbedBuilder().setTitle("Embed title").setDescription("This is an embed description").setColor("Random").addFields({
      name: "Field tile",
      value: "same random value",
      inline: true
    }, {
      name: "2Field tile",
      value: "same random value",
      inline: true
    });
    message.channel.send({
      embeds: [embed]
    });
  }
}); // Log in to Discord with your client's token

client.login(process.env.TOKEN);
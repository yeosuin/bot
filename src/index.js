require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

client.once("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`총 합은 : ${num1 + num2}`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("미피 봇입니다.")
      .setDescription("미피 봇은 개발 공부 중입니다.")
      .setColor("Random")
      .addFields(
        {
          name: "Field tile",
          value: "same random value",
          inline: true,
        },
        {
          name: "2Field tile",
          value: "same random value",
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed title")
      .setDescription("This is an embed description")
      .setColor("Random")
      .addFields(
        {
          name: "Field tile",
          value: "same random value",
          inline: true,
        },
        {
          name: "2Field tile",
          value: "same random value",
          inline: true,
        }
      );
    message.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "난 역할을 찾을 수 없어",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`역할 ${role} 지움`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`역할 ${role} 새로 가짐`);
  } catch (error) {
    console.log(error);
  }
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

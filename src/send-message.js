require("dotenv").config();
const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { Client, IntentsBitField, EmbedBuilder, ButtonStyle } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: '1229976290879078431',
    label: 'Red',
  },
  {
    id: '1229976366233948180',
    label: 'Blue',
  },
  {
    id: '1229976403664048128',
    label: 'Green',
  },
];

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('929779067513892927'); //채널 ID
    if (!channel) return;
    const row = new ActionRowBuilder();

    roles.forEach((role) => {
        row.components.push(
            new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
        );
    });

    await channel.send({
        content: '역할을 고르시오',
        components: [row],
    });
    process.exit()
  } catch (error) {
    console.log(error);
  } 
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

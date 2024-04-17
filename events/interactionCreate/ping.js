const { SlashCommandBuilder } = require('discord.js');  

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  
  /** 상호작용 실행코드 */
  async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
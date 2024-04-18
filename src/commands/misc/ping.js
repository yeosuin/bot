module.exports = {
    name : 'ping',
    description: 'bot Pong에 대해서 가르쳐 줍니다.',

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`Client ${ping}ms | Websocket: ${client.ws.ping}ms`)
    }
}
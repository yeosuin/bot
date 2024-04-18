const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")


module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "이유가 없는 추방";

        
        await interaction.deferReply(`${client.member}이 추방..`);


        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.deferReply(`해당 사용자는 서버에 없습니다`);
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply(`아쉽지만 서버장은 내보낼 수 업습니다`);
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`역할이 같거나 높은 사람을 추방할 수 없습니다`);
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(`난 너랑 역할이 같거나 높기 때문에 추방할 수 업어`);
            return;
        }

        try {
            await targetUser.ban({ reason });
            await interaction.editReply(`유저 ${targetUser} 추방되었어요 이유는 ${reason} 이거랍니다~`);
        } catch (error) {
            console.log(`추방 관련 에러 ${error}`);
        }
    },

    name : 'ban',
    description: '추방하고 싶은 멤버는?',
    // devOnly: Boolean,
    // testOnly: Boolean,

    options: [
        {
            name: 'target-user',
            description: '추방할 유저를 고르시오.',
           
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: '추방할 이유를 말하시오.',
            type: ApplicationCommandOptionType.String,
        }
    ],
    PermissionRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
};
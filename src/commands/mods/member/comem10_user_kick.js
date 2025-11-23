// src/commands/mods/member/comem10_user_kick.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user_kick')
        .setDescription('Đuổi một thành viên khỏi server')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('Người cần kick')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Lý do kick'))
        // Chỉ cho phép người có quyền KICK_MEMBERS sử dụng lệnh này
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction, client) {
        const scriptName = 'scmem10_user_kick';
        const script = client.scripts.get(scriptName);
        if (!script) return interaction.reply({ content: `❌ Lỗi script: ${scriptName}`, ephemeral: true });
        
        await script(interaction, client);
    },
};
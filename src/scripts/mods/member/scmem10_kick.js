// src/scripts/mods/member/scmem10_kick.js
const { PermissionFlagsBits } = require('discord.js');

module.exports = async (interaction, client) => {
    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'Không có lý do';
    const member = await interaction.guild.members.fetch(targetUser.id);

    // 1. Kiểm tra xem Bot có quyền Kick không (dù đã set ở command nhưng check lại cho chắc)
    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) {
        return interaction.reply({ content: '❌ Bot không có quyền Kick thành viên!', ephemeral: true });
    }

    // 2. Kiểm tra xem user đó có quyền cao hơn Bot không
    if (!member.kickable) {
        return interaction.reply({ content: '❌ Không thể kick người này (Họ có quyền cao hơn hoặc bằng Bot).', ephemeral: true });
    }

    // 3. Thực hiện Kick
    try {
        await member.kick(reason);
        await interaction.reply({ content: `✅ Đã kick **${targetUser.tag}** khỏi server.\n📝 Lý do: ${reason}` });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Có lỗi xảy ra khi cố gắng kick thành viên này.', ephemeral: true });
    }
};
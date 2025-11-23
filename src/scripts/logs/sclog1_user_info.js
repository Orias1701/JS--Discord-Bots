// src/scripts/logs/sclog1_user_info.js
const { EmbedBuilder } = require('discord.js');

module.exports = async (interaction, client) => {
    // Lấy user được tag, nếu không có thì lấy chính người gõ lệnh
    const targetUser = interaction.options.getUser('target') || interaction.user;
    
    // Lấy thông tin thành viên trong Guild (để xem role, ngày join)
    const member = await interaction.guild.members.fetch(targetUser.id);

    // Format ngày giờ
    const joinedAt = member.joinedAt.toLocaleDateString("vi-VN");
    const createdAt = targetUser.createdAt.toLocaleDateString("vi-VN");

    // Lấy danh sách roles (bỏ role @everyone)
    const roles = member.roles.cache
        .filter(r => r.name !== '@everyone')
        .map(r => `<@&${r.id}>`)
        .join(', ') || "Không có";

    const embed = new EmbedBuilder()
        .setColor(member.displayHexColor)
        .setTitle(`✦ ${targetUser.username}`)
        .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'ID', value: targetUser.id, inline: true },
            { name: 'Tên hiển thị', value: member.displayName, inline: true },
            { name: 'Ngày tạo acc', value: createdAt, inline: true },
            { name: 'Ngày vào server', value: joinedAt, inline: true },
            { name: 'Roles', value: roles }
        )
        // .setFooter({ text: ``, iconURL: interaction.user.displayAvatarURL() })
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
};
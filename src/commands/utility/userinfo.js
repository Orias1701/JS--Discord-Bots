// File: src/commands/utility/userinfo.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Xem thông tin của thành viên')
        .addUserOption(option => option.setName('target').setDescription('Người cần xem')),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user;
        const member = await interaction.guild.members.fetch(targetUser.id);

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Thông tin: ${targetUser.tag}`)
            .setThumbnail(targetUser.displayAvatarURL())
            .addFields(
                { name: 'ID', value: targetUser.id, inline: true },
                { name: 'Ngày vào Server', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: 'Ngày tạo TK', value: `<t:${parseInt(targetUser.createdTimestamp / 1000)}:R>`, inline: true },
                { name: 'Roles', value: member.roles.cache.map(r => r).join(' ').replace('@everyone', '') || 'Không có' }
            );

        await interaction.reply({ embeds: [embed] });
    },
};
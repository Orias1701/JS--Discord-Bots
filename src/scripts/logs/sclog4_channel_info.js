// src/scripts/logs/sclog4_channel_info.js
const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = async (interaction, client) => {
    const channel = interaction.options.getChannel('target') || interaction.channel;

    let typeName = 'Unknown';
    if (channel.type === ChannelType.GuildText) typeName = 'Text Channel';
    if (channel.type === ChannelType.GuildVoice) typeName = 'Voice Channel';
    if (channel.type === ChannelType.GuildCategory) typeName = 'Category';
    if (channel.type === ChannelType.GuildAnnouncement) typeName = 'Announcement';

    const embed = new EmbedBuilder()
        .setColor('#e67e22')
        .setTitle(`✦ Channel: ${channel.name}`)
        .addFields(
            { name: 'ID', value: channel.id, inline: true },
            { name: 'Loại', value: typeName, inline: true },
            { name: 'Thuộc Category', value: channel.parent ? channel.parent.name : 'Không có', inline: true },
            { name: 'NSFW', value: channel.nsfw ? 'Có' : 'Không', inline: true },
            { name: 'Slowmode', value: channel.rateLimitPerUser ? `${channel.rateLimitPerUser} giây` : 'Tắt', inline: true },
            { name: 'Ngày tạo', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:f>`, inline: false }
        );

    if (channel.topic) {
        embed.setDescription(`**Topic:** ${channel.topic}`);
    }

    await interaction.reply({ embeds: [embed] });
};
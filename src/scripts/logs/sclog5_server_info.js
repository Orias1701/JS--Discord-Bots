// src/scripts/logs/sclog5_server_info.js
const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = async (interaction, client) => {
    // [FIX] Báo cho Discord biết bot đang xử lý để tránh timeout và tạo tin nhắn chờ
    await interaction.deferReply(); 

    const guild = interaction.guild;
    
    // Đảm bảo fetch đầy đủ dữ liệu mới nhất
    await guild.fetch();
    const owner = await guild.fetchOwner();

    // Thống kê channels chi tiết
    const channels = guild.channels.cache;
    const totalChannels = channels.size;
    const categories = channels.filter(c => c.type === ChannelType.GuildCategory).size;
    const textChannels = channels.filter(c => c.type === ChannelType.GuildText).size;
    const voiceChannels = channels.filter(c => c.type === ChannelType.GuildVoice).size;
    const forumChannels = channels.filter(c => c.type === ChannelType.GuildForum).size;
    const stageChannels = channels.filter(c => c.type === ChannelType.GuildStageVoice).size;
    const newsChannels = channels.filter(c => c.type === ChannelType.GuildAnnouncement).size;
    const mainImageURL = "https://github.com/Orias1701/Resources--Discord-Bots/blob/main/img/pet.png?raw=true";
    // Tính toán channel "khác"
    const otherChannels = totalChannels - (categories + textChannels + voiceChannels + forumChannels + stageChannels + newsChannels);

    const embed = new EmbedBuilder()
        .setColor('#1abc9c')
        .setTitle(`✦ Server: ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setImage(guild.bannerURL({ size: 1024 }))
        .addFields(
            { name: 'Owner', value: `<@${owner.id}>`, inline: true },
            { name: 'Server ID', value: guild.id, inline: true },
            { name: 'Creation', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
            { name: 'Roles', value: `**${guild.roles.cache.size}** roles`, inline: true },
            { name: 'Members', value: `**${guild.memberCount}** users`, inline: true },
            { name: 'Boost', value: `Level ${guild.premiumTier || 0}`, inline: true },
            { 
                name: `Categories: ${categories}   -   Channels: ${totalChannels - categories}`, 
                value: "",
                inline: false 
            }
        )
        .setImage(mainImageURL)
        .setTimestamp();

    // Sử dụng editReply vì đã deferReply ở trên
    await interaction.editReply({ embeds: [embed] });
};
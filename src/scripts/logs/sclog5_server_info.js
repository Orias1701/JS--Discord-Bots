// src/scripts/logs/sclog5_server_info.js

const { EmbedBuilder, ChannelType } = require('discord.js');
const { formatShortDate } = require('../../utils/date');
const config = require('../../.config');
const mainImageURL = config.resource.mainImageURL;

module.exports = async (interaction, client) => {
    await interaction.deferReply(); 

    const guild = interaction.guild;
    
    await guild.fetch();
    const owner = await guild.fetchOwner();

    const channels = guild.channels.cache;
    const totalChannels = channels.size;
    const categories = channels.filter(c => c.type === ChannelType.GuildCategory).size;
    const textChannels = channels.filter(c => c.type === ChannelType.GuildText).size;
    const voiceChannels = channels.filter(c => c.type === ChannelType.GuildVoice).size;
    const forumChannels = channels.filter(c => c.type === ChannelType.GuildForum).size;
    const stageChannels = channels.filter(c => c.type === ChannelType.GuildStageVoice).size;
    const newsChannels = channels.filter(c => c.type === ChannelType.GuildAnnouncement).size;
    
    const numChannels = totalChannels - categories;
    const created = new Date(guild.createdTimestamp);

    const formattedDate = formatShortDate(created);

    const embed = new EmbedBuilder()
        .setColor('#1abc9c')
        .setTitle(`✦ Server: ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setImage(guild.bannerURL({ size: 1024 }))
        .addFields(
            { name: 'Server ID', value: guild.id, inline: false },
            { name: 'Owner', value: `<@${owner.id}>`, inline: true },
            { name: 'Boost', value: `Level ${guild.premiumTier || 0}`, inline: true },
            { name: 'Creation', value: formattedDate, inline: true },
            { name: 'Roles', value: `**${guild.roles.cache.size}** roles`, inline: true },
            { name: 'Members', value: `**${guild.memberCount}** users`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: `Categories`, value: `${categories}`, inline: true },
            { name: `Channels`, value: `${numChannels}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true }
        ).setImage(mainImageURL).setTimestamp();

    // Sử dụng editReply vì đã deferReply ở trên
    await interaction.editReply({ embeds: [embed] });
};
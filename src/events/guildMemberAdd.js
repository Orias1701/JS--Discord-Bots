// File: src/events/guildMemberAdd.js

const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        // Tìm kênh có tên là "welcome" hoặc "general" hoặc "chat" để gửi lời chào
        // Bạn có thể đổi tên kênh này cho khớp với server của bạn
        const channel = member.guild.channels.cache.find(ch => 
            ch.name === 'welcome' || ch.name === 'general' || ch.name === 'chat'
        );

        if (!channel) return;

        const welcomeEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎉 Thành viên mới!')
            .setDescription(`Chào mừng ${member} đã đến với server **${member.guild.name}**!`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

        channel.send({ embeds: [welcomeEmbed] });
    },
};
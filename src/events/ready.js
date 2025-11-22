// File: src/events/ready.js

const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`✅ Bot đã sẵn sàng! Đăng nhập: ${client.user.tag}`);
        // Set trạng thái cho bot
        client.user.setActivity('Server của bạn | /help');
    },
};
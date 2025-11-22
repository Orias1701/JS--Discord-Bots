// File: src/commands/system/ping.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Kiểm tra độ trễ của bot'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Đang đo...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`🏓 Pong! Độ trễ: **${latency}ms**. API: **${interaction.client.ws.ping}ms**.`);
    },
};
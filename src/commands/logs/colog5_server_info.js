// src/commands/logs/colog5_server_info.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server_info')
        .setDescription('Xem thông tin chi tiết về Server này'),

    async execute(interaction, client) {
        const script = client.scripts.get('sclog5_server_info');
        if (!script) return interaction.reply({ content: '❌ Script not found', ephemeral: true });
        await script(interaction, client);
    },
};
// src/commands/services/game/cogam3_game_flipcoin.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flipcoin')
        .setDescription('Tung một đồng xu (Sấp/Ngửa)'),

    async execute(interaction, client) {
        const scriptName = 'cogam3_game_flipcoin';
        const script = client.scripts.get(scriptName);
        if (!script) return interaction.reply({ content: `❌ Lỗi script: ${scriptName}`, ephemeral: true });
        
        await script(interaction, client);
    },
};
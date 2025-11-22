// File: src/commands/fun/dice.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Đổ xúc xắc (1-6)'),
    async execute(interaction) {
        const result = Math.floor(Math.random() * 6) + 1;
        await interaction.reply(`🎲 Bạn đã đổ được: **${result}**`);
    },
};
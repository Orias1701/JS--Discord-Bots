// src/commands/fun/rps.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Logic game lấy từ file mẫu game.js của bạn, nhưng tối giản hóa
const choices = [
    { name: 'Kéo ✂️', value: 'scissors', beats: 'paper' },
    { name: 'Búa 🪨', value: 'rock', beats: 'scissors' },
    { name: 'Bao 📄', value: 'paper', beats: 'rock' }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps') // Tên lệnh: /rps
        .setDescription('Chơi Oẳn Tù Tì với Bot')
        .addStringOption(option =>
            option.setName('chon')
                .setDescription('Chọn nước đi của bạn')
                .setRequired(true)
                .addChoices(
                    { name: 'Kéo ✂️', value: 'scissors' },
                    { name: 'Búa 🪨', value: 'rock' },
                    { name: 'Bao 📄', value: 'paper' }
                )),
                
    async execute(interaction) {
        // 1. Lấy lựa chọn của người chơi
        const userChoiceValue = interaction.options.getString('chon');
        const userChoice = choices.find(c => c.value === userChoiceValue);

        // 2. Bot chọn ngẫu nhiên
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        // 3. So sánh kết quả
        let resultMessage = '';
        let color = 0x0099FF; // Màu xanh mặc định

        if (userChoice.value === botChoice.value) {
            resultMessage = '🤝 Hòa rồi! Cả hai đều chọn giống nhau.';
            color = 0xFFA500; // Màu cam
        } else if (userChoice.beats === botChoice.value) {
            resultMessage = '🏆 Bạn thắng! Chúc mừng nhé.';
            color = 0x00FF00; // Màu xanh lá
        } else {
            resultMessage = '🤖 Bot thắng! Gà quá đi thôi.';
            color = 0xFF0000; // Màu đỏ
        }

        // 4. Tạo Embed đẹp mắt để trả lời
        const embed = new EmbedBuilder()
            .setTitle('🎮 Kết quả Oẳn Tù Tì')
            .setColor(color)
            .addFields(
                { name: 'Bạn chọn', value: userChoice.name, inline: true },
                { name: 'VS', value: '⚡', inline: true },
                { name: 'Bot chọn', value: botChoice.name, inline: true },
            )
            .setDescription(`**${resultMessage}**`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
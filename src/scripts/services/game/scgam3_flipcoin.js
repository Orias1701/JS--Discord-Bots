// src/scripts/services/game/scgam3_flipcoin.js
const { EmbedBuilder } = require('discord.js');

module.exports = async (interaction, client) => {
    // Logic random: 0 hoặc 1
    const isHeads = Math.random() < 0.5;
    
    const resultText = isHeads ? 'Mặt Ngửa (Heads)' : 'Mặt Sấp (Tails)';
    // Bạn có thể thay link ảnh gif đồng xu xoay tại đây nếu muốn đẹp hơn
    const coinEmoji = isHeads ? '🪙' : '💰'; 

    const embed = new EmbedBuilder()
        .setColor('#f1c40f') // Màu vàng
        .setTitle(`${coinEmoji} Tung đồng xu`)
        .setDescription(`Kết quả là: **${resultText}**`)
        .setFooter({ text: 'May mắn nhé!' });

    await interaction.reply({ embeds: [embed] });
};
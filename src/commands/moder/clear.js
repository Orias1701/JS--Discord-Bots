// File: src/commands/moderation/clear.js

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Xóa số lượng tin nhắn nhất định (Tối đa 100)')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Số lượng tin nhắn cần xóa')
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages), // Chỉ cho phép người có quyền Quản lý tin nhắn
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({ content: 'Có lỗi khi xóa tin nhắn (Tin nhắn quá cũ không thể xóa).', ephemeral: true });
        });

        return interaction.reply({ content: `🧹 Đã dọn dẹp **${amount}** tin nhắn.`, ephemeral: true });
    },
};
// File: src/events/interactionCreate.js

const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Chỉ xử lý Slash Command
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`Không tìm thấy lệnh ${interaction.commandName}.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Có lỗi xảy ra khi chạy lệnh này!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Có lỗi xảy ra khi chạy lệnh này!', ephemeral: true });
            }
        }
    },
};
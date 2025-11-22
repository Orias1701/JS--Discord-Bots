// src/index.js

require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// 1. Tạo Collection chứa lệnh
client.commands = new Collection();

// 2. Logic đọc file lệnh tự động (Command Handler)
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Kiểm tra xem file lệnh có đúng cấu trúc không
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`[INFO] Đã nạp lệnh: ${command.data.name}`);
        } else {
            console.log(`[WARNING] Lệnh tại ${filePath} thiếu "data" hoặc "execute".`);
        }
    }
}

// 3. Sự kiện khi Bot sẵn sàng
client.once('ready', () => {
    console.log(`✅ Bot đã online: ${client.user.tag}`);
});

// 4. Sự kiện xử lý khi có người nhập lệnh
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Không tìm thấy lệnh ${interaction.commandName}.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Có lỗi xảy ra khi thực thi lệnh!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Có lỗi xảy ra khi thực thi lệnh!', ephemeral: true });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
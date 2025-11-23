// src/commands.js
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const ENV = require('../env.js');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.js')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

async function deployCommands() {
    const commands = [];
    const commandNames = new Set(); // Dùng để theo dõi tên lệnh đã tồn tại
    const commandsPath = path.join(__dirname, 'commands');
    
    // Kiểm tra thư mục có tồn tại không
    if (!fs.existsSync(commandsPath)) {
        console.error("❌ Không tìm thấy thư mục src/commands!");
        return;
    }

    const commandFiles = getAllFiles(commandsPath);
    let hasError = false;

    console.log("🔍 ĐANG QUÉT TRÙNG LẶP...");

    for (const file of commandFiles) {
        try {
            delete require.cache[require.resolve(file)];
            const command = require(file);
            
            if ('data' in command && 'execute' in command) {
                const name = command.data.name;
                
                // [CHECK] Kiểm tra trùng tên
                if (commandNames.has(name)) {
                    console.error(`\n🔴 PHÁT HIỆN TRÙNG TÊN LỆNH: "${name}"`);
                    console.error(`   👉 File gốc đã có: (Không xác định được trong Set)`);
                    console.error(`   👉 File bị trùng:  ${path.basename(file)}`);
                    console.error(`   ⚠️  HÃY KIỂM TRA LẠI NỘI DUNG 2 FILE NÀY!`);
                    hasError = true;
                } else {
                    commandNames.add(name);
                    commands.push(command.data.toJSON());
                    console.log(`✅ OK: ${name.padEnd(15)} -> ${path.basename(file)}`);
                }
            }
        } catch (e) {
            console.warn(`[SKIP] Lỗi file: ${path.basename(file)}`);
        }
    }

    if (hasError) {
        console.log("\n❌ HỦY DEPLOY DO CÓ LỆNH TRÙNG NHAU. BẠN CẦN SỬA LỖI TRÊN TRƯỚC.");
        return;
    }

    // Nếu không có lỗi thì mới gửi lên Discord
    const rest = new REST().setToken(ENV.DISCORD_TOKEN);

    try {
        console.log(`\n🚀 Đang gửi ${commands.length} lệnh lên Discord...`);
        const data = await rest.put(
            Routes.applicationCommands(ENV.APPLICATION_ID),
            { body: commands },
        );
        console.log(`🎉 THÀNH CÔNG! Đã cập nhật ${data.length} lệnh.`);
    } catch (error) {
        console.error(error);
    }
}

deployCommands();
const fs = require("fs");
const path = require("path");

// Load JSON
const config = JSON.parse(fs.readFileSync("./src/.config.json", "utf8"));
const scripts = config.scripts;

// Tạo thư mục nếu chưa tồn tại
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Duyệt đệ quy JSON để tạo file
function traverse(obj, currentPath, rootKey, parentKey) {
    Object.entries(obj).forEach(([key, value], index) => {

        if (typeof value === "object" && !Array.isArray(value)) {
            const newFolder = path.join(currentPath, key);
            ensureDir(newFolder);
            traverse(value, newFolder, rootKey, key);
        }

        else if (typeof value === "string") {
            let short;
            if (rootKey === parentKey) {short = parentKey.substring(0, 2);}
            else {short = rootKey.substring(0, 2) + parentKey.substring(0, 3);}

            const filename = `${short}${index + 1}_${value}.js`;
            const filepath = path.join(currentPath, filename);

            const relativePath = path.relative(__dirname, filepath).replace(/\\/g, "/");
            const template = `// ${relativePath}`;

            fs.writeFileSync(filepath, template, "utf8");
            console.log("Created:", filepath);
        }
    });
}

const TARGET_FOLDERS = ["commands", "events", "scripts"];

for (const folder of TARGET_FOLDERS) {
    const ROOT = path.join(__dirname, "temp", folder);
    ensureDir(ROOT);
    traverse(config.scripts, ROOT, folder, folder);
    console.log(`✔ Generated files for: ${folder}`);
}

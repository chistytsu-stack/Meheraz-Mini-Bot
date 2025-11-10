// Mirai.js
// Minimal clean core — Meheraz Bot Base

const fs = require("fs");
const path = require("path");

// Auto-load all modules from ./src if exists
const modulesPath = path.join(__dirname, "src");

if (fs.existsSync(modulesPath)) {
  const modules = fs.readdirSync(modulesPath);
  for (const file of modules) {
    if (file.endsWith(".js")) {
      try {
        require(path.join(modulesPath, file));
        console.log(`[LOADED] ${file}`);
      } catch (err) {
        console.error(`[ERROR] ${file} failed to load:`, err);
      }
    }
  }
} else {
  console.log("⚠️ No modules folder found. Run setup first.");
}

// Simple ready signal
console.log("✅ Meheraz Bot (Mirai.js) loaded successfully!");

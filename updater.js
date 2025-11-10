/*
✦━━━━━━━━━━━━━━━━━━━━━✦
📂 File: updater.js  
👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫  
✦━━━━━━━━━━━━━━━━━━━━━✦
*/

const fs = require("fs");
const { execSync } = require("child_process");
const chalk = require("chalk");
const path = require("path");

console.clear();

console.log(chalk.cyan(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🔁 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 𝑼𝒑𝒅𝒂𝒕𝒆𝒓 𝑺𝒕𝒂𝒓𝒕 💫
✦━━━━━━━━━━━━━━━━━━━━━✦
`));

(async () => {
  try {
    const configPath = path.join(__dirname, "config.dev.json");
    const versionFile = path.join(__dirname, "versions.json");

    let currentVersion = "1.0.0";
    let latestVersion = "1.0.0";

    // 🧩 Load local version
    if (fs.existsSync(configPath)) {
      const cfg = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      currentVersion = cfg.VERSION || "1.0.0";
    }

    // 🪄 Load latest version info
    if (fs.existsSync(versionFile)) {
      const ver = JSON.parse(fs.readFileSync(versionFile, "utf-8"));
      latestVersion = ver.latest || currentVersion;
    }

    console.log(chalk.yellowBright(`📦 Current Version: v${currentVersion}`));
    console.log(chalk.greenBright(`🌐 Latest Version: v${latestVersion}`));

    if (currentVersion === latestVersion) {
      console.log(chalk.green(`
✅ Already up-to-date!
⚡ No update required.
✦━━━━━━━━━━━━━━━━━━━━━✦
`));
      process.exit(0);
    }

    // 🛠️ Updating process
    console.log(chalk.magentaBright("🚀 Update available! Starting update..."));

    if (fs.existsSync(".git")) {
      console.log(chalk.cyan("📡 Fetching from GitHub..."));
      execSync("git pull", { stdio: "inherit" });
    } else {
      console.log(chalk.cyan("📦 Installing dependencies..."));
      execSync("npm install", { stdio: "inherit" });
    }

    // 🔁 Update version in config.dev.json
    const cfgData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    cfgData.VERSION = latestVersion;
    fs.writeFileSync(configPath, JSON.stringify(cfgData, null, 2));

    console.log(chalk.greenBright(`
✅ Update Complete!
🔄 Restarting bot automatically...
✦━━━━━━━━━━━━━━━━━━━━━✦
`));

    // 🔁 Restart Bot
    setTimeout(() => {
      execSync("npm start", { stdio: "inherit" });
    }, 1500);

  } catch (err) {
    console.log(chalk.redBright("❌ Update Failed!"));
    console.error(err);
    process.exit(1);
  }
})();

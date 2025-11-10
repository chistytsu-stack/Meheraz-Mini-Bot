/*
✦━━━━━━━━━━━━━━━━━━━━━✦
📂 File: restoreBackup.js
👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫
✦━━━━━━━━━━━━━━━━━━━━━✦
*/

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const moment = require("moment");

const backupDir = path.join(__dirname, "backups");
const targetFile = path.join(__dirname, "account.dev.txt");

console.clear();
console.log(chalk.cyan(`
✦━━━━━━━━━━━━━━━━━━━━━✦
✨ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒂𝒄𝒌𝒖𝒑 𝑹𝒆𝒔𝒕𝒐𝒓𝒆𝒓 💫
⚡ Restoring your Facebook AppState safely...
✦━━━━━━━━━━━━━━━━━━━━━✦
`));

// Check if backup folder exists
if (!fs.existsSync(backupDir)) {
  console.log(chalk.redBright("❌ No backup folder found!"));
  process.exit(1);
}

// Get list of backups
const backups = fs.readdirSync(backupDir)
  .filter(file => file.endsWith(".txt"))
  .map(file => ({
    name: file,
    time: fs.statSync(path.join(backupDir, file)).mtime.getTime()
  }))
  .sort((a, b) => b.time - a.time);

if (backups.length === 0) {
  console.log(chalk.yellow("⚠️ No backup files available to restore!"));
  process.exit(1);
}

// Select the latest backup
const latestBackup = backups[0];
const backupPath = path.join(backupDir, latestBackup.name);

try {
  fs.copyFileSync(backupPath, targetFile);
  console.log(chalk.greenBright(`
✅ Backup Restored Successfully!
📄 File: ${latestBackup.name}
🕐 Date: ${moment(latestBackup.time).format("YYYY-MM-DD HH:mm:ss")}
📍 Saved to: ${targetFile}
✦━━━━━━━━━━━━━━━━━━━━━✦
`));
} catch (err) {
  console.log(chalk.redBright("❌ Restore Failed!"));
  console.error(err);
  process.exit(1);
}

// ✦━━━━━━━━━━━━━━━━━━━━━✦
//  fb-chat-api/utils.js
//  ✨ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 — Utility Functions
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require("fs");
const path = require("path");

// 🧠 Simple delay function (wait)
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ⚡ Time formatter (HH:MM:SS)
function formatTime(ms) {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (1000 * 60)) % 60;
  const hr = Math.floor(ms / (1000 * 60 * 60));
  return `${hr.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

// 💾 Safe file writer
function saveFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, data);
    return true;
  } catch (err) {
    console.error("✦ [Error Saving File] ⇒", err.message);
    return false;
  }
}

// 📂 Read JSON safely
function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

// 💫 Create folder if not exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 🧩 Get current uptime string
function uptimeString() {
  return formatTime(process.uptime() * 1000);
}

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 📦 Export all helpers
// ✦━━━━━━━━━━━━━━━━━━━━━✦
module.exports = {
  sleep,
  formatTime,
  saveFile,
  readJSON,
  ensureDir,
  uptimeString,
};

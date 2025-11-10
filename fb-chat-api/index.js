// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🌐 fb-chat-api — 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑬𝒅𝒊𝒕𝒊𝒐𝒏
// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ All-in-One Messenger Bot Core Loader
// 🧩 Integrates with src modules and dashboard
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const path = require("path");
const log = require("./src/log");
const api = require("./src/api");
const dashboard = require("./src/dashboard");

log.info("⚡ Loading fb-chat-api (𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑬𝒅𝒊𝒕𝒊𝒐𝒏)...");

// 💫 Expose primary entrypoints
module.exports = {
  // 🔑 Login system
  login: api.login,

  // 💬 Message listener
  listen: api.listen,

  // 📤 Message sender
  sendMessage: api.sendMessage,

  // 🔧 Utilities
  utils: api.utils,

  // 📊 Dashboard status hook
  dashboard: {
    status: dashboard.status,
  },

  // 🧠 Version and Meta Info
  info: {
    author: "𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑰𝒔𝒍𝒂𝒎 𝑪𝒉𝒊𝒔𝒕𝒊 💫",
    version: "2.0.0",
    style: "𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑬𝒅𝒊𝒕𝒊𝒐𝒏",
    description: "Fast, Styled, Dashboard-ready fb-chat-api wrapper."
  },
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🟢 Example Usage
// ✦━━━━━━━━━━━━━━━━━━━━━✦
if (require.main === module) {
  (async () => {
    const status = await dashboard.status();
    log.info("Dashboard Ready:", status);
    log.info("fb-chat-api started successfully ⚡");
  })();
}

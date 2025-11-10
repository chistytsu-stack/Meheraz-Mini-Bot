// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 👑 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - Logs System
// 💫 Mirai Inspired | Tracks All Activities
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "logsbot",
    version: "3.0",
    author: "Meheraz 💫",
    description: "Logs all important activities (join, leave, message, errors)"
  },

  onEvent: async function ({ api, event, Users, Threads }) {
    const time = moment.tz("Asia/Dhaka").format("hh:mm:ss A — DD MMM YYYY");
    const logPath = path.join(__dirname, "../data/logs.txt");

    let logMessage = "";

    switch (event.logMessageType) {
      case "log:subscribe": {
        const addedUser =
          event.logMessageData.addedParticipants?.map(p => p.fullName).join(", ") || "Unknown";
        logMessage = `👥 [JOIN] ${addedUser} joined the chat.`;
        break;
      }

      case "log:unsubscribe": {
        const leftUserID = event.logMessageData.leftParticipantFbId;
        const userName = await Users.getName(leftUserID) || "Unknown User";
        logMessage = `👋 [LEAVE] ${userName} left the chat.`;
        break;
      }

      default:
        logMessage = `💬 [EVENT] ${event.type || "Unknown Event"}`;
    }

    const formatted = `
✦━━━━━━━━━━━━━━━━━━━━━✦
📜 𝑳𝒐𝒈 𝑹𝒆𝒑𝒐𝒓𝒕 𝑩𝒚 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 💫
───────────────────────
🕒 সময়: ${time}
📌 ইভেন্ট: ${logMessage}
───────────────────────
⚡ Powered By: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 💎
✦━━━━━━━━━━━━━━━━━━━━━✦\n`;

    try {
      fs.appendFileSync(logPath, formatted, "utf8");
      console.log(formatted);
    } catch (err) {
      console.error("❌ Log writing error:", err);
    }
  }
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🪄 End of 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 Logs System
// ✦━━━━━━━━━━━━━━━━━━━━━✦

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🔔 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - Universal Event Listener
// 💫 Tracks and reacts to all live events
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "onEvent",
    version: "3.0",
    author: "Meheraz 💫",
    description: "Listens to all system events and logs them beautifully"
  },

  onEvent: async function ({ api, event, Users, Threads }) {
    const time = moment.tz("Asia/Dhaka").format("hh:mm:ss A — DD MMM YYYY");
    const logFile = "./data/onEventLogs.txt";

    // Identify event type
    let eventType = event.type || "Unknown";
    let senderName = "Unknown User";

    try {
      senderName = await Users.getName(event.senderID);
    } catch (e) {}

    // ──────────────💫 Log Layout ──────────────
    const logText = `
✦━━━━━━━━━━━━━━━━━━━━━✦
📢 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑬𝒗𝒆𝒏𝒕 𝑳𝒐𝒈 💫
───────────────────────
📌 ইভেন্ট: ${eventType}
👤 প্রেরক: ${senderName} (${event.senderID})
💬 থ্রেড: ${event.threadID}
🕒 সময়: ${time}
───────────────────────
⚡ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 💎
✦━━━━━━━━━━━━━━━━━━━━━✦\n`;

    // Save Log File
    try {
      fs.appendFileSync(logFile, logText, "utf8");
    } catch (err) {
      console.error("❌ Log file write error:", err);
    }

    // ──────────────💫 Auto Reactions ──────────────
    if (event.body?.toLowerCase().includes("meheraz")) {
      api.setMessageReaction("💫", event.messageID, () => {}, true);
    }

    // ──────────────💫 Event Response Example ──────────────
    if (event.body?.toLowerCase() === "hi bot" || event.body?.toLowerCase() === "hello bot") {
      api.sendMessage(
        `💫 হ্যালো ${senderName}!\nআমি 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 — সব সময় তোমার সাথে আছি 🌸`,
        event.threadID
      );
    }
  }
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🪄 End of 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 Universal Event Handler
// ✦━━━━━━━━━━━━━━━━━━━━━✦

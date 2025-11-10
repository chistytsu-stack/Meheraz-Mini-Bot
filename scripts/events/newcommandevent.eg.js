// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🧩 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - New Command Event Example
// 💫 Mirai Aesthetic Style | Developer Guide
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "newcommandevent.eg",
    version: "1.0",
    author: "Meheraz 💫",
    description: "Example event file for learning how custom events work"
  },

  // ──────────────💫 Event Start ──────────────
  onEvent: async function ({ api, event, Users, Threads }) {
    const time = moment.tz("Asia/Dhaka").format("hh:mm:ss A — DD MMM YYYY");

    // Event Type Log (for learning)
    console.log(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🔔 𝑵𝒆𝒘 𝑬𝒗𝒆𝒏𝒕 𝑻𝒓𝒊𝒈𝒈𝒆𝒓𝒆𝒅 💫
───────────────────────
🕒 সময়: ${time}
📌 Event Type: ${event.type}
💬 Thread ID: ${event.threadID}
👤 Sender ID: ${event.senderID}
───────────────────────
⚡ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 | Mirai System
✦━━━━━━━━━━━━━━━━━━━━━✦`);

    // Example: if someone sends “ping” it replies “Pong!”
    if (event.body && event.body.toLowerCase() === "ping") {
      api.sendMessage(
        "🏓 Pong! 💫\n✨ 𝑹𝒆𝒔𝒑𝒐𝒏𝒅𝒆𝒅 𝑩𝒚 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 ✨",
        event.threadID
      );
    }

    // Example: auto reaction on “meheraz”
    if (event.body && event.body.toLowerCase().includes("meheraz")) {
      api.setMessageReaction("💫", event.messageID, () => {}, true);
    }
  }
  // ──────────────💫 Event End ──────────────
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🪄 End of 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 New Command Event Example
// ✦━━━━━━━━━━━━━━━━━━━━━✦

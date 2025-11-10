const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "checkwarn",
    version: "1.0.1",
    author: "Meheraz 💫",
    role: 0,
    shortDescription: { en: "Auto check and notify user warnings" },
    longDescription: { en: "Automatically checks if a user has warnings when they send messages or join group." },
    category: "event",
  },

  onEvent: async function ({ api, event, Users }) {
    try {
      const threadID = event.threadID;
      const userID = event.senderID;
      const warnPath = path.join(__dirname, "data", "warnData.json");

      // যদি warnData.json না থাকে তাহলে তৈরি করবে
      if (!fs.existsSync(warnPath)) fs.writeFileSync(warnPath, JSON.stringify({}));

      const warnData = JSON.parse(fs.readFileSync(warnPath));
      const userWarn = warnData[threadID]?.[userID] || 0;

      // যদি user এর ১ বা তার বেশি warning থাকে, তাহলেই জানাবে ⚠️
      if (userWarn > 0) {
        const userName = await Users.getName(userID) || "Unknown User";
        const warningLevel =
          userWarn === 1
            ? "⚠️ সতর্কবার্তা: ১টি Warning!"
            : userWarn === 2
            ? "🚨 সতর্কবার্তা: ২টি Warning!"
            : "⛔ গুরুতর সতর্কবার্তা! একাধিক Warning প্রাপ্ত!";

        const message = `✦━━━━━━━━━━━━━━━━━━━━━✦
💫 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑾𝒂𝒓𝒏 𝑪𝒉𝒆𝒄𝒌𝒆𝒓 💫
───────────────────────
👤 User: ${userName}
🆔 ID: ${userID}
⚠️ Warning Count: ${userWarn}
💬 Status: ${warningLevel}
───────────────────────
📅 Updated: ${new Date().toLocaleString("en-BD")}
💎 Mirai × Meheraz Engine Active
✦━━━━━━━━━━━━━━━━━━━━━✦`;

        api.sendMessage(message, threadID);
      }
    } catch (err) {
      console.error("❌ CheckWarn Event Error:", err);
    }
  },
};

const fs = require("fs");
const moment = require("moment-timezone");
const path = require("path");

module.exports = {
  config: {
    name: "leave",
    version: "1.0.0",
    author: "Meheraz 💫",
    description: "Send custom goodbye message when someone leaves",
    category: "event"
  },

  onEvent: async function ({ api, event, Users }) {
    try {
      // যদি কেউ গ্রুপ থেকে চলে যায়
      if (event.logMessageType !== "log:unsubscribe") return;

      const threadID = event.threadID;
      const leftUserID = event.logMessageData.leftParticipantFbId;
      const userName = await Users.getName(leftUserID) || "Unknown User";
      const time = moment.tz("Asia/Dhaka").format("hh:mm A, DD MMM YYYY");

      // Image path (optional)
      const goodbyeImg = path.join(__dirname, "assets", "goodbye.png");
      const hasImage = fs.existsSync(goodbyeImg);

      // Custom message ✨
      const msg = `✦━━━━━━━━━━━━━━━━━━━━━✦
👋 বিদায় ${userName} 💫
───────────────────────
🌙 সময়: ${time}
📛 গ্রুপ ত্যাগ করেছে একজন সদস্য
───────────────────────
💎 Meheraz Engine Active
✦━━━━━━━━━━━━━━━━━━━━━✦`;

      // যদি ছবি থাকে তাহলে সঙ্গে পাঠাবে
      if (hasImage) {
        api.sendMessage(
          {
            body: msg,
            attachment: fs.createReadStream(goodbyeImg),
          },
          threadID
        );
      } else {
        api.sendMessage(msg, threadID);
      }

      // Log করে রাখা
      const logData = `[${time}] ${userName} left from ${threadID}\n`;
      fs.appendFileSync(path.join(__dirname, "data", "leaveLogs.txt"), logData);

    } catch (err) {
      console.error("❌ Leave Event Error:", err);
    }
  },
};

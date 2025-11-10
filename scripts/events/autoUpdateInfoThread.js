const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "autoupdatethread",
    aliases: ["autoupdateinfo", "autothread"],
    version: "1.0.0",
    author: "Meheraz 💫",
    role: 0,
    shortDescription: { en: "Auto update thread information" },
    longDescription: { en: "Automatically updates group info, name & member stats" },
    category: "system",
    guide: {
      en: "{pn} — will auto-update thread info when members join/leave."
    }
  },

  onEvent: async function ({ api, event, Threads }) {
    try {
      const threadID = event.threadID;
      const threadInfo = await api.getThreadInfo(threadID);
      const threadName = threadInfo.threadName || "Unnamed Group";
      const memberCount = threadInfo.participantIDs.length;
      const time = moment.tz("Asia/Dhaka").format("hh:mm A, DD MMM YYYY");

      const newName = `💬 ${threadName} | 👥 ${memberCount} Members`;
      await api.setTitle(newName, threadID);

      const content = 
`✦━━━━━━━━━━━━━━━━━━━━━✦
💫 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 𝑨𝒖𝒕𝒐 𝑼𝒑𝒅𝒂𝒕𝒆 💫
───────────────────────
📛 Group Name: ${threadName}
👥 Members: ${memberCount}
🕒 Updated: ${time}
───────────────────────
⚡ Powered by Mirai × Meheraz
✦━━━━━━━━━━━━━━━━━━━━━✦`;

      await api.sendMessage(content, threadID);

      // Optional logging
      const logData = `[${time}] Updated ${threadName} (${memberCount} members)\n`;
      fs.appendFileSync(__dirname + "/logs/autoUpdate.log", logData);

    } catch (error) {
      console.error("❌ AutoUpdate Error:", error);
    }
  }
};

module.exports = {
  config: {
    name: "owner",
    aliases: ["owner", "dev"],
    version: "1.0",
    author: "Meheraz Islam (Chisty)",
    role: 0,
    shortDescription: {
      en: "Show information about the bot owner",
    },
    longDescription: {
      en: "Displays detailed information about the bot's creator in elegant Meheraz Style format.",
    },
    category: "info",
    guide: {
      en: "{pn} → shows owner information",
    },
  },

  onStart: async function ({ api, event }) {
    const msg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
💫 𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 💫
✦━━━━━━━━━━━━━━━━━━━━━✦

👑 𝐍𝐚𝐦𝐞: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑰𝒔𝒍𝒂𝒎 (𝑪𝒉𝒊𝒔𝒕𝒚)
📍 𝐅𝐫𝐨𝐦: 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡 🇧🇩 / 𝐂𝐡𝐚𝐭𝐭𝐨𝐠𝐫𝐚𝐦
💻 𝐑𝐨𝐥𝐞: 𝐁𝐨𝐭 𝐂𝐫𝐞𝐚𝐭𝐨𝐫 | 𝐆𝐏𝐓 𝐂𝐨𝐝𝐞𝐫
🌐 𝐆𝐢𝐭𝐇𝐮𝐛: github.com/chistytsu-stack
🔗 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: https://www.facebook.com/chisty.57
🕋 𝐐𝐮𝐨𝐭𝐞: “Allah is the best”

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦
    `;

    return api.sendMessage(msg, event.threadID, event.messageID);
  },
};

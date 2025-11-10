✦━━━━━━━━━━━━━━━━━━━━━✦
📂 File: uptime.js  
👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫 (Instant Edition)
✦━━━━━━━━━━━━━━━━━━━━━✦

const os = require("os");

module.exports = {
  config: {
    name: "up",
    version: "8.0-InstantMeheraz",
    author: "Amit⚡Max | Mod by Xrotick | Ultra-Fast by Meheraz",
    role: 0,
    shortDescription: { en: "Instant uptime in Meheraz Style 💫" },
    longDescription: {
      en: "Displays full bot uptime stats instantly — fast, stable, and stylish ⚡"
    },
    category: "⚙ System",
    guide: { en: "{p}up" }
  },

  onStart: async function ({ api, event }) {
    try {
      // 🧠 System Info
      const mem = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
      const up = process.uptime();
      const d = Math.floor(up / 86400);
      const h = Math.floor((up % 86400) / 3600);
      const m = Math.floor((up % 3600) / 60);
      const s = Math.floor(up % 60);
      const uptime = `${d}d ${h}h ${m}m ${s}s`;

      const now = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true
      });
      const [date, time] = now.split(", ");

      // 💬 Final Message (Instant Display)
      const msg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
☀️ 𝐁𝐎𝐓 𝐔𝐏𝐓𝐈𝐌𝐄 𝐒𝐓𝐀𝐓𝐒 ☀️
✦━━━━━━━━━━━━━━━━━━━━━✦

⏱️ 𝐔𝐩𝐭𝐢𝐦𝐞: ${uptime}
🕒 𝐓𝐢𝐦𝐞: ${time}
📅 𝐃𝐚𝐭𝐞: ${date}

💾 𝐑𝐀𝐌 𝐔𝐬𝐚𝐠𝐞: ${mem} MB
🖥️ 𝐎𝐒: ${os.platform()} (${os.arch()})
⚙️ 𝐍𝐨𝐝𝐞: ${process.version}

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 💫
✦━━━━━━━━━━━━━━━━━━━━━✦
      `.trim();

      // ⚡ Instant reply (no animation, no delay)
      await api.sendMessage(msg, event.threadID);

    } catch (err) {
      console.error("⚠️ Uptime Error:", err);
      api.sendMessage("🚫 𝐄𝐫𝐫𝐨𝐫 𝐥𝐨𝐚𝐝𝐢𝐧𝐠 𝐮𝐩𝐭𝐢𝐦𝐞.", event.threadID);
    }
  }
};

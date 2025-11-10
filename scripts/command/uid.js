const axios = require("axios");

module.exports = {
  config: {
    name: "uid",
    aliases: ["uid"],
    version: "1.0",
    author: "Meheraz Islam (Chisty)",
    role: 0,
    shortDescription: {
      en: "Get the Facebook UID of a user",
    },
    longDescription: {
      en: "Returns the Facebook UID of a mentioned user, replied user, or yourself.",
    },
    category: "info",
    guide: {
      en: "{pn} [@mention/reply/none]",
    },
  },

  onStart: async function ({ api, event, args }) {
    let uid;

    if (event.type === "message_reply") {
      uid = event.messageReply.senderID;
    } else if (Object.keys(event.mentions).length > 0) {
      uid = Object.keys(event.mentions)[0];
    } else {
      uid = event.senderID;
    }

    const name =
      event.type === "message_reply"
        ? event.messageReply.body || "User"
        : event.mentions[uid] || "You";

    const msg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
✨ 𝐔𝐈𝐃 𝐈𝐍𝐅𝐎 ✨
✦━━━━━━━━━━━━━━━━━━━━━✦

👤 𝐍𝐚𝐦𝐞: ${name}
🆔 𝐔𝐈𝐃: ${uid}

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦
    `;

    return api.sendMessage(msg, event.threadID, event.messageID);
  },
};

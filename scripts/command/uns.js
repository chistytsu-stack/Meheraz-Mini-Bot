const { GoatWrapper } = require("fca-liane-utils");

module.exports = {
  config: {
    name: "unsend",
    aliases: ["u", "rmv", "uns"],
    version: "1.3-Meheraz",
    author: "Meheraz Islam Chishti 💫",
    countDown: 3,
    role: 0,
    shortDescription: { en: "Unsend bot's own message instantly" },
    longDescription: {
      en: "Reply to the bot's message and type 'unsend' to remove it automatically ✨",
    },
    category: "📩 Message Control",
    guide: {
      en: "Reply to the bot's message → type `{pn}` or `{pn} now`",
    },
  },

  langs: {
    en: {
      syntaxError: "⚠️ Please reply to a bot message you want to unsend!",
      success: "🧹 Message unsent successfully by Meheraz System 💫",
    },
    bn: {
      syntaxError: "⚠️ যে মেসেজ আনসেন্ড করতে চাও সেটিতে reply দাও!",
      success: "✅ মেসেজটি সফলভাবে মুছে ফেলা হয়েছে 💫",
    },
  },

  onStart: async function ({ message, event, api, getLang }) {
    try {
      // যাচাই করা হচ্ছে reply করা হয়েছে কিনা এবং সেটা বটের মেসেজ কিনা
      if (!event.messageReply || event.messageReply.senderID !== api.getCurrentUserID()) {
        return message.reply(getLang("syntaxError"));
      }

      // আনসেন্ড করা হচ্ছে
      await message.unsend(event.messageReply.messageID);

      // সুন্দর কনফার্মেশন রিপ্লাই
      message.reply(getLang("success"));
      console.log(`✨ [UNSEND] Message unsent successfully at ${new Date().toLocaleTimeString()}`);

    } catch (error) {
      console.error("❌ Error in unsend command:", error);
      message.reply("⚠️ Unexpected error occurred while unsending message.");
    }
  },
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚙️ Auto Wrapper for Compatibility
// ✦━━━━━━━━━━━━━━━━━━━━━✦
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });

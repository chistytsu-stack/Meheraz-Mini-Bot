const axios = require("axios");

module.exports = {
  config: {
    name: "sc",
    aliases: ["uid2", "sharecontact", "sc"],
    version: "2.0.0",
    author: "Meheraz",
    countDown: 5,
    role: 0,
    description: "Send target Facebook UID as shareContact",
    category: "info",
    guide: {
      en: "{pn}: send your UID as shareContact\n{pn} @tag: send UID of tagged user\n{pn} <profile link>: get UID from Facebook link\nReply to any message to get UID"
    }
  },

  onStart: async function ({ event, args, api }) {
    try {
      let targetID = null;

      // 🧩 Case 1: Reply to someone's message
      if (event.messageReply) {
        targetID = event.messageReply.senderID;
      }

      // 🧩 Case 2: If someone is mentioned
      else if (event.mentions && Object.keys(event.mentions).length > 0) {
        targetID = Object.keys(event.mentions)[0];
      }

      // 🧩 Case 3: Facebook profile link provided
      else if (args[0] && args[0].includes("facebook.com")) {
        const url = args[0].trim();
        try {
          const response = await axios.get(https://api.allorigins.win/get?url=${encodeURIComponent(https://www.facebook.com/${url}`)}`);
          const html = response.data.contents;
          const match = html.match(/"entity_id":"(\d+)"/);
          if (match && match[1]) targetID = match[1];
        } catch (err) {
          console.error("Failed to fetch UID from link:", err.message);
        }
      }

      // 🧩 Case 4: Default — user’s own UID
      if (!targetID) targetID = event.senderID;

      // 🧩 Try to send share contact
      if (api.shareContact) {
        await api.shareContact(targetID, targetID, event.threadID);
      } else {
        // Fallback: normal message if shareContact not supported
        await api.sendMessage📱 UID of target: ${targetID}`, event.threadID, event.messageID);
      }

    } catch (err) {
      console.error("❌ Error in sc command:", err.message);
      await api.sendMessage("⚠️ | Something went wrong while fetching UID.", event.threadID, event.messageID);
    }
  }
};

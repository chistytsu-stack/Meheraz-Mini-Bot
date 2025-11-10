module.exports = {
  config: {
    name: "offbot",
    aliases: ["shutdown", "stopbot", "off"],
    version: "1.0",
    author: "Meheraz Style",
    countDown: 3,
    role: 2,
    shortDescription: "Turn off the bot in Meheraz Style",
    longDescription: "Shut down the bot with aesthetic Meheraz Style message.",
    category: "owner"
  },

  onStart: async function ({ message, api, event }) {
    // Aesthetic styled reply before shutting down
    const offMsg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
💤 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮 𝓞𝓯𝓯𝓑𝓸𝓽 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦

🛑 𝗕𝗼𝘁 𝗶𝘀 𝘀𝗵𝘂𝘁𝘁𝗶𝗻𝗴 𝗱𝗼𝘄𝗻...
💫 𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁 𝗮 𝗺𝗼𝗺𝗲𝗻𝘁 ✨

✦━━━━━━━━━━━━━━━━━━━━━✦
🔮 𝓟𝓸𝔀𝓮𝓻𝓮𝓭 𝓑𝔂 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮
✦━━━━━━━━━━━━━━━━━━━━━✦
`;

    await message.reply(offMsg);

    // Delay to make it look natural before shutdown
    setTimeout(() => {
      api.sendMessage("⚙️ 𝗕𝗼𝘁 𝗵𝗮𝘀 𝗯𝗲𝗲𝗻 𝘁𝘂𝗿𝗻𝗲𝗱 𝗼𝗳𝗳 🔒", event.threadID);
      process.exit(0);
    }, 3000);
  }
};

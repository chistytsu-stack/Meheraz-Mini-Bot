module.exports = {
  config: {
    name: "game",
    aliases: ["guess", "play"],
    version: "1.0",
    author: "Meheraz Style",
    countDown: 5,
    role: 0,
    shortDescription: "Play Guess Number Game",
    longDescription: "Fun number guessing game with Meheraz Style formatting.",
    category: "games",
  },

  onStart: async function ({ message, event, args }) {
    const random = Math.floor(Math.random() * 10) + 1;

    const startMsg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
🎮 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮 𝓖𝓪𝓶𝓮 𝓩𝓸𝓷𝓮 💫
✦━━━━━━━━━━━━━━━━━━━━━✦

🎯 Guess a number between 1 and 10  
💬 Reply with your guess below 👇

✦━━━━━━━━━━━━━━━━━━━━━✦
🕹 𝓛𝓮𝓽’𝓼 𝓹𝓵𝓪𝔂 𝓪𝓷𝓭 𝓱𝓪𝓿𝓮 𝓯𝓾𝓷 💖
✦━━━━━━━━━━━━━━━━━━━━━✦
`;

    await message.reply(startMsg);

    const handleReply = {
      name: this.config.name,
      messageID: event.messageID,
      random
    };

    global.GoatBot.onReply.set(event.messageID, handleReply);
  },

  onReply: async function ({ message, Reply, event }) {
    const guess = parseInt(event.body);
    const correct = Reply.random;

    if (isNaN(guess)) {
      return message.reply("❌ Please enter a number between 1-10!");
    }

    if (guess === correct) {
      message.reply(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🎉 𝓒𝓸𝓷𝓰𝓻𝓪𝓽𝓼! 𝓨𝓸𝓾 𝓰𝓾𝓮𝓼𝓼𝓮𝓭 𝓲𝓽! 💎  
✅ The number was: ${correct}
✦━━━━━━━━━━━━━━━━━━━━━✦

💫 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮 𝓖𝓪𝓶𝓮 🎮
✦━━━━━━━━━━━━━━━━━━━━━✦
`);
    } else {
      message.reply(`
✦━━━━━━━━━━━━━━━━━━━━━✦
😢 𝓦𝓻𝓸𝓷𝓰 𝓰𝓾𝓮𝓼𝓼!  
🎯 The correct number was: ${correct}
✦━━━━━━━━━━━━━━━━━━━━━✦

🔄 𝓣𝓻𝔂 𝓪𝓰𝓪𝓲𝓷 𝓷𝓮𝔁𝓽 𝓽𝓲𝓶𝓮 💫
✦━━━━━━━━━━━━━━━━━━━━━✦
`);
    }

    global.GoatBot.onReply.delete(Reply.messageID);
  }
};

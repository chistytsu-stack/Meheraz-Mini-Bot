// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 💫 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - Action Handler
// 🎮 Handles reactions, replies & interactions
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const chalk = require("chalk");
const moment = require("moment-timezone");

module.exports = async function handlerAction({ api, event, Users, Threads }) {
  try {
    const time = moment.tz("Asia/Dhaka").format("hh:mm:ss A");
    const senderName = await Users.getName(event.senderID) || "Unknown User";

    // ──────────────💫 Reaction Handler ──────────────
    if (event.type === "message_reaction") {
      console.log(chalk.yellow(`
✦━━━━━━━━━━━━━━━━━━━━━✦
💛 𝑹𝒆𝒂𝒄𝒕𝒊𝒐𝒏 𝑫𝒆𝒕𝒆𝒄𝒕𝒆𝒅!
───────────────────────
👤 User: ${senderName}
💬 Reaction: ${event.reaction}
🕒 Time: ${time}
✦━━━━━━━━━━━━━━━━━━━━━✦`));

      api.sendMessage(
        `💫 Hey ${senderName}, তুমি একটা "${event.reaction}" react দিয়েছো!`,
        event.threadID
      );
    }

    // ──────────────💫 Reply Handler ──────────────
    else if (event.type === "message_reply") {
      console.log(chalk.cyanBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
💬 𝑹𝒆𝒑𝒍𝒚 𝑫𝒆𝒕𝒆𝒄𝒕𝒆𝒅!
───────────────────────
👤 User: ${senderName}
🗣️ Message: ${event.body || "No Text"}
🕒 Time: ${time}
✦━━━━━━━━━━━━━━━━━━━━━✦`));

      api.sendMessage(
        `🌸 ধন্যবাদ ${senderName}, তোমার রিপ্লাই পেয়েছি!`,
        event.threadID
      );
    }

    // ──────────────💫 Attachment Handler ──────────────
    else if (event.attachments && event.attachments.length > 0) {
      const type = event.attachments[0].type;
      console.log(chalk.magenta(`
✦━━━━━━━━━━━━━━━━━━━━━✦
📎 𝑨𝒕𝒕𝒂𝒄𝒉𝒎𝒆𝒏𝒕 𝑹𝒆𝒄𝒆𝒊𝒗𝒆𝒅!
───────────────────────
👤 User: ${senderName}
📂 Type: ${type}
🕒 Time: ${time}
✦━━━━━━━━━━━━━━━━━━━━━✦`));

      api.sendMessage(`📂 Wow ${senderName}! তুমি একটা ${type} পাঠিয়েছো 😍`, event.threadID);
    }

  } catch (err) {
    console.error(chalk.red(`
✦━━━━━━━━━━━━━━━━━━━━━✦
❌ 𝑬𝒓𝒓𝒐𝒓 𝒊𝒏 𝑨𝒄𝒕𝒊𝒐𝒏 𝑯𝒂𝒏𝒅𝒍𝒆𝒓
───────────────────────
${err.message}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
  }
};

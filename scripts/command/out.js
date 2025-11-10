const { getPrefix } = global.utils;

module.exports = {
  config: {
    name: "out",
    version: "2.0",
    author: "Meheraz Islam",
    countDown: 5,
    role: 1,
    shortDescription: "Make bot leave the group",
    longDescription: "Command for forcing the bot to leave a specific or current group",
    category: "system"
  },

  onStart: async function ({ api, event, args }) {
    const prefix = getPrefix(event.threadID);
    const { threadID, messageID } = event;

    // If no thread ID given → leave current group
    if (!args[0]) {
      return api.sendMessage(
        `✦━━━━━━━━━━━━━━━━━━━━━✦
🚪 𝗕𝗼𝘁 𝗶𝘀 𝗹𝗲𝗮𝘃𝗶𝗻𝗴 𝘁𝗵𝗶𝘀 𝗴𝗿𝗼𝘂𝗽...
💫 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲!
✦━━━━━━━━━━━━━━━━━━━━━✦`,
        threadID,
        async () => {
          await new Promise(r => setTimeout(r, 2000));
          api.removeUserFromGroup(api.getCurrentUserID(), threadID);
        },
        messageID
      );
    }

    // If thread ID given → leave that group
    const targetTid = args[0];
    api.sendMessage(
      `✦━━━━━━━━━━━━━━━━━━━━━✦
🚪 𝗕𝗼𝘁 𝗶𝘀 𝗹𝗲𝗮𝘃𝗶𝗻𝗴 𝗴𝗿𝗼𝘂𝗽: ${targetTid}
✅ 𝗟𝗲𝗮𝘃𝗲 𝗿𝗲𝗾𝘂𝗲𝘀𝘁 𝘀𝗲𝗻𝘁 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆.
✦━━━━━━━━━━━━━━━━━━━━━✦`,
      threadID,
      async () => {
        await new Promise(r => setTimeout(r, 2000));
        api.removeUserFromGroup(api.getCurrentUserID(), targetTid);
      },
      messageID
    );
  }
};

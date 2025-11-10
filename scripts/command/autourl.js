const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");

module.exports = {
  config: {
    name: "autourlpro",
    version: "3.0",
    author: "✦ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 ✦",
    role: 0,
    shortDescription: "Auto downloader for any link",
    longDescription: "Automatically downloads media from YouTube, Facebook, Instagram, TikTok, etc.",
    category: "system",
    cooldown: 3
  },

  // 🪩 Main Auto URL Detection Event
  onChat: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = body.match(urlRegex);
    if (!urls) return;

    for (const url of urls) {
      api.sendMessage(
        `✦━━━━━━━━━━━━━━━━━━━━━✦
🔗 𝗔𝘂𝘁𝗼𝗨𝗥𝗟 𝗣𝗿𝗼 𝗗𝗲𝘁𝗲𝗰𝘁𝗲𝗱
✦━━━━━━━━━━━━━━━━━━━━━✦
📍 URL: ${url}
📦 Status: Downloading...
✦━━━━━━━━━━━━━━━━━━━━━✦`,
        threadID,
        messageID
      );

      try {
        let filePath = path.join(__dirname, `temp_${Date.now()}.mp4`);

        // 🎥 YouTube Downloader
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
          await new Promise((resolve, reject) => {
            ytdl(url, { quality: "lowest" })
              .pipe(fs.createWriteStream(filePath))
              .on("finish", resolve)
              .on("error", reject);
          });
        }

        // 🌐 For other platforms: Use external API
        else {
          const apiUrl = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`;
          const res = await axios.get(apiUrl);
          const videoUrl = res.data.video?.noWatermark || res.data.result || res.data.url;
          if (!videoUrl) throw new Error("No media found!");

          const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
          fs.writeFileSync(filePath, response.data);
        }

        // ✉️ Send file
        api.sendMessage({
          body: `✅ 𝗙𝗶𝗹𝗲 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗱 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 💫
✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗠𝗲𝗵𝗲𝗿𝗮𝘇 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`,
          attachment: fs.createReadStream(filePath)
        }, threadID, () => fs.unlinkSync(filePath));

      } catch (err) {
        api.sendMessage(
          `❌ | Failed to download this link!\n🔗 ${url}\n⚙️ Error: ${err.message}`,
          threadID
        );
        console.error(err);
      }
    }
  }
};

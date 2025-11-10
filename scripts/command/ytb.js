const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "ytb",
    aliases: ["ytdl", "ytb"],
    version: "2.0.0",
    author: "⚡ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑰𝒔𝒍𝒂𝒎 𝑪𝒉𝒊𝒔𝒕𝒚 ⚡",
    countDown: 10,
    role: 0,
    shortDescription: "Download YouTube video directly",
    longDescription: "Download full YouTube videos with Meheraz style layout",
    category: "media"
  },

  onStart: async function({ api, event, args }) {
    const { threadID, messageID } = event;
    const query = args.join(" ");
    if (!query)
      return api.sendMessage(
        "⚠️ | Please provide a YouTube link!\n\nExample:\n→ ytb https://youtu.be/60ItHLz5WEA",
        threadID,
        messageID
      );

    api.sendMessage("⏳ | Downloading your video, please wait...", threadID, messageID);

    try {
      // 🧠 Use an external API for direct download (no API key needed)
      const res = await axios.get(`https://api.vreden.my.id/api/ytdl?url=${encodeURIComponent(query)}`);
      const data = res.data.result;
      const videoUrl = data.video_720p || data.video_480p || data.video_360p;

      const filePath = path.join(__dirname, "ytb_video.mp4");
      const response = await axios({
        method: "GET",
        url: videoUrl,
        responseType: "stream"
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage(
          {
            body: `✦━━━━━━━━━━━━━━━━━━━━━✦
🎬 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗩𝗶𝗱𝗲𝗼 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗱 🎬
✦━━━━━━━━━━━━━━━━━━━━━✦

📜 Title: ${data.title}
📺 Channel: ${data.channel}
📅 Uploaded: ${data.published}
📦 Quality: ${data.quality || "720p"}

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗠𝗲𝗵𝗲𝗿𝗮𝘇 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`,
            attachment: fs.createReadStream(filePath)
          },
          threadID,
          () => fs.unlinkSync(filePath),
          messageID
        );
      });

      writer.on("error", err => {
        console.error(err);
        api.sendMessage("❌ | Error writing video file!", threadID, messageID);
      });
    } catch (err) {
      console.error(err);
      api.sendMessage("❌ | Failed to download video!", threadID, messageID);
    }
  }
};

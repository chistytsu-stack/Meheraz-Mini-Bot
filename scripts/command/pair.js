const axios = require("axios");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  config: {
    name: "pair",
    aliases: ["pair", "pr"],
    version: "2.0",
    author: "✦𝑴𝒆𝒉𝒆𝒓𝒂𝒛✦",
    countDown: 5,
    role: 0,
    shortDescription: "Make glowing pair image of two users",
    longDescription: "Combine two users' profile pictures with a glowing pulse frame ✨",
    category: "fun",
    guide: "{p}pair @mention"
  },

  onStart: async function ({ api, event }) {
    try {
      const mention = Object.keys(event.mentions);
      if (mention.length === 0) {
        return api.sendMessage(
          "💫 Tag someone to make a glowing pair image!\nExample: pair @username",
          event.threadID, event.messageID
        );
      }

      const uid1 = event.senderID;
      const uid2 = mention[0];

      const link1 = `https://graph.facebook.com/${uid1}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const link2 = `https://graph.facebook.com/${uid2}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

      const path1 = __dirname + "/cache/avt1.png";
      const path2 = __dirname + "/cache/avt2.png";
      const outPath = __dirname + "/cache/pair.jpg";

      const img1 = (await axios.get(link1, { responseType: "arraybuffer" })).data;
      const img2 = (await axios.get(link2, { responseType: "arraybuffer" })).data;

      fs.writeFileSync(path1, Buffer.from(img1));
      fs.writeFileSync(path2, Buffer.from(img2));

      const avatar1 = await loadImage(path1);
      const avatar2 = await loadImage(path2);

      const canvas = createCanvas(900, 500);
      const ctx = canvas.getContext("2d");

      // Gradient glow background ✨
      const gradient = ctx.createLinearGradient(0, 0, 900, 500);
      gradient.addColorStop(0, "#00f5ff");
      gradient.addColorStop(0.25, "#ff00ff");
      gradient.addColorStop(0.5, "#ff006e");
      gradient.addColorStop(0.75, "#00ff95");
      gradient.addColorStop(1, "#ffee00");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 900, 500);

      // Rounded avatar shapes 💞
      ctx.save();
      ctx.beginPath();
      ctx.arc(250, 250, 180, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar1, 70, 70, 360, 360);
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(650, 250, 180, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar2, 470, 70, 360, 360);
      ctx.restore();

      // Outer glow aura ✨
      ctx.globalAlpha = 0.3;
      ctx.shadowColor = "white";
      ctx.shadowBlur = 60;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(250, 250, 180, 0, Math.PI * 2);
      ctx.arc(650, 250, 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      const finalBuffer = canvas.toBuffer("image/jpeg");
      fs.writeFileSync(outPath, finalBuffer);

      api.sendMessage({
        body: `💞 ✦𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑷𝒂𝒊𝒓 𝑺𝒚𝒔𝒕𝒆𝒎✦ 💞\n✨ ${event.senderID} ❤️ ${mention[0]} ✨`,
        attachment: fs.createReadStream(outPath)
      }, event.threadID, () => {
        fs.unlinkSync(path1);
        fs.unlinkSync(path2);
        fs.unlinkSync(outPath);
      });

    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Something went wrong while making the pair image!", event.threadID);
    }
  }
};

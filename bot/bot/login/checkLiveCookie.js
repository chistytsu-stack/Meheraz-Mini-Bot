// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🔐 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - Live Cookie Checker
// 💫 Validates Facebook session cookies before login
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const axios = require("axios");
const chalk = require("chalk");
const moment = require("moment-timezone");
const fs = require("fs");

module.exports = async function checkLiveCookie(cookiePath = "cookies.txt") {
  const now = moment.tz("Asia/Dhaka").format("hh:mm:ss A — DD MMM YYYY");

  console.log(chalk.cyanBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🧁 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 𝑳𝒐𝒈𝒊𝒏 𝑪𝒉𝒆𝒄𝒌 💫
───────────────────────
🕒 Time: ${now}
📂 File: ${cookiePath}
✦━━━━━━━━━━━━━━━━━━━━━✦
`));

  // ──────────────💫 Step 1: Check file existence ──────────────
  if (!fs.existsSync(cookiePath)) {
    console.log(chalk.redBright("❌ Cookie file not found! Please login first."));
    return false;
  }

  const cookie = fs.readFileSync(cookiePath, "utf-8").trim();
  if (!cookie) {
    console.log(chalk.redBright("❌ Cookie file is empty!"));
    return false;
  }

  // ──────────────💫 Step 2: Validate cookie live status ──────────────
  try {
    const response = await axios.get("https://m.facebook.com/", {
      headers: { cookie, "User-Agent": "Mozilla/5.0 (MeherazBot)" },
    });

    if (response.data.includes("home_icon")) {
      console.log(chalk.greenBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
✅ 𝑳𝒊𝒗𝒆 𝑪𝒐𝒐𝒌𝒊𝒆 𝑫𝒆𝒕𝒆𝒄𝒕𝒆𝒅 💎
───────────────────────
🕒 Verified: ${now}
💫 Status: Active
✦━━━━━━━━━━━━━━━━━━━━━✦`));
      return true;
    } else {
      console.log(chalk.redBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
⚠️ 𝑬𝒙𝒑𝒊𝒓𝒆𝒅 𝑪𝒐𝒐𝒌𝒊𝒆 ⚠️
───────────────────────
❌ Session no longer valid.
Please re-login to continue.
✦━━━━━━━━━━━━━━━━━━━━━✦`));
      return false;
    }

  } catch (err) {
    console.log(chalk.redBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
❌ 𝑬𝒓𝒓𝒐𝒓 𝑪𝒉𝒆𝒄𝒌𝒊𝒏𝒈 𝑪𝒐𝒐𝒌𝒊𝒆
───────────────────────
${err.message}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
    return false;
  }
};


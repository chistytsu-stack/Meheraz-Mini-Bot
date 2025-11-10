// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 💫 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - getFbstateFromToken.js
// 🔐 Convert Full-Permission Token → fbstate (Session Cookies)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const axios = require("axios");
const chalk = require("chalk");
const moment = require("moment-timezone");

// ──────────────💫 Utility ──────────────
const getTime = () => moment.tz("Asia/Dhaka").format("hh:mm:ss A");

/**
 * Convert a full-permission Facebook access token
 * into valid session cookies (fbstate)
 *
 * @param {string} tokenFullPermission - Full permission access token
 * @returns {Array} Array of cookies compatible with fca-unofficial
 */
module.exports = async function getFbstateFromToken(tokenFullPermission) {
  try {
    console.log(chalk.cyanBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🔐 Generating fbstate from Token...
───────────────────────
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦`));

    // Step 1️⃣: Get App Info
    const response1 = await axios({
      url: "https://graph.facebook.com/app",
      method: "GET",
      params: {
        access_token: tokenFullPermission
      }
    });

    if (response1.data.error) {
      throw new Error("❌ Token is invalid or expired");
    }

    // Step 2️⃣: Generate Session Cookies
    const response2 = await axios({
      url: "https://api.facebook.com/method/auth.getSessionforApp",
      method: "GET",
      params: {
        access_token: tokenFullPermission,
        format: "json",
        new_app_id: response1.data.id,
        generate_session_cookies: "1"
      }
    });

    if (response2.data.error_code) {
      throw new Error("❌ Token is invalid or unauthorized");
    }

    // Step 3️⃣: Map Cookies
    if (response2.data.session_cookies?.length > 0) {
      const cookies = response2.data.session_cookies.map(x => {
        x.key = x.name;
        delete x.name;
        return x;
      });

      console.log(chalk.greenBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
✅ fbstate Generated Successfully 🎉
───────────────────────
🍪 Cookies Count: ${cookies.length}
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦`));

      return cookies;
    } else {
      throw new Error("⚠️ No session cookies returned");
    }

  } catch (error) {
    console.log(chalk.redBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🚨 fbstate Generation Failed
───────────────────────
${error.message}
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
    throw error;
  }
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz Login System 💠
// ✦━━━━━━━━━━━━━━━━━━━━━✦


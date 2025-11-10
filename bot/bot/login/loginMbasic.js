// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 📁 File: bot/login/loginMbasic.js
// 👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const login = require("fca-unofficial");
const path = require("path");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚙️ Config Path
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const cookiePath = path.join(__dirname, "../../appstate.json");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 Meheraz MBasic Login
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = async function loginMbasic(email, password) {
  console.clear();
  console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦"));
  console.log(chalk.magentaBright("📱 Logging in via MBASIC Mode..."));
  console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));

  try {
    if (!email || !password) {
      console.log(chalk.redBright("❌ Missing email or password!"));
      console.log(chalk.yellowBright("ℹ️  Example: loginMbasic('youremail', 'yourpassword')"));
      return;
    }

    const mbasicURL = `https://mbasic.facebook.com/login`;
    const headers = {
      "User-Agent": "Mozilla/5.0 (Linux; Android 10)",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🔐 Attempt to login
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const response = await axios.post(
      mbasicURL,
      `email=${encodeURIComponent(email)}&pass=${encodeURIComponent(password)}`,
      { headers, maxRedirects: 0, validateStatus: null }
    );

    if (!response.headers["set-cookie"]) {
      console.log(chalk.redBright("❌ MBasic login failed! Invalid credentials."));
      return;
    }

    const cookies = response.headers["set-cookie"].map((c) => c.split(";")[0]);
    const appState = cookies.map((cookie) => {
      const parts = cookie.split("=");
      return { key: parts[0], value: parts[1] };
    });

    fs.writeFileSync(cookiePath, JSON.stringify(appState, null, 2));
    console.log(chalk.greenBright("✅ MBasic login successful! Appstate saved."));
    console.log(chalk.cyanBright("✨ Welcome to Meheraz Bot System 💠"));

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🔁 Login via fca-unofficial with saved cookies
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    login({ appState }, (err, api) => {
      if (err) {
        console.log(chalk.redBright("❌ Re-login failed!"));
        return console.error(err);
      }

      global.api = api;
      console.log(chalk.greenBright("🚀 Meheraz Bot is now connected via MBasic!"));
      console.log(chalk.cyanBright("⚡ Powered by Mirai + Meheraz Engine"));
    });
  } catch (err) {
    console.log(chalk.redBright("💥 Error during MBasic login:"));
    console.error(chalk.gray(err.message));
  }

  console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦\n"));
};


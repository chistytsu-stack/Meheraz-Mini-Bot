// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 💫 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - loadData.js
// 📦 Load fbstate, settings, and theme before login
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const moment = require("moment-timezone");

// ──────────────💫 Paths ──────────────
const appStatePath = path.join(__dirname, "appstate.json");
const themePath = path.join(__dirname, "../../assets/json/theme.json");
const settingsPath = path.join(__dirname, "../../assets/json/settings.json");

// ──────────────💫 Time Function ──────────────
const getTime = () => moment.tz("Asia/Dhaka").format("hh:mm:ss A");

// ──────────────💫 Load Function ──────────────
module.exports = function loadData() {
  console.log(chalk.cyanBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
📦 Loading Essential Bot Data...
───────────────────────
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦
  `));

  let fbstate = null, theme = {}, settings = {};

  // ──────────────💫 Load fbstate ──────────────
  try {
    if (fs.existsSync(appStatePath)) {
      fbstate = JSON.parse(fs.readFileSync(appStatePath, "utf8"));
      console.log(chalk.greenBright(`✅ fbstate Loaded (${fbstate.length} cookies)`));
    } else {
      console.log(chalk.redBright(`❌ fbstate not found at ${appStatePath}`));
    }
  } catch (err) {
    console.log(chalk.red(`⚠️ Error loading fbstate: ${err.message}`));
  }

  // ──────────────💫 Load Theme ──────────────
  try {
    if (fs.existsSync(themePath)) {
      theme = JSON.parse(fs.readFileSync(themePath, "utf8"));
      console.log(chalk.greenBright(`🎨 Theme Loaded: ${theme?.botColor || "Default"}`));
    } else {
      console.log(chalk.yellow(`⚠️ theme.json not found`));
    }
  } catch (err) {
    console.log(chalk.red(`⚠️ Error loading theme: ${err.message}`));
  }

  // ──────────────💫 Load Settings ──────────────
  try {
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
      console.log(chalk.greenBright(`⚙️ Settings Loaded: Prefix (${settings?.prefix || "!"})`));
    } else {
      console.log(chalk.yellow(`⚠️ settings.json not found`));
    }
  } catch (err) {
    console.log(chalk.red(`⚠️ Error loading settings: ${err.message}`));
  }

  // ──────────────💫 Final Result ──────────────
  console.log(chalk.blueBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
💫 All Data Loaded Successfully
───────────────────────
📁 fbstate: ${!!fbstate}
🎨 theme: ${Object.keys(theme).length > 0}
⚙️ settings: ${Object.keys(settings).length > 0}
✦━━━━━━━━━━━━━━━━━━━━━✦
  `));

  return { fbstate, theme, settings };
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz Bot System 💠
// ✦━━━━━━━━━━━━━━━━━━━━━✦


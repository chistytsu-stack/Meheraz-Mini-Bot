// ✦━━━━━━━━━━━━━━━━━━━━━✦
//  func/prism.js  
//  ✨ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 — Console Prism System
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const chalk = require("chalk");
const gradient = require("gradient-string");
const { glow } = require("./colors");

// 🌈 Syntax color map
const syntax = {
  keyword: chalk.hex("#9B5DE5").bold,
  string: chalk.hex("#F15BB5"),
  number: chalk.hex("#00BBF9"),
  boolean: chalk.hex("#00F5D4"),
  function: chalk.hex("#FEE440").bold,
  comment: chalk.hex("#AAAAAA").italic,
};

// 💫 Highlight JS-like code text
function highlight(code) {
  return code
    .replace(/(\/\/[^\n]*)/g, syntax.comment("$1")) // comment
    .replace(/\b(function|const|let|var|return|if|else|await|async|try|catch|new)\b/g, syntax.keyword("$1"))
    .replace(/(["'`].*?["'`])/g, syntax.string("$1"))
    .replace(/\b(\d+)\b/g, syntax.number("$1"))
    .replace(/\b(true|false)\b/g, syntax.boolean("$1"))
    .replace(/\b([a-zA-Z_]\w*)\s*\(/g, (_, fn) => syntax.function(fn) + "(");
}

// ⚡ Fancy console output
function showCode(title, code) {
  console.log("\n" + glow(`✦━━━━━━━━━━━━━━━━━━━━━✦`, "galaxy"));
  console.log(glow(`📄 ${title}`, "meheraz"));
  console.log(glow(`✦━━━━━━━━━━━━━━━━━━━━━✦`, "galaxy"));
  console.log(highlight(code));
  console.log(glow(`✦━━━━━━━━━━━━━━━━━━━━━✦`, "fire") + "\n");
}

// 🔮 Animated Theme Loader
async function animatedIntro() {
  const theme = gradient(["#00FFF7", "#FF00C3", "#6C63FF"]);
  const title = "⚡ Meheraz Prism Engine ⚡";
  for (let i = 0; i < 3; i++) {
    process.stdout.write("\r" + theme(title));
    await new Promise(r => setTimeout(r, 200));
  }
  process.stdout.write("\n✨ Loaded Successfully!\n");
}

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 📦 Exports
// ✦━━━━━━━━━━━━━━━━━━━━━✦
module.exports = {
  syntax,
  highlight,
  showCode,
  animatedIntro,
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz 💫
// ✦━━━━━━━━━━━━━━━━━━━━━✦

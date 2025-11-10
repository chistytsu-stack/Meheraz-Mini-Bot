// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑬𝒅𝒊𝒕𝒊𝒐𝒏 — api.js
// Lightweight API facade for fb-chat-api functions
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const utils = require('./utils');

module.exports = {
  sendMessage: require('./sendMessage'),
  listen: require('./listen'),
  login: require('./login'),
  utils
};

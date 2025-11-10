// ✦━━━━━━━━━━━━━━━━━━━━━✦
// sendMessage.js — friendly send wrapper
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const send = require('./send');
module.exports = async function(threadID, message) {
  return send({ threadID, body: message });
};

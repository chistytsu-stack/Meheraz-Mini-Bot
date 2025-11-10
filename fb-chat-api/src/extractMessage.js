// ✦━━━━━━━━━━━━━━━━━━━━━✦
// extractMessage.js
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = function(raw) {
  return { body: raw || '', createdAt: Date.now() };
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// generatePresence.js
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = function(status='online') {
  return { status, timestamp: Date.now() };
};

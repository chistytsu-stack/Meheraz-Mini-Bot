// ✦━━━━━━━━━━━━━━━━━━━━━✦
// globalCallback.js
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = function(event) {
  // central event callback
  console.log('[Meheraz]', 'Event received:', event && event.type);
};

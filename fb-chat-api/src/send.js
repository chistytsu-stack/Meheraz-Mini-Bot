// ✦━━━━━━━━━━━━━━━━━━━━━✦
// send.js — low level sender (stub)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = async function(payload) {
  console.log('Sending payload:', payload && payload.body ? payload.body.substring(0,80) : payload);
  return { success: true };
};

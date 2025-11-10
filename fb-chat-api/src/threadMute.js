// ✦━━━━━━━━━━━━━━━━━━━━━✦
// threadMute.js
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = async function(threadID, mute=true) {
  return { threadID, muted: mute };
};

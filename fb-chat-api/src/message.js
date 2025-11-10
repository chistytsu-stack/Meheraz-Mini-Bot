// ✦━━━━━━━━━━━━━━━━━━━━━✦
// message.js — message helpers
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = {
  build(text) { return { body: text, id: Date.now().toString() }; }
};

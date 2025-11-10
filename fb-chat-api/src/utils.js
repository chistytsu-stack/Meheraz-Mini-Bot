// ✦━━━━━━━━━━━━━━━━━━━━━✦
// utils.js — handy utilities (Meheraz Edition)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = {
  sleep(ms) { return new Promise(r => setTimeout(r, ms)); },
  now() { return Date.now(); }
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// log.js — Styled console logs (Meheraz Style)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const banner = '✦━━━━━━━━━━━━━━━━━━━━━✦';
module.exports = {
  info(...args) { console.log(banner, '[INFO]', ...args); },
  warn(...args) { console.warn(banner, '[WARN]', ...args); },
  error(...args) { console.error(banner, '[ERROR]', ...args); }
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// listen.js — Smooth Message Listener (Meheraz Edition)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const log = require('./log');
module.exports = function(onMessage) {
  log.info('Listener started — Meheraz Edition');
  // This stub triggers an empty message every 5s for demo/testing.
  const iv = setInterval(() => {
    onMessage({ threadID: 'demo', body: 'ping', createdAt: Date.now() });
  }, 5000);
  return () => { clearInterval(iv); log.info('Listener stopped'); };
};

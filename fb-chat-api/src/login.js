// ✦━━━━━━━━━━━━━━━━━━━━━✦
// login.js — simple login flow (stub)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const cookies = require('./cookies');
const log = require('./log');

module.exports = async function(credentials) {
  log.info('Logging in...', credentials && credentials.user ? credentials.user : 'anonymous');
  // In Meheraz Edition, replace with real login code.
  cookies.save({ token: 'demo-token' });
  return { success: true, token: 'demo-token' };
};

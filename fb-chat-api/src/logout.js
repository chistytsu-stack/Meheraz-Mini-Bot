// ✦━━━━━━━━━━━━━━━━━━━━━✦
// logout.js
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const cookies = require('./cookies');
module.exports = function() {
  cookies.save(null);
  return true;
};

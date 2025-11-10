// ✦━━━━━━━━━━━━━━━━━━━━━✦
// get.js (http get stub)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = async function(url) {
  return { url, status: 200, body: '' };
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// callbackResult.js
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = (err, res) => {
  if (err) return { success: false, error: err.message || err };
  return { success: true, data: res };
};

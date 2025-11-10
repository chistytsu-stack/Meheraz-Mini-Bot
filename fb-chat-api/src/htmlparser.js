// ✦━━━━━━━━━━━━━━━━━━━━━✦
// htmlparser.js (very small parser)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = function(html) {
  return html.replace(/<[^>]+>/g, '');
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// getSeqId.js (sequence id generator)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

let seq = 1;
module.exports = function() { return seq++; };

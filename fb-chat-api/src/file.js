// ✦━━━━━━━━━━━━━━━━━━━━━✦
// file.js (file utilities)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require('fs');
module.exports = {
  exists(path) { return fs.existsSync(path); },
  read(path) { return fs.readFileSync(path); }
};

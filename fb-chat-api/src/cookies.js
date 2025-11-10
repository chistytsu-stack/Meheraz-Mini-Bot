// ✦━━━━━━━━━━━━━━━━━━━━━✦
// cookies.js (simple cookie store)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require('fs');
const path = require('path');
const COOKIE_FILE = path.join(__dirname, '../.fb_cookies.json');

module.exports = {
  save(cookies) {
    try { fs.writeFileSync(COOKIE_FILE, JSON.stringify(cookies)); return true; } catch(e){ return false; }
  },
  load() {
    try { return JSON.parse(fs.readFileSync(COOKIE_FILE)); } catch(e){ return null; }
  }
};

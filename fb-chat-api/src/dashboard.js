// ✦━━━━━━━━━━━━━━━━━━━━━✦
// dashboard.js — integration hooks for Meheraz Dashboard
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const api = require('./src/api');

module.exports = {
  async status() {
    // Return lightweight health info for the dashboard
    return {
      uptime: process.uptime(),
      loggedIn: false,
      modules: Object.keys(api)
    };
  }
};

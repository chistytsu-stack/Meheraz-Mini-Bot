// ✦━━━━━━━━━━━━━━━━━━━━━✦
// chat.js (helpers)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = {
  formatThread(thread) {
    return { id: thread.threadID || thread.id, name: thread.name || 'unknown' };
  }
};

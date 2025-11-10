// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - Socket.IO Example (Login Connect)
// 💫 Used for Live Bot Connection Verification
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const { io } = require("socket.io-client");
const chalk = require("chalk");
const moment = require("moment-timezone");

// ──────────────💫 Example Config ──────────────
const SOCKET_SERVER_URL = "https://your-socket-server.com"; // 🔗 Replace with your real Socket.IO server
const AUTH_TOKEN = "YOUR_BOT_TOKEN"; // 🔐 Bot Token (keep private)

// ──────────────💫 Time Function ──────────────
const getTime = () => moment.tz("Asia/Dhaka").format("hh:mm:ss A");

// ──────────────💫 Main Function ──────────────
function connectSocketIO() {
  const socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 3000,
    auth: { token: AUTH_TOKEN },
  });

  // ──────────────💫 Connected ──────────────
  socket.on("connect", () => {
    console.log(chalk.greenBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
✅ 𝑺𝒐𝒄𝒌𝒆𝒕.𝑰𝑶 𝑳𝒐𝒈𝒊𝒏 𝑪𝒐𝒏𝒏𝒆𝒄𝒕𝒆𝒅 💫
───────────────────────
🕒 Time: ${getTime()}
🌐 Server: ${SOCKET_SERVER_URL}
🔑 Auth: Verified
✦━━━━━━━━━━━━━━━━━━━━━✦`));

    // Send initial bot info
    socket.emit("botConnected", {
      botName: "Meheraz Bot",
      version: "7.0",
      status: "online",
      time: getTime()
    });
  });

  // ──────────────💫 Broadcast Listener ──────────────
  socket.on("serverBroadcast", (data) => {
    console.log(chalk.cyanBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
📢 𝑺𝒆𝒓𝒗𝒆𝒓 𝑩𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕 𝑹𝒆𝒄𝒆𝒊𝒗𝒆𝒅 💎
───────────────────────
💬 Message: ${data.message}
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
  });

  // ──────────────💫 Disconnect ──────────────
  socket.on("disconnect", (reason) => {
    console.log(chalk.redBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
❌ 𝑺𝒐𝒄𝒌𝒆𝒕 𝑫𝒊𝒔𝒄𝒐𝒏𝒏𝒆𝒄𝒕𝒆𝒅
───────────────────────
⚠️ Reason: ${reason}
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
  });

  // ──────────────💫 Error ──────────────
  socket.on("connect_error", (err) => {
    console.log(chalk.red(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🚨 𝑳𝒐𝒈𝒊𝒏 𝑪𝒐𝒏𝒏𝒆𝒄𝒕 𝑬𝒓𝒓𝒐𝒓
───────────────────────
${err.message}
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
  });

  return socket;
}

// ──────────────💫 Export ──────────────
module.exports = connectSocketIO;

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz System 💠
// ✦━━━━━━━━━━━━━━━━━━━━━✦


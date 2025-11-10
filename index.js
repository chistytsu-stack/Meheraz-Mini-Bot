/*  
✦━━━━━━━━━━━━━━━━━━━━━✦
📂 File: index.js  
👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫  
✦━━━━━━━━━━━━━━━━━━━━━✦
*/

const fs = require("fs");
const path = require("path");
const login = require("fb-chat-api");
const chalk = require("chalk");

// Load Config Files
const config = JSON.parse(fs.readFileSync("./config.dev.json"));
const commandConfig = JSON.parse(fs.readFileSync("./configCommands.dev.json"));
const appStateFile = config.APPSTATE_FILE || "account.dev.txt";

// Animation Style Console Header
console.clear();
console.log(chalk.cyan(`
✦━━━━━━━━━━━━━━━━━━━━━✦
✨ ${config.BOTNAME} ✨
⚡ Powered by Meheraz Islam Chishti
📦 Version: ${config.VERSION}
✦━━━━━━━━━━━━━━━━━━━━━✦
`));

// Check Appstate
if (!fs.existsSync(appStateFile)) {
	console.log(chalk.redBright(`❌ Missing file: ${appStateFile}\nPlease login first or add your appstate!`));
	process.exit(1);
}

// Load Appstate
const appState = JSON.parse(fs.readFileSync(appStateFile));

// Login to Facebook
login({ appState }, (err, api) => {
	if (err) {
		console.log(chalk.redBright("⚠️ Login failed! Check your appstate or network."));
		console.error(err);
		process.exit(1);
	}

	console.log(chalk.greenBright(`✅ ${config.BOTNAME} Logged in successfully!`));
	console.log(chalk.yellowBright(`💬 Prefix: ${config.PREFIX}`));

	// Save global variables
	global.config = config;
	global.api = api;
	global.loginTime = Date.now();

	// Listen for messages
	api.listenMqtt(async (err, event) => {
		if (err) return console.error(chalk.red("⚠️ Listen error:"), err);

		if (event.type === "message" || event.type === "message_reply") {
			const message = event.body || "";
			const threadID = event.threadID;
			const senderID = event.senderID;

			// Skip bot’s own messages
			if (senderID === api.getCurrentUserID()) return;

			// Prefix check
			const prefix = config.PREFIX;
			if (!message.startsWith(prefix)) return;

			// Extract command & args
			const [cmdName, ...args] = message.slice(prefix.length).trim().split(/\s+/);

			// Find command in configCommands
			const command = commandConfig.COMMANDS[cmdName];
			if (!command || !command.enabled) {
				if (commandConfig.GLOBAL.SHOW_DISABLED_COMMANDS)
					return api.sendMessage(`🚫 Command "${cmdName}" is disabled.`, threadID);
				else return;
			}

			// Execute common commands
			switch (cmdName.toLowerCase()) {
				case "ping":
					return api.sendMessage("🏓 Pong! I'm alive 💫", threadID);

				case "uptime": {
					const uptime = Date.now() - global.loginTime;
					const h = Math.floor(uptime / (1000 * 60 * 60));
					const m = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
					const s = Math.floor((uptime % (1000 * 60)) / 1000);
					return api.sendMessage(
						`✦━━━━━━━━━━━━━━━━━━━━━✦\n🕐 Uptime: ${h}h ${m}m ${s}s\n⚡ Running Smoothly 💫\n✦━━━━━━━━━━━━━━━━━━━━━✦`,
						threadID
					);
				}

				case "help": {
					const list = Object.keys(commandConfig.COMMANDS)
						.filter(cmd => commandConfig.COMMANDS[cmd].enabled)
						.map(cmd => `${config.PREFIX}${cmd} — ${commandConfig.COMMANDS[cmd].description}`)
						.join("\n");
					return api.sendMessage(
						`✦━━━━━━━━━━━━━━━━━━━━━✦\n📜 Available Commands:\n${list}\n✦━━━━━━━━━━━━━━━━━━━━━✦`,
						threadID
					);
				}

				case "prefix":
					return api.sendMessage(`⚙️ Current Prefix: ${config.PREFIX}`, threadID);

				case "restart":
					api.sendMessage("🔄 Restarting... Please wait 💫", threadID, () => process.exit(1));
					break;

				default:
					return api.sendMessage(`❓ Unknown command: ${cmdName}`, threadID);
			}
		}
	});
});

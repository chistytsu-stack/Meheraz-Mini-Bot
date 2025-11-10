const axios = require('axios');

const baseApiUrl = async () => {
    return "https://www.noobs-api.rf.gd/dipto";
};

module.exports.config = {
    name: "bby",
    version: "6.9.1",
    hasPermission: 0,
    credits: "dipto",
    description: "Better than all SimSimi bots 💬",
    commandCategory: "chat",
    usages: "[text | teach | list | remove | edit]",
    cooldowns: 0
};

module.exports.run = async function({ api, event, args, Users }) {
    const link = `${await baseApiUrl()}/baby`;
    const dipto = args.join(" ").toLowerCase();
    const uid = event.senderID;
    let command, comd, final;

    try {
        if (!args[0]) {
            const ran = ["Bolo baby", "hum", "type help baby", "type !baby hi"];
            return api.sendMessage(ran[Math.floor(Math.random() * ran.length)], event.threadID, event.messageID);
        }

        // REMOVE FULL MESSAGE
        if (args[0] === 'remove') {
            const fina = dipto.replace("remove ", "");
            const dat = (await axios.get(`${link}?remove=${encodeURIComponent(fina)}&senderID=${uid}`)).data.message;
            return api.sendMessage(dat, event.threadID, event.messageID);
        }

        // REMOVE BY INDEX
        if (args[0] === 'rm' && dipto.includes('-')) {
            const [fi, f] = dipto.replace("rm ", "").split(' - ');
            const da = (await axios.get(`${link}?remove=${encodeURIComponent(fi)}&index=${encodeURIComponent(f)}&senderID=${uid}`)).data.message;
            return api.sendMessage(da, event.threadID, event.messageID);
        }

        // LIST TEACHES
        if (args[0] === 'list') {
            if (args[1] === 'all') {
                const data = (await axios.get(`${link}?list=all`)).data;
                const teachers = await Promise.all(data.teacher.teacherList.map(async (item) => {
                    const number = Object.keys(item)[0];
                    const value = item[number];
                    const userData = await Users.getData(number);
                    const name = userData.name || number;
                    return { name, value };
                }));
                teachers.sort((a, b) => b.value - a.value);
                const output = teachers.map((t, i) => `${i + 1}. ${t.name}: ${t.value}`).join('\n');
                return api.sendMessage(`👑 Total Teach: ${data.length}\n\n📜 Teachers List:\n${output}`, event.threadID, event.messageID);
            } else {
                const d = (await axios.get(`${link}?list=all`)).data.length;
                return api.sendMessage(`Total Teach = ${d}`, event.threadID, event.messageID);
            }
        }

        // SHOW MESSAGE REPLIES
        if (args[0] === 'msg') {
            const fuk = dipto.replace("msg ", "");
            const d = (await axios.get(`${link}?list=${encodeURIComponent(fuk)}`)).data.data;
            return api.sendMessage(`Message ${fuk} = ${d}`, event.threadID, event.messageID);
        }

        // EDIT MESSAGE
        if (args[0] === 'edit') {
            const [key, newVal] = dipto.replace("edit ", "").split(" - ");
            if (!key || !newVal) return api.sendMessage('❌ | Format: edit [YourMessage] - [NewReply]', event.threadID, event.messageID);
            const dA = (await axios.get(`${link}?edit=${encodeURIComponent(key)}&replace=${encodeURIComponent(newVal)}&senderID=${uid}`)).data.message;
            return api.sendMessage(`✅ Changed: ${dA}`, event.threadID, event.messageID);
        }

        // TEACH NORMAL
        if (args[0] === 'teach' && args[1] !== 'amar' && args[1] !== 'react') {
            [comd, command] = dipto.split(' - ');
            final = comd.replace("teach ", "");
            if (!command || command.length < 2) return api.sendMessage('❌ | Format: teach [msg] - [reply]', event.threadID, event.messageID);
            const re = await axios.get(`${link}?teach=${encodeURIComponent(final)}&reply=${encodeURIComponent(command)}&senderID=${uid}`);
            const tex = re.data.message;
            const teacherName = (await Users.getData(re.data.teacher)).name || "Unknown";
            return api.sendMessage(`✅ Replies added ${tex}\n👨‍🏫 Teacher: ${teacherName}\n📚 Total teaches: ${re.data.teachs}`, event.threadID, event.messageID);
        }

        // TEACH INTRO
        if (args[0] === 'teach' && args[1] === 'amar') {
            [comd, command] = dipto.split(' - ');
            final = comd.replace("teach ", "");
            if (!command || command.length < 2) return api.sendMessage('❌ | Format: teach amar [msg] - [reply]', event.threadID, event.messageID);
            const tex = (await axios.get(`${link}?teach=${encodeURIComponent(final)}&senderID=${uid}&reply=${encodeURIComponent(command)}&key=intro`)).data.message;
            return api.sendMessage(`✅ Intro replies added ${tex}`, event.threadID, event.messageID);
        }

        // TEACH REACT
        if (args[0] === 'teach' && args[1] === 'react') {
            [comd, command] = dipto.split(' - ');
            final = comd.replace("teach react ", "");
            if (!command || command.length < 2) return api.sendMessage('❌ | Format: teach react [msg] - [react]', event.threadID, event.messageID);
            const tex = (await axios.get(`${link}?teach=${encodeURIComponent(final)}&react=${encodeURIComponent(command)}&senderID=${uid}`)).data.message;
            return api.sendMessage(`✅ Reacts added ${tex}`, event.threadID, event.messageID);
        }

        // ASK NAME
        if (dipto.includes('amar name ki') || dipto.includes('amr nam ki') || dipto.includes('whats my name')) {
            const data = (await axios.get(`${link}?text=amar name ki&senderID=${uid}&key=intro`)).data.reply;
            return api.sendMessage(data, event.threadID, event.messageID);
        }

        // NORMAL CHAT
        const d = (await axios.get(`${link}?text=${encodeURIComponent(dipto)}&senderID=${uid}&font=1`)).data.reply;
        if (!d) return api.sendMessage("🤖 Baby didn’t understand that.", event.threadID, event.messageID);
        return api.sendMessage(d, event.threadID, event.messageID);

    } catch (e) {
        console.error(e);
        return api.sendMessage("⚠️ Error occurred, check console for details.", event.threadID, event.messageID);
    }
};

// Auto chat trigger (baby, bby, babu etc.)
module.exports.handleEvent = async function({ api, event, Users }) {
    try {
        const body = event.body ? event.body.toLowerCase() : "";
        if (!body) return;
        const uid = event.senderID;
        const name = (await Users.getData(uid)).name || "প্রিয়";

        // Trigger words
        if (body.startsWith("baby") || body.startsWith("bby") || body.startsWith("bot") || body.startsWith("jan") || body.startsWith("babu") || body.startsWith("janu")) {
            const arr = body.replace(/^\S+\s*/, "");

            const replies = [
                "✦━━━━━━━━━━━━━━━━✦\n How Can I help you 😒🌷\n ✦━━━━━━━━━━━━━━━━✦",
                "✦━━━━━━━━━━━━━━━━✦\n আমাকে না ডেকে CHISTY কে ডাক 😇🫦\n ✦━━━━━━━━━━━━━━━━✦",
                "✦━━━━━━━━━━━━━━━━✦\n আমি বস এর সাথে ব্যস্ত আছি 🙈👀🌊\n ✦━━━━━━━━━━━━━━━━✦",
                "✦━━━━━━━━━━━━━━━━✦\n YOU ARE SO PRETTY 🎀\n ✦━━━━━━━━━━━━━━━━✦",
                "✦━━━━━━━━━━━━━━━━✦\n BAH TUMI KHUB SHUNDOR 💗☺️\n ✦━━━━━━━━━━━━━━━━✦",
                "✦━━━━━━━━━━━━━━━━✦\n YES I'M BOT. YOU? 🙈😥\n ✦━━━━━━━━━━━━━━━━✦"
            ];

            const selected = replies[Math.floor(Math.random() * replies.length)];
            const finalReply = `❀ ${name} ❀\n\n${selected}`;

            // Only call if user didn’t add text
            if (!arr) return api.sendMessage(finalReply, event.threadID, event.messageID);

            const a = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(arr)}&senderID=${uid}&font=1`)).data.reply;
            return api.sendMessage(a, event.threadID, event.messageID);
        }

    } catch (err) {
        console.error(err);
        return api.sendMessage(`⚠️ Error: ${err.message}`, event.threadID, event.messageID);
    }
};


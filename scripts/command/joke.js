const axios = require("axios");

module.exports = {
  config: {
    name: "joke",
    aliases: ["funny", "lol"],
    version: "1.0",
    author: "✦𝑴𝒆𝒉𝒆𝒓𝒂𝒛✦",
    countDown: 3,
    role: 0,
    shortDescription: "Send a random funny joke 😆",
    longDescription: "Get a random joke to make your chat full of laughter 💫",
    category: "fun",
    guide: "{p}joke"
  },

  onStart: async function ({ api, event }) {
    try {
      const res = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
      const joke = res.data.joke;

      api.sendMessage(
        `😂 ✦𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑱𝒐𝒌𝒆 𝑺𝒚𝒔𝒕𝒆𝒎✦ 😂\n\n💬 ${joke}\n\n⚡ Powered by Meheraz 💫`,
        event.threadID,
        event.messageID
      );
    } catch (err) {
      console.log(err);
      api.sendMessage("😅 Oops! Can't fetch a joke right now.", event.threadID);
    }
  }
};

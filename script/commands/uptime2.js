const process = require("process");

module.exports.config = {
  name: "uptime",
  version: "1.5.0",
  hasPermssion: 0,
  credits: "SaGor",
  description: "Shows bot name, uptime, and ping in modern stylish format",
  commandCategory: "utility",
  usages: "uptime",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const botName = "MIRAI BOT"; // fixed bot name
  const uptimeSec = process.uptime();
  const days = Math.floor(uptimeSec / 86400);
  const hours = Math.floor((uptimeSec % 86400) / 3600);
  const minutes = Math.floor((uptimeSec % 3600) / 60);
  const seconds = Math.floor(uptimeSec % 60);

  const startTime = Date.now();
  const ping = Date.now() - startTime;

  const message = `
╔═════════════════════╗
║ 🖤✨ ${botName.toUpperCase()} ✨🖤
╠═════════════════════╣
║ ⏳ Uptime : ${days}d ${hours}h ${minutes}m ${seconds}s
║ ⚡ Ping   : ${ping} ms
╚═════════════════════╝
`;

  return api.sendMessage(message, event.threadID, event.messageID);
};

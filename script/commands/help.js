module.exports.config = {
    name: "help",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "SaGor",
    description: "Show all commands or info of a specific command",
    commandCategory: "no prefix",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async function({ api, event, client }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const trigger = body.toLowerCase();
    if (!trigger.startsWith("help")) return;

    const args = body.split(" ").slice(1);
    const categories = {};
    client.commands.forEach(cmd => {
        const cat = cmd.config.commandCategory || "Others";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd.config.name);
    });

    if(args[0]) {
        const cmd = client.commands.get(args[0].toLowerCase());
        if(!cmd) return api.sendMessage(`❌ Command '${args[0]}' not found!`, threadID, messageID);
        const { name, description, version, hasPermssion, credits, cooldowns, aliases } = cmd.config;
        return api.sendMessage(
            `╭╼|━━━━━━━━━━━━━━|╾╮\n` +
            `📌 Name: ${name}\n` +
            `📝 Description: ${description}\n` +
            `⚡ Version: ${version}\n` +
            `👤 Permission: ${hasPermssion}\n` +
            `💳 Credits: ${credits}\n` +
            `⏱ Cooldown: ${cooldowns}s\n` +
            `🔹 Aliases: ${aliases?.join(", ") || "None"}\n` +
            `╰╼|━━━━━━━━━━━━━━|╾╯`,
            threadID,
            messageID
        );
    } else {
        let msg = "╭╼|━━━━━━━━━━━━━━|╾╮\n   📜 BOT COMMAND LIST 📜\n╰╼|━━━━━━━━━━━━━━|╾╯\n\n";
        for(const cat in categories) {
            msg += `╭─📂 ${cat} (${categories[cat].length})\n`;
            msg += `│ ${categories[cat].join(" | ")}\n`;
            msg += `╰──────────────\n\n`;
        }
        return api.sendMessage(msg, threadID, messageID);
    }
};

module.exports.run = async function() {};

module.exports.config = {
    name: "help",
    version: "1.0.6",
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

    const msgBody = body.toLowerCase();
    if (!msgBody.startsWith("help")) return; // Only trigger messages starting with "help"

    const args = body.trim().split(" ").slice(1);

    // Group commands by category
    const categories = {};
    client.commands.forEach(cmd => {
        const cat = cmd.config.commandCategory || "Others";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd.config.name);
    });

    if (args[0]) {
        // Show info for a specific command
        const cmdName = args[0].toLowerCase();
        const cmd = client.commands.get(cmdName) || client.commands.find(c => c.config.aliases?.includes(cmdName));
        if (!cmd) return api.sendMessage(`❌ Command '${args[0]}' not found!`, threadID, messageID);

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
        // Show all commands by category in one line per category
        let msg = "╭╼|━━━━━━━━━━━━━━|╾╮\n   📜 BOT COMMAND LIST 📜\n╰╼|━━━━━━━━━━━━━━|╾╯\n\n";
        for (const cat in categories) {
            msg += `📂 ${cat} (${categories[cat].length}): ${categories[cat].join(" | ")}\n\n`;
        }
        return api.sendMessage(msg, threadID, messageID);
    }
};

// Run function not used for no-prefix
module.exports.run = async function() {};

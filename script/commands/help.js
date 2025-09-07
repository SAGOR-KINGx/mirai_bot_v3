module.exports.config = {
    name: "help",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "Show all commands or info about a specific command",
    commandCategory: "System",
    usages: "[command name]",
    cooldowns: 2
};

module.exports.run = async function({ event, args, api }) {
    const { threadID, messageID } = event;
    const allCommands = Array.from(global.client.commands.values());
    
    if (args.length > 0) {
        const name = args.join("").toLowerCase();
        const command = global.client.commands.get(name);
        if (!command) return api.sendMessage(`[⚠️] Command '${name}' not found!`, threadID, messageID);

        const { name: cmdName, version, hasPermssion, credits, cooldowns, dependencies } = command.config;
        return api.sendMessage(
            `====== ${cmdName.toUpperCase()} ======\n` +
            `- Description: ${command.config.description || "No description"}\n` +
            `- Version: ${version}\n` +
            `- Created by: ${credits}\n` +
            `- Permission: ${hasPermssion == 0 ? "User" : hasPermssion == 1 ? "Admin" : "Bot Admin"}\n` +
            `- Cooldown: ${cooldowns} sec(s)\n` +
            `- Dependencies: ${(Object.keys(dependencies || {})).join(", ") || "None"}`,
            threadID,
            messageID
        );
    }

    const categories = {};
    for (const cmd of allCommands) {
        const category = cmd.config.commandCategory || "Other";
        if (!categories[category]) categories[category] = [];
        categories[category].push(cmd.config.name);
    }

    let msg = "====== BOT HELP ======\n\n";
    for (const cat in categories) {
        msg += `📂 ${cat} (${categories[cat].length}):\n`;
        msg += categories[cat].join(", ") + "\n\n";
    }

    return api.sendMessage(msg, threadID, messageID);
};

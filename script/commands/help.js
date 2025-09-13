module.exports.config = {
    name: "help",
    version: "2.1",
    hasPermssion: 0,
    credits: "SaGor",
    description: "Show all commands or detailed info",
    commandCategory: "System",
    usages: "help [command_name]",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    try {
        const commands = Array.from(global.client.commands.values());
        const prefix = global.client.config?.PREFIX || "!";

        
        if (!args[0]) {
            let totalCommands = commands.length;
            let helpMessage = "";
            const categories = {};

            commands.forEach(cmd => {
                const cat = cmd.config.commandCategory || "Other";
                if (!categories[cat]) categories[cat] = [];
                categories[cat].push(cmd.config.name);
            });

            for (const cat in categories) {
                helpMessage += `╭──『 ${cat.toUpperCase()} 』\n`;
                helpMessage += categories[cat].map(c => `✧ ${c}`).join(" ✧ ") + "\n";
                helpMessage += "╰───────────◊\n\n";
            }

            helpMessage += `╭────────────◊\n│ » Type [ -help <command> ]\n│ » Total commands: ${totalCommands}\n│ » Author: ✨ SAGOR ✨\n╰────────◊\n\n「 MIRAI BOT 」`;

            return api.sendMessage(helpMessage, event.threadID);
        }

      
        const commandName = args[0].toLowerCase();
        const cmdFound = commands.find(cmd => {
            if (cmd.config.name.toLowerCase() === commandName) return true;
            if (cmd.config.aliases && cmd.config.aliases.some(a => a.toLowerCase() === commandName)) return true;
            return false;
        });

        if (!cmdFound) return api.sendMessage(`❌ Command '${args[0]}' not found.`, event.threadID);

        const detail = `
╔══『 🔹 ${cmdFound.config.name.toUpperCase()} 』
│ 💬 Description: ${cmdFound.config.description || "No description"}
│ 🛠 Usage: ${prefix}${cmdFound.config.usages || cmdFound.config.name}
│ 📂 Category: ${cmdFound.config.commandCategory || "Other"}
│ 🏷 Credits: ${cmdFound.config.credits || "Unknown"}
│ 🔑 Permission: ${cmdFound.config.hasPermssion || 0}
│ ⏱ Cooldown: ${cmdFound.config.cooldowns || 0}s
╚══════════════════◊
`;

        return api.sendMessage(detail, event.threadID);

    } catch (err) {
        console.error(err);
        return api.sendMessage("❌ An error occurred while fetching help.", event.threadID);
    }
};

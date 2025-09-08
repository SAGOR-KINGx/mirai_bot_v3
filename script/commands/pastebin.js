const fs = require("fs");
const path = require("path");
const axios = require("axios");
const fsExtra = require("fs-extra");

module.exports.config = {
    name: "bin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Sagor",
    description: "Fetch CMD raw content from Pastebin",
    commandCategory: "owner",
    usages: "bin <cmd_name>",
    cooldowns: 3,
};

module.exports.run = async function({ api, event, args }) {
    if (!args[0]) return api.sendMessage("❌ Please provide CMD name\nExample: bin sms", event.threadID, event.messageID);

    const cmdName = args[0].toLowerCase();
    const cmdPath = path.join(__dirname, "..", "cmds", cmdName + ".js");

    if (!fs.existsSync(cmdPath)) return api.sendMessage(`❌ CMD not found: ${cmdName}`, event.threadID, event.messageID);

    const pastebinApiUrl = `https://sagor-z-pastebin.vercel.app/raw/${cmdName}`;

    try {
        const res = await axios.get(pastebinApiUrl);
        let data = res.data;

        if (typeof data === "object") data = JSON.stringify(data, null, 2);

        if (data.length > 1900) {
            const filePath = path.join(__dirname, "cache", `${cmdName}.txt`);
            await fsExtra.writeFile(filePath, data, "utf8");

            await api.sendMessage({
                body: `📄 CMD "${cmdName}" is too long. Sending as file.`,
                attachment: fsExtra.createReadStream(filePath)
            }, event.threadID, event.messageID);

            fsExtra.unlinkSync(filePath);
        } else {
            await api.sendMessage(`📄 CMD "${cmdName}":\n\n${data}`, event.threadID, event.messageID);
        }

    } catch (err) {
        return api.sendMessage("⚠️ Error fetching data from Pastebin!", event.threadID, event.messageID);
    }
};

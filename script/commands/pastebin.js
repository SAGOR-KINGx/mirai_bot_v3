const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
    name: "bin",
    version: "4.0.0",
    hasPermssion: 0,
    credits: "Sagor",
    description: "Fetch CMD raw content from Pastebin as text (Unlimited, split automatically)",
    commandCategory: "owner",
    usages: "bin <cmd_name>",
    cooldowns: 3,
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID } = event;

    if (!args[0]) 
        return api.sendMessage("❌ Please provide CMD name\nExample: bin sms", threadID, messageID);

    const cmdName = args[0].toLowerCase();
    const cmdPath = path.join(__dirname, "..", "cmds", `${cmdName}.js`);

    if (!fs.existsSync(cmdPath)) 
        return api.sendMessage(`❌ CMD not found: ${cmdName}`, threadID, messageID);

    const pastebinApiUrl = `https://sagor-z-pastebin.vercel.app/raw/${cmdName}`;

    try {
        const res = await axios.get(pastebinApiUrl);
        let data = res.data;

        if (typeof data === "object") data = JSON.stringify(data, null, 2);

        // Messenger message limit safeguard
        const chunkSize = 1800;
        let chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }

        // Text response with code block formatting
        for (let i = 0; i < chunks.length; i++) {
            const responseText = 
`📄 CMD Name: ${cmdName}
🔢 Part: ${i + 1}/${chunks.length}
💻 Preview:
\`\`\`js
${chunks[i]}
\`\`\``;

            await api.sendMessage(responseText, threadID);
        }

    } catch (err) {
        console.error(err);
        return api.sendMessage("⚠️ Error fetching data from Pastebin!", threadID, messageID);
    }
};

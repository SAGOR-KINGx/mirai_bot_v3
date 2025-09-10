const a = require("axios");

module.exports.config = {
    name: "imgur",
    version: "1.0.0",
    credits: "ArYAN",
    hasPermission: 0,
    description: "Upload an image/video to Imgur",
    commandCategory: "utility",
    usages: "reply to an image/video or provide a URL",
    cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, messageReply } = event;
    let b = "";

    if (messageReply && messageReply.attachments.length > 0) {
        b = messageReply.attachments[0].url;
    } else if (args.length > 0) {
        b = args.join(" ");
    }

    if (!b) {
        return api.sendMessage("❌ Please reply to an image/video or provide a URL!", threadID, messageID);
    }

    try {
        api.setMessageReaction("⏳", messageID, () => {}, true);

        const c = await a.get(`https://apis-toop.vercel.app/aryan/imgur?url=${encodeURIComponent(b)}`);
        const d = c.data.imgur;

        if (!d) {
            api.setMessageReaction("", messageID, () => {}, true);
            return api.sendMessage("❌ Failed to upload to Imgur.", threadID, messageID);
        }

        api.setMessageReaction("✅", messageID, () => {}, true);
        return api.sendMessage(`${d}`, threadID, messageID);

    } catch (err) {
        console.error(err.message);
        api.setMessageReaction("", messageID, () => {}, true);
        return api.sendMessage("⚠️ An error occurred while uploading.", threadID, messageID);
    }
};

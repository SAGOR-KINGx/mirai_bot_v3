const a = require("axios");
const b = require("fs");
const c = require("path");

const d = "https://nix-album-api.vercel.app";
const e = "https://apis-toop.vercel.app/aryan/imgur";

module.exports.config = {
    name: "album",
    version: "0.0.1",
    credits: "ArYAN",
    hasPermission: 0,
    description: "Album video system",
    commandCategory: "media",
    usages: "[page/add/list]",
    cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
    if (args[0] === "add") {
        if (!args[1]) return api.sendMessage("[⚜️]➜ Please specify a category. Usage: album add [category] [video_url] or reply to a video.", event.threadID, event.messageID);

        const category = args[1].toLowerCase();
        let videoUrl = args[2];

        if (event.messageReply && event.messageReply.attachments?.length > 0) {
            const att = event.messageReply.attachments[0];
            if (att.type !== "video") return api.sendMessage("[⚜️]➜ Only video attachments are allowed.", event.threadID, event.messageID);
            videoUrl = att.url;
        }

        if (!videoUrl) return api.sendMessage("[⚜️]➜ Please provide a video URL or reply to a video message.", event.threadID, event.messageID);

        try {
            const f = await a.get(e, { params: { url: videoUrl } });
            if (!f.data || !f.data.imgur) throw new Error("Imgur upload failed. No URL returned from the API.");

            const g = f.data.imgur;
            const h = await a.post(`${d}/api/album/add`, { category, videoUrl: g });
            return api.sendMessage(h.data.message, event.threadID, event.messageID);
        } catch (err) {
            return api.sendMessage(`[⚜️]➜ Failed to add video.\nError: ${err.response?.data?.error || err.message}`, event.threadID, event.messageID);
        }

    } else if (args[0] === "list") {
        try {
            const r = await a.get(`${d}/api/category/list`);
            if (r.data.success) {
                const list = r.data.categories.map((cat, i) => `${i + 1}. ${cat}`).join("\n");
                return api.sendMessage(`𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐀𝐥𝐛𝐮𝐦 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐞𝐬:\n\n${list}`, event.threadID, event.messageID);
            } else {
                return api.sendMessage(`[⚜️]➜ Failed to fetch categories.\nError: ${r.data.error}`, event.threadID, event.messageID);
            }
        } catch {
            return api.sendMessage(`[⚜️]➜ Error while fetching categories from the API.`, event.threadID, event.messageID);
        }

    } else {
        const cats = ["funny","islamic","sad","anime","lofi","attitude","ff","love","horny","baby","romantic","cartoon","pubg","emotional","meme","song","friend","trending","hinata","gojo","car","cat","random","game","asif","azhari","girl","travel","food","nature","tiktok","naruto","phone","editing","neymar","messi","ronaldo","football","hindi","18+"];
        const names = ["𝐅𝐮𝐧𝐧𝐲 𝐕𝐢𝐝𝐞𝐨","𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐕𝐢𝐝𝐞𝐨","𝐒𝐚𝐝 𝐕𝐢𝐝𝐞𝐨","𝐀𝐧𝐢𝐦𝐞 𝐕𝐢𝐝𝐞𝐨","𝐋𝐨𝐅𝐈 𝐕𝐢𝐝𝐞𝐨","𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞 𝐕𝐢𝐝𝐞𝐨","𝐅𝐟 𝐕𝐢𝐝𝐞𝐨","𝐋𝐨𝐯𝐞 𝐕𝐢𝐝𝐞𝐨","𝐡𝐨𝐫𝐧𝐲 𝐕𝐢𝐝𝐞𝐨","𝐛𝐚𝐛𝐲 𝐕𝐢𝐝𝐞𝐨","𝐫𝐨𝐦𝐚𝐧𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨","𝐜𝐚𝐫𝐭𝐨𝐨𝐧 𝐕𝐢𝐝𝐞𝐨","𝐩𝐮𝐛𝐠 𝐕𝐢𝐝𝐞𝐨","𝐞𝐦𝐨𝐭𝐢𝐨𝐧𝐚𝐥 𝐕𝐢𝐝𝐞𝐨","𝐦𝐞𝐦𝐞 𝐕𝐢𝐝𝐞𝐨","𝐬𝐨𝐧𝐠 𝐕𝐢𝐝𝐞𝐨","𝐟𝐫𝐢𝐞𝐧𝐝 𝐕𝐢𝐝𝐞𝐨","𝐭𝐫𝐞𝐧𝐝𝐢𝐧𝐠 𝐕𝐢𝐝𝐞𝐨","𝐡𝐢𝐧𝐚𝐭𝐚 𝐕𝐢𝐝𝐞𝐨","𝐠𝐨𝐣𝐨 𝐕𝐢𝐝𝐞𝐨","𝐜𝐚𝐫 𝐕𝐢𝐝𝐞𝐨","𝐜𝐚𝐭 𝐕𝐢𝐝𝐞𝐨","𝐫𝐚𝐧𝐝𝐨𝐦 𝐕𝐢𝐝𝐞𝐨","𝐠𝐚𝐦𝐞 𝐕𝐢𝐝𝐞𝐨","𝐚𝐬𝐢𝐟 𝐡𝐮𝐣𝐮𝐫 𝐕𝐢𝐝𝐞𝐨","𝐚𝐳𝐡𝐚𝐫𝐢 𝐡𝐮𝐣𝐮𝐫 𝐕𝐢𝐝𝐞𝐨","𝐠𝐢𝐫𝐥 𝐕𝐢𝐝𝐞𝐨","𝐭𝐫𝐚𝐯𝐞𝐥 𝐕𝐢𝐝𝐞𝐨","𝐟𝐨𝐨𝐝 𝐕𝐢𝐝𝐞𝐨","𝐧𝐚𝐭𝐮𝐫𝐞 𝐕𝐢𝐝𝐞𝐨","𝐭𝐢𝐤𝐭𝐨𝐤 𝐕𝐢𝐝𝐞𝐨","𝐧𝐚𝐫𝐮𝐭𝐨 𝐕𝐢𝐝𝐞𝐨","𝐩𝐡𝐨𝐧𝐞 𝐕𝐢𝐝𝐞𝐨","𝐞𝐝𝐢𝐭𝐢𝐧𝐠 𝐕𝐢𝐝𝐞𝐨","𝐍𝐞𝐲𝐦𝐚𝐫 𝐕𝐢𝐝𝐞𝐨","𝐌𝐞𝐬𝐬𝐢 𝐕𝐢𝐝𝐞𝐨","𝐑𝐨𝐧𝐚𝐥𝐝𝐨 𝐕𝐢𝐝𝐞𝐨","𝐅𝐨𝐨𝐭𝐛𝐚𝐥𝐥 𝐕𝐢𝐝𝐞𝐨","𝐡𝐢𝐧𝐝𝐢 𝐕𝐢𝐝𝐞𝐨","18+ 𝐕𝐢𝐝𝐞𝐨"];

        const per = 10;
        const page = parseInt(args[0]) || 1;
        const total = Math.ceil(names.length / per);
        if (page < 1 || page > total) return api.sendMessage(`[⚜️]➜ Invalid page! Please choose between 1 - ${total}.`, event.threadID, event.messageID);

        const start = (page - 1) * per;
        const end = start + per;
        const show = names.slice(start, end);

        const msg = `𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐀𝐥𝐛𝐮𝐦 𝐕𝐢𝐝𝐞𝐨 𝐋𝐢𝐬𝐭 🎀\n` +
            "𐙚━━━━━━━━━━━━━━━━━ᡣ𐭩\n" +
            show.map((opt, i) => `${start + i + 1}. ${opt}`).join("\n") +
            "\n𐙚━━━━━━━━━━━━━━━━━ᡣ𐭩" +
            `\n♻ | 𝐏𝐚𝐠𝐞 [${page}/${total}]\nℹ | 𝐓𝐲𝐩𝐞 album ${page + 1} - 𝐭𝐨 𝐬𝐞𝐞 𝐧𝐞𝐱𝐭 𝐩𝐚𝐠𝐞.`.repeat(page < total);

        api.sendMessage(msg, event.threadID, (err, info) => {
            global.client.handleReply.push({
                type: "choose",
                name: this.config.name,
                author: event.senderID,
                messageID: info.messageID,
                cats,
                names
            });
        }, event.messageID);
    }
};

module.exports.handleReply = async function({ api, event, handleReply }) {
    if (handleReply.type === "choose" && event.senderID === handleReply.author) {
        const pick = parseInt(event.body);
        if (isNaN(pick) || pick < 1 || pick > handleReply.cats.length) return api.sendMessage("Please reply with a valid number.", event.threadID, event.messageID);

        const cat = handleReply.cats[pick - 1];
        const cap = `𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫  ${handleReply.names[pick - 1]} 𝐁𝐚𝐛𝐲 <🐥`;

        try {
            const r = await a.get(`${d}/api/album/videos/${cat}`);
            if (!r.data.success || !r.data.videos?.length) return api.sendMessage("[⚜️]➜ No videos found for this category.", event.threadID, event.messageID);

            const vid = r.data.videos[Math.floor(Math.random() * r.data.videos.length)];
            const file = c.join(__dirname, "temp.mp4");

            const stream = await a({ url: vid, method: "GET", responseType: "stream", headers: { "User-Agent": "Mozilla/5.0" } });
            const writer = b.createWriteStream(file);
            stream.data.pipe(writer);

            writer.on("finish", () => {
                api.sendMessage({ body: cap, attachment: b.createReadStream(file) }, event.threadID, () => b.unlinkSync(file), event.messageID);
            });
        } catch {
            return api.sendMessage("[⚜️]➜ Failed to download video.", event.threadID, event.messageID);
        }
    }
};

module.exports.config = {
	name: "groupemoji",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "SAGOR",
	description: "THIS BOT WAS MADE BY SAGOR",
	commandCategory: "CHANGE GROUP EMOJI", 
	usages: "PREFIX", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var emoji = args.join(" ")
	if (!emoji) api.sendMessage("Boss, please add an emoji to set 😐✌️", event.threadID, event.messageID)
	else api.changeThreadEmoji(emoji, event.threadID, () => api.sendMessage(`Boss, I have changed the group emoji 👉 ${emoji}\n━━━━━━━━━━━━━━━━━━━━━━━\nOWNER  𒁍 SAGOR 🌺`, event.threadID, event.messageID));
}
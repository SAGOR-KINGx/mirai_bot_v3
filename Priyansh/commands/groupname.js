module.exports.config = {
	name: "gcname",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "SAGOR",
	description: "THIS BOT WAS MADE BY SAGOR",
	commandCategory: "CHANGE GROUP NAME", 
	usages: "PREFIX", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var name = args.join(" ")
	if (!name) api.sendMessage("Boss, please write the group name you want to set 😐✌️", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`Now this group name is 👉 ${name}\n━━━━━━━━━━━━━━━━━━━━━━━\nOWNER  𒁍 
SAGOR 🌺`, event.threadID, event.messageID));
}
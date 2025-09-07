module.exports.config = {
	name: "kick",
	version: "1.0.1", 
	hasPermssion: 1,
	credits: "SAGOR",
	description: "THIS BOT WAS MADE BY SAGOR",
	commandCategory: "KICK A MEMBER", 
	usages: "PREFIX", 
	cooldowns: 0,
};

module.exports.languages = {
	"en": {
		"error": "Sorry Boss, something went wrong 🤔",
		"needPermssion": "Sorry Boss, I am not an admin in this group. Without being admin, I cannot remove anyone 😐✌️",
		"missingTag": "Boss, mention the person you want to remove from the group 😐✌️"
	}
}

module.exports.run = async function({ api, event, getText, Threads }) {
	var mention = Object.keys(event.mentions);
	try {
		let dataThread = (await Threads.getData(event.threadID)).threadInfo;

		if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID()))
			return api.sendMessage(getText("needPermssion"), event.threadID, event.messageID);

		if(!mention[0]) 
			return api.sendMessage(getText("missingTag"), event.threadID);

		if (dataThread.adminIDs.some(item => item.id == event.senderID)) {
			for (const o in mention) {
				setTimeout(() => {
					api.removeUserFromGroup(mention[o], event.threadID); 
				}, 3000);
			}
		}
	} catch {
		return api.sendMessage(getText("error"), event.threadID);
	}
}
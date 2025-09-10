const axios = require("axios");
const fs = require('fs');
const path = require('path');

const Miraistor = "https://goatstore.vercel.app";

module.exports.config = {
  name: "miraistor",
  aliases: ["ms", "market"],
  version: "0.0.1",
  hasPermssion: 2,
  credits: "ArYAN",
  description: "📌 Browse, search, upload, and manage your commands in the Miraistor marketplace.",
  commandCategory: "market",
  usages: "[show <ID>] | [page <number>] | [search <query>] | [trending] | [stats] | [like <ID>] | [upload <name>]",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  const sendBeautifulMessage = (content) => {
    const header = "╭──『 𝐌𝐢𝐫𝐚𝐢𝐒𝐭𝐨𝐫 』──╮\n";
    const footer = "\n╰─────────────╯";
    return api.sendMessage(header + content + footer, event.threadID, event.messageID);
  };

  try {
    if (!args[0]) {
      return sendBeautifulMessage(
        "\n" +
        `╭─❯ 𝐦𝐬 𝐬𝐡𝐨𝐰 <𝐈𝐃>\n├ 📦 𝐆𝐞𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐜𝐨𝐝𝐞\n╰ 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: 𝐬𝐡𝐨𝐰 1\n\n` +
        `╭─❯ 𝐦𝐬 𝐩𝐚𝐠𝐞 <𝐧𝐮𝐦𝐛𝐞𝐫>\n├ 📄 𝐁𝐫𝐨𝐰𝐬𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬\n╰ 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: 𝐩𝐚𝐠𝐞 1\n\n` +
        `╭─❯ 𝐦𝐬 𝐬𝐞𝐚𝐫𝐜𝐡 <𝐪𝐮𝐞𝐫𝐲>\n├ 🔍 𝐒𝐞𝐚𝐫𝐜𝐡 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬\n╰ 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: 𝐬𝐞𝐚𝐫𝐜𝐡 𝐦𝐮𝐬𝐢𝐜\n\n` +
        `╭─❯ 𝐦𝐬 𝐭𝐫𝐞𝐧𝐝𝐢𝐧𝐠\n├ 🔥 𝐕𝐢𝐞𝐰 𝐭𝐫𝐞𝐧𝐝𝐢𝐧𝐠\n╰ 𝐌𝐨𝐬𝐭 𝐩𝐨𝐩𝐮𝐥𝐚𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬\n\n` +
        `╭─❯ 𝐦𝐬 𝐬𝐭𝐚𝐭𝐬\n├ 📊 𝐕𝐢𝐞𝐰 𝐬𝐭𝐚𝐭𝐢𝐬𝐭𝐢𝐜𝐬\n╰ 𝐌𝐚𝐫𝐤𝐞𝐭𝐩𝐥𝐚𝐜𝐞 𝐢𝐧𝐬𝐢𝐠𝐡𝐭𝐬\n\n` +
        `╭─❯ 𝐦𝐬 𝐥𝐢𝐤𝐞 <𝐈𝐃>\n├ 💝 𝐋𝐢𝐤𝐞 𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝\n╰ 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: 𝐥𝐢𝐤𝐞 1\n\n` +
        `╭─❯ 𝐦𝐬 𝐮𝐩𝐥𝐨𝐚𝐝 <𝐧𝐚𝐦𝐞>\n├ ⬆️ 𝐔𝐩𝐥𝐨𝐚𝐝 𝐜𝐨𝐦𝐦𝐚𝐧𝐝\n╰ 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: 𝐮𝐩𝐥𝐨𝐚𝐝 𝐦𝐢𝐫𝐚𝐢𝐬𝐭𝐨𝐫\n\n` +
        "💫 𝐓𝐢𝐩: 𝐔𝐬𝐞 '𝐡𝐞𝐥𝐩 𝐦𝐢𝐫𝐚𝐢𝐬𝐭𝐨𝐫' 𝐟𝐨𝐫 𝐝𝐞𝐭𝐚𝐢𝐥𝐬"
      );
    }

    const command = args[0].toLowerCase();

    switch (command) {
      case "show": {
        const itemID = parseInt(args[1]);
        if (isNaN(itemID)) return sendBeautifulMessage("\n⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐢𝐭𝐞𝐦 𝐈𝐃.");

        const { data: item } = await axios.get(`${Miraistor}/api/item/${itemID}`);
        if (!item) return sendBeautifulMessage("\n❌ Item not found.");

        const bdTime = new Date(item.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

        return sendBeautifulMessage(
          `\n╭─❯ 👑 𝐍𝐚𝐦𝐞\n╰ ${item.itemName}\n\n` +
          `╭─❯ 🆔 𝐈𝐃\n╰ ${item.itemID}\n\n` +
          `╭─❯ ⚙️ 𝐓𝐲𝐩𝐞\n╰ ${item.type || 'Unknown'}\n\n` +
          `╭─❯ 👨‍💻 𝐂𝐫𝐞𝐝𝐢𝐭𝐬\n╰ ${item.authorName || item.creditsName}\n\n` +
          `╭─❯ 🔗 𝐂𝐨𝐝𝐞\n╰ ${Miraistor}/raw/${item.rawID}\n\n` +
          `╭─❯ 📅 𝐀𝐝𝐝𝐞𝐝\n╰ ${bdTime}\n\n` +
          `╭─❯ 👀 𝐕𝐢𝐞𝐰𝐬\n╰ ${item.views}\n\n` +
          `╭─❯ 💝 𝐋𝐢𝐤𝐞𝐬\n╰ ${item.likes}`
        );
      }

      case "page": {
        const page = parseInt(args[1]) || 1;
        const { data } = await axios.get(`${Miraistor}/api/items?page=${page}&limit=5`);

        if (!data.items || !data.items.length) return sendBeautifulMessage("\n❌ Invalid page or no items found.");

        const totalPages = Math.ceil(data.total / 5);
        const itemsList = data.items.map((item, i) =>
          `╭─❯ ${i + 1}. 📦 ${item.itemName}\n` +
          `├ 🆔 𝐈𝐃: ${item.itemID}\n` +
          `├ ⚙️ 𝐓𝐲𝐩𝐞: ${item.type}\n` +
          `╰ 👨‍💻 𝐂𝐫𝐞𝐝𝐢𝐭𝐬: ${item.authorName || item.creditsName}`
        ).join("\n");

        return sendBeautifulMessage(`\n📄 Page ${page}/${totalPages}\n\n${itemsList}`);
      }

      case "search": {
        const query = args.slice(1).join(" ");
        if (!query) return sendBeautifulMessage("\n⚠️ Please provide a search query.");

        const { data } = await axios.get(`${Miraistor}/api/items?search=${encodeURIComponent(query)}`);
        if (!data.items.length) return sendBeautifulMessage("\n❌ No matching commands found.");

        const searchList = data.items.slice(0, 5).map((item, i) =>
          `╭─❯ ${i + 1}. 📦 ${item.itemName}\n` +
          `├ 🆔 𝐈𝐃: ${item.itemID}\n` +
          `├ ⚙️ 𝐓𝐲𝐩𝐞: ${item.type}\n` +
          `╰ 👨‍💻 𝐂𝐫𝐞𝐝𝐢𝐭𝐬: ${item.authorName || item.creditsName}`
        ).join("\n");

        return sendBeautifulMessage(`\n🔍 Query: "${query}"\n\n${searchList}`);
      }

      case "trending": {
        const { data } = await axios.get(`${Miraistor}/api/trending`);
        if (!data.length) return sendBeautifulMessage("\n❌ 𝐍𝐨 𝐭𝐫𝐞𝐧𝐝𝐢𝐧𝐠 𝐢𝐭𝐞𝐦𝐬 𝐟𝐨𝐮𝐧𝐝.");

        const trendingList = data.slice(0, 5).map((item, i) =>
          `╭─❯ ${i + 1}. 🔥 ${item.itemName}\n` +
          `├ 💝 𝐋𝐢𝐤𝐞𝐬: ${item.likes}\n` +
          `╰ 👀 𝐕𝐢𝐞𝐰𝐬: ${item.views}`
        ).join("\n");

        return sendBeautifulMessage(`\n${trendingList}`);
      }

      case "stats": {
        const { data: stats } = await axios.get(`${Miraistor}/api/stats`);
        if (!stats) return sendBeautifulMessage("\n❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐟𝐞𝐭𝐜𝐡 𝐬𝐭𝐚𝐭𝐬.");

        const uptimeStr = `${stats.hosting?.uptime?.years}y ${stats.hosting?.uptime?.months}m ${stats.hosting?.uptime?.days}d ${stats.hosting?.uptime?.hours}h ${stats.hosting?.uptime?.minutes}m ${stats.hosting?.uptime?.seconds}s`;

        const tags = stats.popularTags.map((tag, i) => `${i + 1}. ${tag._id || 'Unknown'} (${tag.count})`).join('\n');
        const authors = stats.topAuthors.map((a, i) => `${i + 1}. ${a._id || 'Unknown'} (${a.count})`).join('\n');
        const viewed = stats.topViewed.map((v, i) => `${i + 1}. ${v.itemName} (ID: ${v.itemID})\nViews: ${v.views}`).join('\n\n');

        return sendBeautifulMessage(
          `\n╭─❯ 📦 𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬\n╰ ${stats.totalCommands}\n\n` +
          `╭─❯ 💝 𝐓𝐨𝐭𝐚𝐥 𝐋𝐢𝐤𝐞𝐬\n╰ ${stats.totalLikes}\n\n` +
          `╭─❯ 👥 𝐃𝐚𝐢𝐥𝐲 𝐔𝐬𝐞𝐫𝐬\n╰ ${stats.dailyActiveUsers}\n\n` +
          `╭─❯ 👑 𝐓𝐨𝐩 𝐀𝐮𝐭𝐡𝐨𝐫𝐬\n╰ ${authors}\n\n` +
          `╭─❯ 🔥 𝐓𝐨𝐩 𝐕𝐢𝐞𝐰𝐞𝐝\n╰ ${viewed}\n\n` +
          `╭─❯ 🏷️ 𝐏𝐨𝐩𝐮𝐥𝐚𝐫 𝐓𝐚𝐠𝐬\n╰ ${tags}\n\n` +
          `🌐 𝐇𝐨𝐬𝐭𝐢𝐧𝐠 𝐈𝐧𝐟𝐨\n\n` +
          `╭─❯ ⏰ 𝐔𝐩𝐭𝐢𝐦𝐞\n╰ ${uptimeStr}\n\n` +
          `╭─❯ 💻 𝐒𝐲𝐬𝐭𝐞𝐦\n` +
          `├ 🔧 ${stats.hosting.system.platform} (${stats.hosting.system.arch})\n` +
          `├ 📌 𝐍𝐨𝐝𝐞 ${stats.hosting.system.nodeVersion}\n` +
          `╰ 🖥️ 𝐂𝐏𝐔 𝐂𝐨𝐫𝐞𝐬: ${stats.hosting.system.cpuCores}`
        );
      }

      case "like": {
        const likeId = parseInt(args[1]);
        if (isNaN(likeId)) return sendBeautifulMessage("\n⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐢𝐭𝐞𝐦 𝐈𝐃.");

        const { data } = await axios.post(`${Miraistor}/api/items/${likeId}/like`);
        if (!data.success) return sendBeautifulMessage("\n❌ Failed to like command.");

        return sendBeautifulMessage(
          `\n╭─❯ ✅ 𝐒𝐭𝐚𝐭𝐮𝐬\n╰ 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐥𝐢𝐤𝐞𝐝!\n\n` +
          `╭─❯ 💝 𝐓𝐨𝐭𝐚𝐥 𝐋𝐢𝐤𝐞𝐬\n╰ ${data.likes}`
        );
      }

      case "upload": {
        const cmdName = args[1];
        if (!cmdName) return sendBeautifulMessage("\n⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐧𝐚𝐦𝐞.");

        const cmdPath = path.join(process.cwd(), 'modules', 'commands', `${cmdName}.js`);
        if (!fs.existsSync(cmdPath)) return sendBeautifulMessage(`\n❌ File '${cmdName}.js' not found.`);

        try {
          const code = fs.readFileSync(cmdPath, 'utf8');
          let cmdFile;
          try {
            cmdFile = require(cmdPath);
          } catch {
            return sendBeautifulMessage("\n❌ Invalid command file format.");
          }

          const uploadData = {
            itemName: cmdFile.config?.name || cmdName,
            description: cmdFile.config?.description || "No description",
            type: "MiraiBot",
            code,
            creditsName: cmdFile.config?.credits || cmdFile.config?.author || event.senderID || "Unknown",
            authorName: cmdFile.config?.author || cmdFile.config?.credits || event.senderID || "Unknown"
          };

          const { data } = await axios.post(`${Miraistor}/v1/paste`, uploadData);
          if (!data.success) return sendBeautifulMessage("\n❌ Failed to upload command.");

          return sendBeautifulMessage(
            `\n╭─❯ ✅ 𝐒𝐭𝐚𝐭𝐮𝐬\n╰ Command uploaded successfully!\n\n` +
            `╭─❯ 👑 𝐍𝐚𝐦𝐞\n╰ ${uploadData.itemName}\n\n` +
            `╭─❯ 🆔 𝐈𝐃\n╰ ${data.itemID}\n\n` +
            `╭─❯ 👨‍💻 𝐂𝐫𝐞𝐝𝐢𝐭𝐬\n╰ ${uploadData.creditsName}\n\n` +
            `╭─❯ 🔗 𝐂𝐨𝐝𝐞\n╰ ${data.link}`
          );
        } catch (err) {
          console.error("Upload error:", err.message);
          return sendBeautifulMessage("\n❌ An unexpected error occurred during upload.");
        }
      }

      default:
        return sendBeautifulMessage("\n⚠️ Invalid subcommand. Use `help miraistor` for details.");
    }

  } catch (err) {
    console.error("Miraistor Error:", err.message);
    return api.sendMessage("⚠️ An unexpected error occurred.", event.threadID, event.messageID);
  }
};

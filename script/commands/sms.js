const axios = require("axios");

module.exports.config = {
  name: "sms",
  version: "1.0.9",
  hasPermssion: 2,
  credits: "Joy Ahmed",
  description: "Send SMS using external API with number and amount",
  commandCategory: "no prefix",
  usages: "sms [number] [amount]",
  cooldowns: 5,
};

// No-prefix handler
module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const triggers = ["sms"];
  if (!triggers.some(word => body.toLowerCase().startsWith(word))) return;

  const args = body.split(" ").slice(1);
  const number = args[0]?.trim();
  const amount = args[1]?.trim();

  if (!number || !amount) {
    return api.sendMessage(
      "╭╼|━━━━━━━━━━━━━━|╾╮\n" +
        "   ⚠️ Usage: sms <number> <amount>\n" +
        "   📌 Example: sms 018XXXXXXXX 100\n" +
        "╰╼|━━━━━━━━━━━━━━|╾╯",
      threadID,
      messageID
    );
  }

  try {
    const response = await axios.get("https://joybom.onrender.com/sms", {
      params: { number, amount },
      timeout: 30000,
    });

    const data = response.data || {};
    console.log("📡 API Response:", JSON.stringify(data, null, 2));

    if (data.success === true) {
      return api.sendMessage(
        "╭╼|━━━━━━━━━━━━━━|╾╮\n" +
          "   ✅ SMS sent successfully!\n" +
          `   📞 Number: ${number}\n` +
          `   💰 Amount: ${amount}\n` +
          `   📩 Message: ${data.message || "Success"}\n` +
          "╰╼|━━━━━━━━━━━━━━|╾╯",
        threadID,
        messageID
      );
    } else {
      return api.sendMessage(
        "╭╼|━━━━━━━━━━━━━━|╾╮\n" +
          "   ❌ Failed to send SMS!\n" +
          `   ⚙️ Error: ${data.message || "API response error"}\n` +
          "╰╼|━━━━━━━━━━━━━━|╾╯",
        threadID,
        messageID
      );
    }
  } catch (err) {
    console.error("❌ API Error:", err);

    let reason =
      err.code === "ECONNABORTED"
        ? "⏳ Server is taking too long to respond (timeout). Please try again."
        : err.message || "Unknown error";

    return api.sendMessage(
      "╭╼|━━━━━━━━━━━━━━|╾╮\n" +
        "   ❌ Failed to send SMS!\n" +
        `   ⚙️ Error: ${reason}\n` +
        "   🔄 If the server is Render free hosting, slow response on first attempt is normal.\n" +
        "╰╼|━━━━━━━━━━━━━━|╾╯",
      threadID,
      messageID
    );
  }
};

// run function not needed for no-prefix
module.exports.run = async function() {};

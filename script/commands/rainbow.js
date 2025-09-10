module.exports.config = {
  name: "rainbow",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SAGOR",
  description: "Generate rainbow style text image without API",
  commandCategory: "image",
  usages: "rainbow [text]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  if (!args.join(" ")) return api.sendMessage("❌ Please provide some text!", event.threadID);
  
  const { createCanvas } = require("canvas");
  const fs = require("fs-extra");

  try {
    const text = args.join(" ");
    const width = 800;
    const height = 250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.17, "orange");
    gradient.addColorStop(0.34, "yellow");
    gradient.addColorStop(0.51, "green");
    gradient.addColorStop(0.68, "blue");
    gradient.addColorStop(0.85, "indigo");
    gradient.addColorStop(1, "violet");

    ctx.fillStyle = gradient;
    ctx.font = "bold 70px Sans";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);

    const path = __dirname + "/rainbow.png";
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path, buffer);

    api.sendMessage({ attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);

  } catch (err) {
    console.error(err);
    api.sendMessage("❌ Error generating rainbow image.", event.threadID);
  }
};

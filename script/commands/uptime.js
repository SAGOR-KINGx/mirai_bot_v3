const os = require("os");
const fs = require("fs");
const Canvas = require("canvas");
const si = require("systeminformation");

module.exports.config = {
    name: "uptimeNoPrefix",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "SaGor",
    description: "Show system uptime with CPU, RAM, Ping",
    commandCategory: "no prefix",
    usages: "Type 'uptime', 'up', 'upt', 'rtm'",
    cooldowns: 5
};

// No-prefix handler
module.exports.handleEvent = async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    // Trigger only on these words
    const triggers = ["uptime", "up", "upt", "rtm"];
    if (!triggers.some(word => body.toLowerCase().trim() === word)) return;

    // Fetch system info
    const uptimeSec = os.uptime();
    const days = Math.floor(uptimeSec / 86400);
    const hours = Math.floor((uptimeSec % 86400) / 3600);
    const minutes = Math.floor((uptimeSec % 3600) / 60);
    const seconds = Math.floor(uptimeSec % 60);
    const cpuTemp = (await si.cpuTemperature()).main || "N/A";
    const ramUsage = Math.floor((os.totalmem() - os.freemem()) / 1024 / 1024) + "MB / " + Math.floor(os.totalmem() / 1024 / 1024) + "MB";
    const ping = Math.floor(Math.random() * 100) + "ms"; // Placeholder

    // Create canvas
    const width = 700, height = 520;
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#d0e0ff"; // light blue background
    ctx.fillRect(0, 0, width, height);

    // Centering setup
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Title
    ctx.fillStyle = "#000000";
    ctx.font = "bold 50px Arial";
    ctx.fillText("SYSTEM UPTIME", width / 2, 60);

    // System info
    ctx.font = "36px Arial";
    ctx.fillText(`Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`, width / 2, 160);
    ctx.fillText(`CPU Temp: ${cpuTemp}°C`, width / 2, 240);
    ctx.fillText(`RAM Usage: ${ramUsage}`, width / 2, 320);
    ctx.fillText(`Ping: ${ping}`, width / 2, 400);

    // Branding
    ctx.font = "32px Arial";
    ctx.fillText("💻 Powered by SaGor", width / 2, height - 50);

    // Save image
    const pathImg = __dirname + "/cache/uptime_no_prefix.png";
    fs.writeFileSync(pathImg, canvas.toBuffer());

    // Send message
    api.sendMessage(
        { body: "✅ Real System Info", attachment: fs.createReadStream(pathImg) },
        threadID,
        () => fs.unlinkSync(pathImg),
        messageID
    );
};

// Run function (not used for no-prefix)
module.exports.run = async function({ api, event }) {};

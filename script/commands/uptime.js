const os = require("os");
const Canvas = require("canvas");
const fs = require("fs");
const si = require("systeminformation"); // npm install systeminformation

module.exports.config = {
    name: "sysinfo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "Show full system info",
    commandCategory: "System",
    usages: "",
    cooldowns: 5,
    aliases: ["up","upt","rtm"]
};

module.exports.run = async function({ api, event }) {
    const { threadID, messageID } = event;
    const startTime = Date.now();

    // System info
    const uptimeSec = os.uptime();
    const days = Math.floor(uptimeSec / 86400);
    const hours = Math.floor((uptimeSec % 86400)/3600);
    const minutes = Math.floor((uptimeSec % 3600)/60);
    const seconds = Math.floor(uptimeSec % 60);

    const cpu = await si.cpu();
    const mem = await si.mem();
    const disk = await si.fsSize();
    const temp = await si.cpuTemperature();
    const gpu = await si.graphics(); // GPU info

    const ping = Date.now() - startTime;

    // Canvas
    const width = 800, height = 500;
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // RGB background
    const gradient = ctx.createLinearGradient(0,0,width,height);
    gradient.addColorStop(0,"rgb(255,0,0)");
    gradient.addColorStop(0.5,"rgb(0,255,0)");
    gradient.addColorStop(1,"rgb(0,0,255)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";

    ctx.font = "bold 28px Arial";
    ctx.fillText("💻 SYSTEM STATUS", 20, 50);

    ctx.font = "20px Arial";
    ctx.fillText(`🕒 Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`, 20, 100);
    ctx.fillText(`🏓 Ping: ${ping}ms`, 20, 130);
    ctx.fillText(`🔥 CPU: ${cpu.manufacturer} ${cpu.brand} | ${cpu.speed}GHz`, 20, 160);
    ctx.fillText(`🌡️ CPU Temp: ${temp.main || "N/A"}°C`, 20, 190);
    ctx.fillText(`🖥️ GPU: ${gpu.controllers[0] ? gpu.controllers[0].model : "N/A"}`, 20, 220);
    ctx.fillText(`🧠 RAM: ${(mem.used/1024/1024/1024).toFixed(2)}GB / ${(mem.total/1024/1024/1024).toFixed(2)}GB`, 20, 250);
    ctx.fillText(`💽 Disk: ${(disk[0].used/1024/1024/1024).toFixed(2)}GB / ${(disk[0].size/1024/1024/1024).toFixed(2)}GB`, 20, 280);

    ctx.fillStyle = "#000000";
    ctx.font = "bold 22px Arial";
    ctx.fillText("Powered by SaGor", 20, height-30);

    // Save image
    const pathImg = __dirname + "/cache/sysinfo.png";
    fs.writeFileSync(pathImg, canvas.toBuffer());

    return api.sendMessage(
        { body: "✅ System Info", attachment: fs.createReadStream(pathImg) },
        threadID,
        () => fs.unlinkSync(pathImg),
        messageID
    );
};

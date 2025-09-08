const os = require("os");
const Canvas = require("canvas");
const fs = require("fs");
const si = require("systeminformation");

module.exports.config = {
    name: "sysinfo",
    version: "1.3.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "Show full system info with mountain background",
    commandCategory: "System",
    usages: "",
    cooldowns: 5,
    aliases: ["up","upt","rtm"]
};

module.exports.run = async function({ api, event }) {
    const commandName = event.body.split(" ")[0].toLowerCase();
    if (!["sysinfo","up","upt","rtm"].includes(commandName)) return;

    const { threadID, messageID } = event;
    const startTime = Date.now();

    const uptimeSec = os.uptime();
    const days = Math.floor(uptimeSec / 86400);
    const hours = Math.floor((uptimeSec % 86400)/3600);
    const minutes = Math.floor((uptimeSec % 3600)/60);
    const seconds = Math.floor(uptimeSec % 60);

    const cpu = await si.cpu();
    const mem = await si.mem();
    const disk = await si.fsSize();
    const temp = await si.cpuTemperature();
    const gpu = await si.graphics();

    const ping = Date.now() - startTime;

    const width = 900, height = 600;
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background mountain image
    const bgPath = __dirname + "/cache/mountain.jpg";
    if(fs.existsSync(bgPath)) {
        const bgImg = await Canvas.loadImage(bgPath);
        ctx.drawImage(bgImg, 0, 0, width, height);
    } else {
        // fallback background
        ctx.fillStyle = "#888888";
        ctx.fillRect(0,0,width,height);
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "#000000"; 
    ctx.strokeStyle = "#ffffff"; 
    ctx.lineWidth = 4;

    ctx.font = "bold 55px Arial";
    ctx.strokeText("💻 SYSTEM STATUS", width/2, 80);
    ctx.fillText("💻 SYSTEM STATUS", width/2, 80);

    ctx.font = "bold 42px Arial";
    const info = [
        `🕒 Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`,
        `🏓 Ping: ${ping}ms`,
        `🔥 CPU: ${cpu.manufacturer} ${cpu.brand} | ${cpu.speed}GHz`,
        `🌡️ CPU Temp: ${temp.main || "N/A"}°C`,
        `🖥️ GPU: ${gpu.controllers[0] ? gpu.controllers[0].model : "N/A"}`,
        `🧠 RAM: ${(mem.used/1024/1024/1024).toFixed(2)}GB / ${(mem.total/1024/1024/1024).toFixed(2)}GB`,
        `💽 Disk: ${(disk[0].used/1024/1024/1024).toFixed(2)}GB / ${(disk[0].size/1024/1024/1024).toFixed(2)}GB`,
        `📂 ROM: ${(disk[0].available/1024/1024/1024).toFixed(2)}GB Available`,
        `✅ Status: Online`
    ];

    let yPos = 160;
    for(const line of info){
        ctx.strokeText(line, width/2, yPos);
        ctx.fillText(line, width/2, yPos);
        yPos += 70;
    }

    ctx.font = "bold 38px Arial";
    ctx.strokeText("Powered by SaGor", width/2, height-40);
    ctx.fillText("Powered by SaGor", width/2, height-40);

    const pathImg = __dirname + "/cache/sysinfo.png";
    fs.writeFileSync(pathImg, canvas.toBuffer());

    return api.sendMessage(
        { body: "✅ System Info", attachment: fs.createReadStream(pathImg) },
        threadID,
        () => fs.unlinkSync(pathImg),
        messageID
    );
};

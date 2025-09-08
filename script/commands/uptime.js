const os = require("os");
const Canvas = require("canvas");
const fs = require("fs");

module.exports.config = {
    name: "uptime",
    version: "9.1.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "Show system uptime with animated neon needles + branding",
    commandCategory: "System",
    usages: "",
    cooldowns: 5,
    aliases: ["up","upt","rtm"]
};

module.exports.run = async function({ api, event }) {
    const { threadID, messageID } = event;

    // System uptime
    let uptime = os.uptime();
    let days = Math.floor(uptime / 86400);
    let hours = Math.floor((uptime % 86400) / 3600);
    let minutes = Math.floor((uptime % 3600) / 60);
    let seconds = Math.floor(uptime % 60);

    // Percentages for meters
    let totalSeconds = hours*3600 + minutes*60 + seconds;
    let percent24h = Math.min((totalSeconds/86400)*100,100);
    let percent7d = Math.min((uptime/(7*86400))*100,100);
    let percent30d = Math.min((uptime/(30*86400))*100,100);

    // Canvas setup
    const width = 700, height = 520;
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const centerX = width/2;
    const centerY = height/2 + 30;

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0,0,width,height);
    bgGradient.addColorStop(0,"#0f0c29");
    bgGradient.addColorStop(1,"#302b63");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0,0,width,height);

    // Title
    ctx.shadowColor = "#00fff0";
    ctx.shadowBlur = 20;
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#00ffcc";
    ctx.fillText("🕒 SYSTEM UPTIME", width/2, 60);
    ctx.shadowBlur = 0;

    // Meters
    const radii = [120, 160, 200];
    const percents = [percent24h, percent7d, percent30d];
    const colors = ["#ff00ff","#00ffff","#00ff00"];
    const labels = ["24h","7d","30d"];

    for(let i=0;i<3;i++){
        const radius = radii[i];
        const percent = percents[i];
        const color = colors[i];

        // Base arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, Math.PI*0.75, Math.PI*0.25, false);
        ctx.lineWidth = 20;
        ctx.strokeStyle = "#222244";
        ctx.stroke();

        // Neon arc
        const endAngle = Math.PI*0.75 + (1.5*Math.PI*(percent/100));
        ctx.shadowColor = color;
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, Math.PI*0.75, endAngle, false);
        const grad = ctx.createLinearGradient(centerX-radius, centerY-radius, centerX+radius, centerY+radius);
        grad.addColorStop(0,"#ff00ff");
        grad.addColorStop(0.5,"#00ffff");
        grad.addColorStop(1,"#00ff00");
        ctx.strokeStyle = grad;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Needle
        const needleAngle = Math.PI*0.75 + (1.5*Math.PI*(percent/100));
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius * Math.cos(needleAngle), centerY + radius * Math.sin(needleAngle));
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = "18px Arial";
        ctx.fillStyle = color;
        ctx.fillText(`${labels[i]}: ${percent.toFixed(1)}%`, centerX, centerY - radius - 15);
    }

    // Uptime text
    ctx.shadowColor = "#ff77ff";
    ctx.shadowBlur = 15;
    ctx.font = "24px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${days}d ${hours}h ${minutes}m ${seconds}s`, centerX, centerY + 10);
    ctx.shadowBlur = 0;

    // Branding
    ctx.shadowColor = "#ff00ff";
    ctx.shadowBlur = 15;
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#ff77ff";
    ctx.fillText("💻 Powered by SaGor", centerX, height - 30);
    ctx.shadowBlur = 0;

    // Save image
    const pathImg = __dirname + "/cache/uptime_powered.png";
    fs.writeFileSync(pathImg, canvas.toBuffer());

    // Send message
    return api.sendMessage(
        { body: "✅ Real System Uptime (Animated Neon Speedometers) \nPowered by SaGor", attachment: fs.createReadStream(pathImg) },
        threadID,
        () => fs.unlinkSync(pathImg),
        messageID
    );
};

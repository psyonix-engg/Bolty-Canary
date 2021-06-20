const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyInfo = require("../../classes/BoltyInfo");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = (client, message, args) => {

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const embed = BoltyInfo.BoltyEmbed(client)
        .setTitle("Uptime")
        .setDescription(`<@${message.author.id}>, [nyoooom!](https://www.youtube.com/watch?v=GkOdpnvGz6o&ab_channel=DanCDanC) The bot's wheels have been spinning for **${days} day(s)**, **${hours} hour(s)**, **${minutes} minute(s)** and **${seconds} second(s)**`)
        message.channel.send(embed)
}

module.exports.help = {
    name: "uptime",
    description: "Shows for how long the bot has been online!",
    aliases: ["uptime", "up-time"],
    usage: "",
    category: "Info",
};
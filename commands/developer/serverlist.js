const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyDev = require("../../classes/BoltyDev");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("855156821093646366")) return;

  setTimeout(async () => await message.delete(), 100);

  setTimeout(() => {
    BoltyDev.serverlistManager(message, client);
  }, 200);
};

module.exports.help = {
  name: "serverlist",
  description: "Serverlist[Devs]",
  aliases: ["sl"],
  usage: "",
  category: "Developer",
  cooldown: 10,
};

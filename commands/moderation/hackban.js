const { Client, Message, MessageEmbed } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return;
};

module.exports.help = {
  name: "hackban",
  description: "Force banning users.",
  aliases: ["hb", "forceban"],
  usage: "[ID]",
  category: "Moderation",
};

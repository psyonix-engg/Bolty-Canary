const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyInfo = require("../../classes/BoltyInfo");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let roles = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((r) => r)
    .join("|");

  if (roles.length > 900) roles = "Too many roles to display.";

  if (!roles) roles = `You don't have any roles in the server.`;

  message.channel.send({
    embeds: [
      BoltyInfo.BoltyInfoEmbed(client, message)
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setTitle(`Role List In ${message.guild.name}`)
        .setDescription(roles)
        .setColor("BLURPLE")
        .setThumbnail(message.guild.iconURL({ dynamic: true })),
    ],
  });
};

module.exports.help = {
  name: "rolelist",
  description: "Display all of the server roles in a list.",
  aliases: ["rl"],
  usage: "",
  category: "Info",
  cooldown: 10,
};

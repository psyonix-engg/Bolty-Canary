const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const { oneLine } = require("common-tags");
const fs = require("fs");
const BoltyUtil = require("../../classes/BoltyUtil");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const categories = fs.readdirSync("./commands/");

  categories.forEach((category) => {
    const dir = client.commands.filter(
      (c) => c.help.category.toLowerCase() === category.toLowerCase()
    );
    const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
  });

  const formatString = (str) =>
    `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};

module.exports.help = {
  name: "",
  description: "",
  aliases: [""],
  usage: "",
  category: "",
  cooldown: "",
};

const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyFun = require("../../classes/BoltyFun");
const { topics } = require("../../assets/json/topics.json");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let randomTopic = topics[Math.round(Math.random() * topics.length)];

  message.channel.send(
    BoltyFun.BoltyFunEmbed(client).setDescription(`**${randomTopic}**`)
  );
};

module.exports.help = {
  name: "topic",
  description: "Gives a starter conversation topic.",
  aliases: ["tc", "t"],
  usage: "",
  category: "Fun",
};

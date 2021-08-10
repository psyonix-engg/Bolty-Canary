const { Client, Message, MessageEmbed } = require("discord.js");
const { wyrQuestions } = require("../../assets/json/wouldyourather.json");
const BoltyFun = require("../../classes/BoltyFun");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const wyrQuestion =
    wyrQuestions[Math.round(Math.random() * wyrQuestions.length)];

  message.channel
    .send({
      embeds: [
        BoltyFun.BoltyFunEmbed(client)
          .setTitle(`**Would You Rather?**`)
          .setDescription(`**${wyrQuestion}**`),
      ],
    })
    .then((msg) => {
      msg.react("856895358897881088");
      msg.react("856125687567613973");
    });
};

module.exports.help = {
  name: "would-you-rather",
  description: "Would-You-Rather?",
  aliases: ["wouldyourather", "wyr", "wur"],
  usage: "",
  category: "Fun",
};

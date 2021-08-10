const { Client, Message, MessageEmbed } = require("discord.js");
const superagent = require("superagent");
const BoltyFun = require("../../classes/BoltyFun");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const { body } = await superagent.get("https://random.dog/woof.json");

  message.channel.send({
    embeds: [
      BoltyFun.BoltyFunEmbed(client)
        .setTitle(`A Random Dog 🐶`)

        .setImage(body.url),
    ],
  });
};

module.exports.help = {
  name: "dog",
  description: "Will send a random dog image.",
  aliases: ["dogimage"],
  usage: "",
  category: "Fun",
  cooldown: 5,
};

const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyFun = require("../../classes/BoltyFun");
const dadjokes = require("dadjokes-wrapper");
const joke = new dadjokes();

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const dadjoke = await joke.randomJoke();

  message.channel.send({
    embeds: [
      BoltyFun.BoltyFunEmbed(client)
        .setAuthor(`Random Joke!`, `${BoltyFun.BoltyUrls.laughingLink}`)
        .setDescription(dadjoke)
        .setFooter(
          `Requested by ${message.author.tag}`,
          `${message.author.displayAvatarURL({ dynamic: true })}`
        ),
    ],
  });
};

module.exports.help = {
  name: "joke",
  description: "Generates a random joke.",
  aliases: ["randomjoke", "dadjoke"],
  usage: "",
  category: "Fun",
  cooldown: 6,
};

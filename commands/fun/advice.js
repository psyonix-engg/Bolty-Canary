const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyFun = require("../../classes/BoltyFun");
const request = require("superagent");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  request.get("https://api.adviceslip.com/advice").end((err, res) => {
    if (!err && res.status === 200) {
      try {
        JSON.parse(res.text);
      } catch (e) {
        message.channel.send(
          BoltyFun.BoltyEmbed(client)
            .setAuthor(
              `${BoltyFun.BoltyEmotes.wrong_error}`,
              message.guild.iconURL({ dynamic: true })
            )
            .setDescription(
              `There was an error trying to get an advice. Please try again later.`
            )
        );
      }

      const advice = JSON.parse(res.text);

      message.channel.send(
        BoltyFun.BoltyFunEmbed(client)
          .setTitle(`A Random Advice ${BoltyFun.BoltyEmotes.fun}`)
          .setDescription(`**${advice.slip.advice}**`)
      );
    } else {
      console.error(`REST call failed: ${err}, status code: ${res.status}`);
      message.channel.send(
        BoltyFun.BoltyEmbed(client)
          .setDescription(`There was an error, please try again later.`)
          .setAuthor(
            `${BoltyFun.BoltyEmotes.wrong_error}`,
            message.guild.iconURL({ dynamic: true })
          )
      );
    }
  });
};

module.exports.help = {
  name: "advice",
  description: "Gives you a random advice.",
  aliases: ["avice"],
  usage: "",
  category: "Fun",
};

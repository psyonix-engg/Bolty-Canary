const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyFun = require("../../classes/BoltyFun");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let number = args.slice(1).join(" ");

  if (isNaN(number))
    message.channel.send({
      embeds: [
        BoltyFun.BoltyFunEmbed(client)
          .setDescription(
            `That was **not** a valid number, please provide a valid number.`
          )
          .setAuthor(
            `${BoltyFun.BoltyEmotes.wrong_error} Error`,
            message.author.displayAvatarURL({ dynamic: true })
          ),
      ],
    });

  if (!number) number = 6;

  let n = Math.floor(Math.random() * number + 1);

  message.channel.send({
    embeds: [
      BoltyFun.BoltyFunEmbed(client)
        .setDescription(`${message.author}, you rolled **${n}**!`)
        .setFooter(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        ),
    ],
  });
};

module.exports.help = {
  name: "roll",
  description:
    "Rolls a dice wit hthe specified number of sides. Will default to 6 sides if no number is given.",
  aliases: ["dice", "r"],
  usage: "[number]",
  category: "Fun",
};

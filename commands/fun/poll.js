const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyFun = require("../../classes/BoltyFun");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let channel =
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]);
  if (!channel) {
    message.channel.send({
      embeds: [
        BoltyFun.BoltyFunEmbed(client)
          .setAuthor(
            `Error`,
            `https://cdn.discordapp.com/emojis/856125687567613973.png?v=1`
          )
          .setDescription(
            `There was an error trying to run this command, Please make sure you mention a channel/gave the ID of a channel and you gave something to vote on.\nUsage: \`${client.config.prefix}vote [#Channel | ID of a channel] [Something to vote on]\``
          ),
        // .setDescription(`You did not provide a channel to post the poll in.`),
      ],
    });
  }

  try {
    let voteText = args.slice(1).join(" ");

    if (!voteText) {
      message.channel.send({
        embeds: [
          BoltyFun.BoltyFunEmbed(client)
            .setAuthor(
              `Error`,
              `https://cdn.discordapp.com/emojis/856125687567613973.png?v=1`
            )
            .setDescription(
              `There was an error trying to run this command, Please make sure you mention a channel/gave the ID of a channel and you gave something to vote on.\nUsage: \`${client.config.prefix}vote [#Channel | ID of a channel] [Something to vote on]\``
            ),
          //.setDescription(`You did not provide something to vote on.`),
        ],
      });
    }

    if (voteText) {
      message.channel
        .send({
          embeds: [
            BoltyFun.BoltyFunEmbed(client)
              .setAuthor(`Vote!`, message.guild.iconURL({ dynamic: true }))
              .setTitle(`Vote!`)
              .setDescription(
                `**A Vote has begim! Come and vote!**\n\n${voteText}`
              ),
          ],
        })
        .then((m) => {
          m.react("855888059978743819");
          m.react("🤷‍♂️");
          m.react("855399096315019294");
        });
    }
  } catch (e) {
    message.channel.send({
      embeds: [
        BoltyFun.BoltyFunEmbed(client)
          .setAuthor(
            `Error`,
            `https://cdn.discordapp.com/emojis/856125687567613973.png?v=1`
          )
          .setDescription(
            `There was an error trying to run this command, Please make sure you mention a channel/gave the ID of a channel and you gave something to vote on.\nUsage: \`${client.config.prefix}vote [#Channel | ID of a channel] [Something to vote on]\``
          ),
      ],
    });
  }
};

module.exports.help = {
  name: "vote",
  description: "Make a vote.",
  aliases: ["v"],
  usage: "[channel] [text]",
  category: "Fun",
};

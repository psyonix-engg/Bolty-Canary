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
    message.channel.send(
      BoltyFun.BoltyFunEmbed(client)
        .setAuthor(
          `Error`,
          `https://cdn.discordapp.com/emojis/856125687567613973.png?v=1`
        )
        .setDescription(`You did not provide a channel to post the poll in.`)
    );
  }

  let voteText = args.join(1);

  if (!voteText) {
    BoltyFun.BoltyFunEmbed(client)
      .setAuthor(
        `Error`,
        `https://cdn.discordapp.com/emojis/856125687567613973.png?v=1`
      )
      .setDescription(`You did not provide something to vote on.`);
  }

  let voteEmbed = BoltyFun.BoltyFunEmbed(client)
    .setFooter(
      `Poll by ${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true })
    )
    .setAuthor(`Vote!`, message.guild.iconURL({ dynamic: true }))
    .setTitle(`Vote!`)
    .setDescription(`**A vote has begun! Come and vote!**\n\n${voteText}`);

  channel.send(voteEmbed);
};

module.exports.help = {
  name: "vote",
  description: "Make a vote.",
  aliases: ["v"],
  usage: "[channel] [text]",
  category: "Fun",
};

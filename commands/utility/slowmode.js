const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMod = require("../../classes/BoltyMod");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = (client, message, args) => {
  if (
    !message.member.permissions.has("MANAGE_MESSAGES") ||
    !message.member.permissions.has("ADMINISTRATOR")
  )
    return;

  var channel =
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]);

  var seconds = args[1];

  if (!channel) {
    channel = message.channel;
    seconds = args[0];
  }

  if (!seconds) {
    message.channel.send({
      embeds: [
        BoltyMod.BoltyMuteEmbed(message).setDescription(
          `${BoltyMod.BoltyEmotes.wrong_error} You did not specify the duration in seconds!`
        ),
      ],
    });
    return;
  }

  if (isNaN(seconds)) {
    message.channel.send({
      embeds: [
        BoltyMod.BoltyMuteEmbed(message).setDescription(
          `${BoltyMod.BoltyEmotes.wrong_error} You did not specify the duration in **seconds**!`
        ),
      ],
    });
    return;
  }

  if (seconds > 3600) {
    message.channel.send({
      embeds: [
        BoltyMod.BoltyMuteEmbed(message).setDescription(
          `${BoltyMod.BoltyEmotes.wrong_error} Maximum duration is **1 hour / 3600 seconds**!`
        ),
      ],
    });
    return;
  }

  channel.setRateLimitPerUser(seconds).catch((err) => {
    message.channel.send({
      embeds: [
        BoltyMod.BoltyMuteEmbed(message).setDescription(
          `${BoltyMod.BoltyEmotes.wrong_error} This channel **doesn't** exist!`
        ),
      ],
    });
    return;
  });

  message.channel.send({
    embeds: [
      BoltyMod.BoltyMuteEmbed(message)
        .setAuthor(
          `Slowmode was set.`,
          `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
        )
        .addField(`Set By:`, `\`${message.author.tag}\``)
        .addField("Slwomode:", `\`${seconds + "s"}\``)
        .addField(`Channel:`, `\`${"#" + channel.name}\``)
        .setThumbnail(message.guild.iconURL({ dynamic: true })),
    ],
  });
};

module.exports.help = {
  name: "slowmode",
  description: "Sets slowmode",
  aliases: ["sm", "slow-mode"],
  usage: "<duration>",
  category: "Utility",
};

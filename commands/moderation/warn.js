const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMod = require("../../classes/BoltyMod");
const fs = require("fs");
var warnDATA = JSON.parse(fs.readFileSync("databases/warns.json", "utf-8"));
const path = "databases/warns.json";

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (
    !message.member.permissions.has("MANAGE_MESSAGES") ||
    !message.member.permissions.has("ADMINISTRATOR")
  )
    return;

  const target =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  var reason = args.slice(1).join(" ");

  if (reason === undefined || !reason) reason = "No reason was provided.";

  if (target.manageable) {
    if (message.guild.id in warnDATA === false) {
      warnDATA[message.guild.id] = {};
      fs.writeFile(path, JSON.stringify(warnDATA, null, 4), (err) => {
        if (err) console.log(err);
      });
    }

    if (target.id in warnDATA[message.guild.id] === false) {
      warnDATA[message.guild.id][target.id] = {
        warnings: 0,
      };
      fs.writeFile(path, JSON.stringify(warnDATA, null, 4), (err) => {
        if (err) console.log(err);
      });
    }

    warnDATA[message.guild.id][target.id].warnings++;
    fs.writeFile(path, JSON.stringify(warnDATA, null, 4), (err) => {
      if (err) console.log(err);
    });

    message.channel.send(
      BoltyMod.BoltyMuteEmbed(message)
        .setAuthor(
          `${target.user.tag} was warned`,
          `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
        )
        .addField(`Warned By:`, `\`${message.author.tag}\``)
        .addField(
          "Total Warns:",
          `\`${warnDATA[message.guild.id][target.id].warnings}\``
        )
        .addField(`Reason:`, `\`${reason}\``)
        .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
    );
  } else {
    message.channel.send(
      BoltyMod.BoltyKickEmbed(message).setDescription(
        `${BoltyMod.BoltyEmotes.wrong_error} I cannot warn that user.`
      )
    );
  }
};

module.exports.help = {
  name: "warn",
  description: "Warn someone in the server.",
  aliases: ["w"],
  usage: "[user]",
  category: "Moderation",
};

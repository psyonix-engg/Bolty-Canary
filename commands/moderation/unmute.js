const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMod = require("../../classes/BoltyMod");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (
    !message.member.permissions.has("MUTE_MEMBERS") ||
    !message.member.permissions.has("MANAGE_MESSAGES") ||
    !message.member.permissions.has("ADMINISTRATOR")
  )
    return;

  let target =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  var reason = args.slice(1).join(" ");

  if (reason === undefined || !reason) reason = "No reason was provided.";

  if (target) {
    let memberTarget = message.guild.members.cache.get(target.id);

    let muteRole = message.guild.roles.cache.find(
      (r) => r.name === "Muted (Bolty)"
    );

    if (!message.guild.member(memberTarget).roles.cache.has(muteRole.id))
      message.channel.send({
        embeds: [
          BoltyMod.BoltyEmbed(client)
            .setAuthor(`Error`, `https://emoji.discord.st/emojis/Error.png`)
            .setDescription(`${memberTarget.user.tag} is not muted.`),
        ],
      });

    message.guild.member(memberTarget).roles.remove(muteRole.id);

    message.channel.send(
      BoltyMod.BoltyEmbed(client)
        .setAuthor(
          `${memberTarget.user.tag} was banned`,
          `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
        )
        .addField(`Unmuted By:`, `\`${message.author.tag}\``)
        .addField(`Reason:`, `\`${reason}\``)
    );
  }
};

module.exports.help = {
  name: "unmute",
  description: "Unmute a user in the server.",
  aliases: ["um"],
  usage: "[user]",
  category: "Moderation",
};

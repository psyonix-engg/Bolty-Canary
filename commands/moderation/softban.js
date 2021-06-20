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
    !message.member.permissions.has("BAN_MEMBERS") ||
    !message.member.permissions.has("ADMINISTRATOR")
  )
    return;

  const target =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  const { guild } = message;

  if (!target) {
    BoltyMod.BoltyEmbed(client).setDescription(
      `${BoltyMod.BoltyEmotes.wrong_error} you did not provide any member to softban, please mention the user or provide their ID.`
    );
  }

  if (target) {
    const member = guild.members.cache.get(target.id);

    var reason = args[1];

    if (reason === undefined) reason = "No reason was provided.";

    if (member.bannable) {
      member
        .ban({ reason: reason, days: 0 })
        .then(() => message.guild.members.unban(member));
      message.channel.send(
        BoltyMod.BoltyKickEmbed(message)
          .setAuthor(
            `${member.user.tag} was softbanned`,
            `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
          )
          .addField(`Softbanned By:`, `\`${message.author.tag}\``)
          .addField(`Reason:`, `\`${reason}\``)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      );
    } else {
      message.channel.send(
        BoltyMod.BoltyEmbed(client).setDescription(
          `${BoltyMod.BoltyEmotes.wrong_error} I cannot softban that user.`
        )
      );
    }
  }
};

module.exports.help = {
  name: "softban",
  description: "Softban someone from the server.\n(Softban = ban then unban)",
  aliases: ["sb"],
  usage: "[user]",
  category: "Moderation",
};

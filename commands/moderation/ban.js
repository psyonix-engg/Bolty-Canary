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
      `${BoltyMod.BoltyEmotes.wrong_error} you did not provide any member to ban, please mention the user or provide their ID.`
    );
  }

  if (target) {
    const member = guild.members.cache.get(target.id);

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "No reason was provided.";

    if (member.bannable) {
      member.send({
        embeds: [
          BoltyMod.BoltyKickEmbed(message)
            .setAuthor(`${member.user.tag} you were banned from ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addField(`Banned By`, `\`${message.author.tag}\``)
            .addField(`Reason`, `\`${reason}\``),
        ],
      });
      member.ban({ reason: reason, days: 0 });
      message.channel.send({
        embeds: [
          BoltyMod.BoltyKickEmbed(message)
            .setAuthor(
              `${member.user.tag} was banned`,
              `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
            )
            .addField(`Banned By:`, `\`${message.author.tag}\``)
            .addField(`Reason:`, `\`${reason}\``)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true })),
        ],
      });
      /*
      message.channel.send({
        embeds: [
      
        BoltyMod.BoltyKickEmbed(message)
          .setAuthor(
            `${member.user.tag} was banned`,
            `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
          )
          .addField(`Kicked By:`, `\`${message.author.tag}\``)
          .addField(`Reason:`, `\`${reason}\``)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      )
        ]})
        */
    } else {
      message.channel.send(
        BoltyMod.BoltyEmbed(client).setDescription(
          `${BoltyMod.BoltyEmotes.wrong_error} I cannot ban that user.`
        )
      );
    }
  }
};

module.exports.help = {
  name: "ban",
  description: "Ban someone from the server.",
  aliases: ["b"],
  usage: "[user]",
  category: "Moderation",
};

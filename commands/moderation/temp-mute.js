const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
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

  const target = message.mentions.members.first();
  var reason = args.slice(2).join(" ");

  if (target) {
    let muteRole = message.guild.roles.cache.find(
      (r) => r.name === "Muted (Bolty)"
    );

    if (!muteRole) {
      BoltyMod.BoltyEmbed(client).setDescription(
        `${BoltyMod.BoltyEmotes.wrong_error} No muted role was found.\nRun the setup command using \`${client.config.prefix}setup\` to set up Bolty correctly.`
      )
      return
    }

    let memberTarget = message.guild.members.cache.get(target.id);

    if(!target) {
      message.reply(
        BoltyMod.BoltyMuteEmbed(message).setDescription(
          `${BoltyMod.BoltyEmotes.wrong_error} Please specify a user to mute.`
        )
      )
      return
    }

    if (!args[1]) {
      BoltyMod.BoltyEmbed(client).setDescription(
        `${BoltyMod.BoltyEmotes.wrong_error} Please specify a duration (1s, 1m, 1h, 1d...)`
      )
      return
    }

    if (!reason) reason = "No reason was provided."

    memberTarget.roles.add(muteRole.id);
    message.channel.send(
      BoltyMod.BoltyMuteEmbed(message)
      .setAuthor(
        `${memberTarget.user.tag} was muted`,
        `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
      )
      .addField(`Muted By:`, `\`${message.author.tag}\``)
      .addField("Duration:", `\`${args[1]}\``)
      .addField(`Reason:`, `\`${reason}\``)
      .setThumbnail(memberTarget.user.displayAvatarURL({ dynamic: true }))
    );

    setTimeout(function () {
      memberTarget.roles.remove(muteRole.id);
      message.channel.send(
        BoltyMod.BoltyMuteEmbed(message).setDescription(
          `${BoltyMod.BoltyEmotes.success} **${memberTarget.user.tag}** has been unmuted.`
        )
      );
    }, ms(args[1]));
  }
};

module.exports.help = {
  name: "temp-mute",
  description: "Mute someone temporary.",
  aliases: ["tempmute", "tempm", "tm"],
  usage: "[user]",
  category: "Moderation",
};

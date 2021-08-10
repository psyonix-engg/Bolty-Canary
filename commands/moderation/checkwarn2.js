const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMod = require("../../classes/BoltyMod");
const warnSchema = require("../../database/schemas/warnSchema");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (
    !message.member.permissions.has(
      "MANAGE_MESSAGES" || !message.member.permissions.has("ADMINISTRATOR")
    )
  )
    return;

  let user =
    message.mentions.members.last() || message.guild.members.cache.get(args[0]);

  if (!user)
    return message.channel.send(
      BoltyMod.BoltyEmbed(client).setDescription(
        `You did not provide any user. Ping the user or provide an ID of a **valid** user.`
      )
    );

  warnSchema.findOne(
    { GuildID: message.guild.id, User: user.user.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {
        message.channel.send(
          BoltyMod.BoltyMuteEmbed(message)
            .setAuthor(`${user.user.tag}'s Warns`)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .setDescription(
              data.Content.map(
                (w, i) =>
                  `\`${i + 1}\` | Moderator : \`${
                    message.guild.members.cache.get(w.Moderator).user.tag
                  }\`\nReason : \`${w.Reason}\``
              )
            )
        );
      }
    }
  );
};

module.exports.help = {
  name: "cw2",
  description: "Checkwarntest",
  aliases: ["c2"],
  usage: "[user | id]",
  category: "Moderation",
  cooldown: 6,
};

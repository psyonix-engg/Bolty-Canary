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

  let reason = args.slice(1).join(" ");

  if (reason === undefined || !reason) reason = "No reason provided.";

  warnSchema.findOne(
    { GuildID: message.guild.id, User: user.user.id },
    async (err, data) => {
      if (err) throw err;
      if (!data) {
        data = new warnSchema({
          GuildID: message.guild.id,
          User: user.user.id,
          Content: [
            {
              Moderator: message.author.id,
              Reason: reason,
            },
          ],
        });
      } else {
        const object = {
          Moderator: message.author.id,
          Reason: reason,
        };
        data.Content.push(object);
      }
      data.save();
    }
  );

  warnSchema.findOne(
    { GuildID: message.guild.id, User: user.user.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {
        const totalwarns = data.Content.map((w, i, r) => `\`${r}\``);
        message.channel.send(
          BoltyMod.BoltyMuteEmbed(message)
            .setAuthor(
              `${user.user.tag} was warned`,
              `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
            )
            .addField(`Warned By:`, `\`${message.author.tag}\``)
            .addField(`Total Warns`, `${totalwarns}`)
            .addField(`Reason:`, `\`${reason}\``)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        );
      }
    }
  );
};

module.exports.help = {
  name: "warn2",
  description: "Warntest",
  aliases: ["w2"],
  usage: "[user | id]",
  category: "Moderation",
  cooldown: "6s",
};

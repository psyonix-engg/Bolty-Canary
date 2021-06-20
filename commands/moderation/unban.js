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

  let userToUnban = args[0];

  let reason = args.slice(1).join(" ");

  if (reason === undefined) reason = "No reason was provided.";

  if (isNaN(userToUnban))
    message.channel.send(
      BoltyMod.BoltyEmbed(client)
        .setAuthor(`Error`, `https://emoji.discord.st/emojis/Error.png`)
        .setDescription(
          `The ID that was provided wasn't with numbers, the ID **must** be numbers.`
        )
    );

  /* if (userToUnban < 18) {
    message.channel.send(
      BoltyMod.BoltyEmbed(client).addField(
        `${BoltyMod.BoltyEmotes.wrong_error} Error\n`,
        `The provided ID was with less than **18** characters, the ID of a user is 18 characters.`
      )
    );
  }

  if (userToUnban > 18) {
    message.channel.send(
      BoltyMod.BoltyEmbed(client).addField(
        `${BoltyMod.BoltyEmotes.wrong_error} Error\n`,
        `The provided ID was with over than **18** members, the ID of a user is 18 characters.`
      )
    );
  }
  */

  message.guild.fetchBans().then((bans) => {
    if (bans.size == 0)
      message.channel.send(
        BoltyMod.BoltyBanEmbed(message)
          .setAuthor(`Error`, `https://emoji.discord.st/emojis/Error.png`)
          .setDescription(`**Member was not banned**.`)
      );

    let usertoUnban = bans.find((usr) => usr.user.id == userToUnban);
    if (!usertoUnban) return;
    message.guild.members.unban(usertoUnban.user.id);

    message.channel.send(
      BoltyMod.BoltyBannedEmbed(message)
        .setAuthor(
          `${usertoUnban.user.tag} was unbanned`,
          `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
        )
        .addField(`Unbanned By:`, `\`${message.author.tag}\``)
        .addField(`Reason:`, `\`${reason}\``)
        .setThumbnail(usertoUnban.user.displayAvatarURL({ dynamic: true }))
    );
  });
};

module.exports.help = {
  name: "unban",
  description: "Unban someone from the server.",
  aliases: ["ub"],
  usage: "[ID]",
  category: "Moderation",
};

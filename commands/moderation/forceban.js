const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMod = require("../../classes/BoltyMod");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return;

  let userToUnban = args[0];

  var reason = args[1];

  if (reason === undefined) reason = "No reason was provided.";

  const { guild } = message;

  if (isNaN(userToUnban))
    message.channel.send(
      BoltyMod.BoltyEmbed(client)
        .setAuthor(`Error`, `https://emoji.discord.st/emojis/Error.png`)
        .setDescription(
          `The ID that was provided wasn't with numbers, the ID **must** be numbers.`
        )
    );

  //mssage.guild.members.ban(userToUnban, { reason: reason });
  client.users.fetch(userToUnban).then(async (user) => {
    await message.guild.members.ban(user.id, { reason: reason });

    message.channel.send(
      BoltyMod.BoltyKickEmbed(message)
        .setAuthor(
          `${user.tag} was forcebanned`,
          `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
        )
        .addField(`Forcebanned By:`, `\`${message.author.tag}\``)
        .addField(`Reason:`, `\`${reason}\``)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    );
  });
};

module.exports.help = {
  name: "forceban",
  description: "Force banning users.",
  aliases: ["fb"],
  usage: "[ID]",
  category: "Moderation",
};

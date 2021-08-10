const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyAdmin = require("../../classes/BoltyAdmin");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return;

  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (!member) {
    message.channel.send({
      content: BoltyAdmin.BoltyAdminErrEmbed().setDescription(
        `I could not find that user.`
      ),
    });
  }

  const nick = args.length > 1 ? args.slice(1).join(" ") : null;

  try {
    await member.setNickname(nick, `By ${message.author.tag}`);
  } catch (e) {
    message.channel.send({
      content: BoltyAdmin.BoltyAdminErrEmbed().setDescription(
        `Unable to change nickname for ${member.user.tag}.\n\`${e}\``
      ),
    });
  }

  message.channel.send({
    content: BoltyAdmin.BoltyAdminSuccessEmbed().setDescription(
      `Nickname for ${member.user.tag} was changed to \`${nick}\``
    ),
  });
};

module.exports.help = {
  name: "setnick",
  description: "Change the nickname of a user.",
  aliases: ["setnickname"],
  usage: "setnick [user] [new nickname]",
  category: "Administrator",
  cooldown: 10,
};

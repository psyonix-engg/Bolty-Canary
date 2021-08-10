const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const BoltyInfo = require("../../classes/BoltyInfo");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  message.channel.send({
    embeds: [
      BoltyInfo.BoltyInfoEmbed(client, message)
        .setTitle(`Invite me to your server!`)
        .setDescription(
          `Thank you for being interested in inviting me to your server! To do so, please\n[click here](https://discord.com/api/oauth2/authorize?client_id=856104744396259378&permissions=8&scope=bot%20applications.commands).\nThank you!`
        )
        .setColor(config.colors.boltyEmbedColor)
        .setThumbnail(client.user.displayAvatarURL()),
    ],
  });
};

module.exports.help = {
  name: "invite",
  description: "Invite me to your server.",
  aliases: ["inv"],
  usage: "",
  category: "Info",
  cooldown: 7,
};

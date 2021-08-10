const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyInfo = require("../../classes/BoltyInfo");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let Emojis = "";
  let EmojisAnimated = "";
  let EmojiCount = 0;
  let Animated = 0;
  let OverallEmojis = 0;

  function Emoji(id) {
    return client.emojis.cache.get(id).toString();
  }
  message.guild.emojis.cache.forEach((emoji) => {
    OverallEmojis++;

    if (emoji.animated) {
      Animated++;
      EmojisAnimated += Emoji(emoji.id);
    } else {
      EmojiCount++;
      Emojis += Emoji(emoji.id);
    }
  });

  let embed = BoltyInfo.BoltyEmbed(client)
    .setTitle(`Emojis in **${message.guild.name}**`)
    .setDescription(
      `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
    );
  message.channel.send({ embeds: [embed] });
};

module.exports.help = {
  name: "serveremojis",
  description: "Check your server emojis.",
  aliases: ["emoji", "server-emojis", "emojis", "emotes"],
  usage: "",
  category: "Info",
};

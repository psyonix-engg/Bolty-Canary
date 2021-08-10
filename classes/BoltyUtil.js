const { MessageEmbed, Message, Client } = require("discord.js");
const config = require("../config.json");

class BoltyUtil {
  /**
   * @param {Client} client
   */
  static BoltyEmbed(client) {
    return new MessageEmbed()
      .setFooter(
        `${client.user.username}`,
        "https://cdn.discordapp.com/attachments/855375756393054210/855375824441835520/bolty.gif"
      )
      .setColor(config.colors.boltyEmbedColor)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(new Date());
  }

  /**
   * @param {Client} client
   */
  static BoltyLogEmbed(client) {
    return new MessageEmbed()
      .setFooter(
        `Bolty's Log System`,
        "https://cdn.discordapp.com/attachments/855375756393054210/855375824441835520/bolty.gif"
      )
      .setColor(config.colors.boltyEmbedColor)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(new Date());
  }

  /**
   * @param {Client} client
   * @param {Message} message
   */
  static normalBoltyEmbed(message, client) {
    return new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(
        `Requested By ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
  }

  /**
   * @param {Client} client
   */
  static BoltyEmbedHelp(client) {
    return new MessageEmbed()
      .setColor(config.colors.boltyEmbedColor)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(new Date());
  }

  static BoltyEmotes = {
    info: "<:info:855396289798078465>",
    fun: "<a:fun:855398438547619860>",
    mod: "<:mod:855399096315019294>",
    wrong_error: "<:error:856125687567613973>",
    success: "<:success:855888059978743819>",
  };

  static BoltyUrls = {
    successLink: "https://cdn.discordapp.com/emojis/801791545060884510.png?v=1",
    errorLink: "https://emoji.discord.st/emojis/Error.png",
  };
}

module.exports = BoltyUtil;

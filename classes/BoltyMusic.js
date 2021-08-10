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
   * @param {Message} message
   */
  static musicBoltyEmbed(client, message) {
    return new MessageEmbed()
      .setColor("YELLOW")
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp(new Date());
  }

  /**
   * @param {Client} client
   * @param {Message} message
   * @returns Error embed
   */

  static musicErrorBoltyEmb(client, message) {
    return new MessageEmbed()
      .setColor("RED")
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp(new Date());
  }

  static BoltyEmotes = {
    info: "<:info:855396289798078465>",
    fun: "<a:fun:855398438547619860>",
    mod: "<:mod:855399096315019294>",
    wrong_error: "<:error:856125687567613973>",
    success: "<:success:855888059978743819>",
    music: "<a:musicplay:861692703644975104>",
  };

  static BoltyUrls = {
    error: "https://emoji.discord.st/emojis/Error.png",
  };
}

module.exports = BoltyUtil;

const { MessageEmbed, Message, Client } = require("discord.js");
const config = require("../config.json");

class BoltyInfo {
  /**
   * @param {Message} message
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
   *
   * @param {Client} client
   * @param {Message} message
   */
  static BoltyInfoEmbed(client, message) {
    return new MessageEmbed()
      .setTimestamp(new Date())
      .setFooter(
        `${client.user.username}`,
        "https://cdn.discordapp.com/attachments/855375756393054210/855375824441835520/bolty.gif"
      );
  }

  static embedURL(title, url, display) {
    return `[${title}](${url.replace(/\)/g, "%27")}${
      display ? ` "${display}"` : ""
    })`;
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

module.exports = BoltyInfo;

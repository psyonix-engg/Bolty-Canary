const { MessageEmbed, Message, Client } = require("discord.js");
const config = require("../config.json");

class BoltyMod {
  /**
   * @param {Message} message
   * @param {Client} client
   */

  static BoltyMuteEmbed(message) {
    return new MessageEmbed()
      .setFooter(
        `${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setColor(config.colors.yellowColor)
      .setTimestamp(new Date());
  }

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
   *
   * @param {Message} message
   */

  static BoltyKickedEmbed(message) {
    return new MessageEmbed()
      .setFooter(
        `${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setColor("GREEN")
      .setTimestamp(new Date());
  }

  /**
   *
   * @param {Message} message
   */

  static BoltyKickEmbed(message) {
    return new MessageEmbed()
      .setFooter(
        `${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setColor("GREEN")
      .setTimestamp(new Date());
  }

  /**
   *
   * @param {Message} message
   */

  static BoltyBanEmbed(message) {
    return new MessageEmbed()
      .setFooter(
        `${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setColor("RED")
      .setTimestamp(new Date());
  }

  static BoltyBannedEmbed(message) {
    return new MessageEmbed()
      .setFooter(
        `${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setColor("GREEN")
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

module.exports = BoltyMod;

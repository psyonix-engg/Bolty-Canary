const { MessageEmbed, Message, Client } = require("discord.js");
const config = require("../config.json");

class BoltyGiveaways {
  /**
   * @param {Message} message
   * @param {Client} client
   */

  static BoltyGiveawayEmbed(client, message) {
    return new MessageEmbed()
      .setFooter(`Bolty * Giveaway Manager`, client.user.displayAvatarURL())
      .setAuthor(`Giveaway Manager`, client.user.displayAvatarURL())
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setTimestamp(new Date())
      .setColor(config.colors.differentYellow);
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

module.exports = BoltyGiveaways;

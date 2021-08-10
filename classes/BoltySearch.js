const { MessageEmbed, Message, Client } = require("discord.js");
const request = require("node-superfetch");
const config = require("../config.json");

class BoltySearch {
  /**
   * @param {Client} client
   */

  static BoltySearchEmbed(client) {
    return new MessageEmbed()
      .setFooter(`${client.user.username}`, this.BoltyUrls.searchLink)
      .setColor(config.colors.kindaPinkColor)
      .setTimestamp(new Date())
      .setAuthor(`Lyrics Finder`, client.user.displayAvatarURL());
  }

  static BoltyErrorEmbed(client) {
    return new MessageEmbed()
      .setColor(config.colors.kindaRedColor)
      .setTimestamp(new Date())
      .setAuthor(`Error`, this.BoltyUrls.errorLink);
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
    searchLink:
      "https://emoji.discord.st/emojis/c8de6d4f-af63-47d5-a8dc-8f424733fb91.gif",
  };
}

module.exports = BoltySearch;

const { MessageEmbed, Message, Client } = require("discord.js");
const config = require("../config.json");

class BoltyDev {
  /**
   * @param {Message} message
   * @param {Client} client
   */

  static BoltyDevEmbed(client) {
    return (
      new MessageEmbed()
        .setFooter(
          `${client.user.username}`,
          "https://cdn.discordapp.com/attachments/855375756393054210/855375824441835520/bolty.gif"
        )
        .setColor(config.colors.blueColor)
        // .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp(new Date())
    );
  }

  /**
   *
   * @param {Client} client
   */

  static BoltyDevErrEmbed(client) {
    return new MessageEmbed()
      .setColor("RED")
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
  };

  /**
   * @param {Message} message
   * @param {Client} client
   */

  static async serverlistManager(message, client) {
    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description =
      `Total : ${message.client.guilds.cache.size}\n\n` +
      message.client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .map((r) => r)
        .map(
          (r, i) =>
            `**${i + 1}** - Name: \`${r.name}\` | Member Count: \`${
              r.memberCount
            }\` | Owner ID: \`${r.ownerID}\` | Owner Tag: \`${
              r.owner.user.tag
            }\``
        )
        .slice(0, 10)
        .join("\n");

    let embed = this.BoltyDevEmbed(client)
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle(
        `Page : ${page}/${Math.ceil(message.client.guilds.cache.size) / 10}`
      )
      .setDescription(description)
      .setTimestamp();

    let msg = await message.channel.send(embed);

    await msg.react("⬅");
    await msg.react("➡");
    await msg.react("❌");

    let collector = msg.createReactionCollector(
      (reaction, user) => user.id === message.author.id
    );

    collector.on("collect", async (reaction, user) => {
      if (reaction._emoji.name === "⬅") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;
        if (i0 < 0) {
          return msg.delete();
        }
        if (!i0 || !i1) {
          return msg.delete();
        }

        description =
          `Servers : ${message.client.guilds.cache.size}\n\n` +
          message.client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map((r) => r)
            .map(
              (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
            )
            .slice(i0, i1)
            .join("\n");
        embed
          .setTitle(
            `Pages : ${page}/${Math.round(
              message.client.guilds.cache.size / 10
            )}`
          )
          .setDescription(description);
        msg.edit(embed);
      }

      if (reaction._emoji.name === "➡") {
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        if (i1 > message.client.guilds.size + 10) {
          return msg.delete();
        }
        if (!i0 || !i1) {
          return msg.delete();
        }
        description =
          `Total : ${message.client.guilds.cache.size}\n\n` +
          message.client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map((r) => r)
            .map(
              (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
            )
            .slice(i0, i1)
            .join("\n");
        embed
          .setTitle(
            `Page : ${page}/${Math.round(client.guilds.cache.size / 10)}`
          )
          .setDescription(description);
        msg.edit(embed);
      }

      if (reaction._emoji.name === "❌") {
        return msg.delete();
      }
      await reaction.users.remove(message.author.id);
    });
  }
}

module.exports = BoltyDev;

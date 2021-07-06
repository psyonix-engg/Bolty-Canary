const { Client, Message, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents, oneLine } = require("common-tags");
const BoltyUtil = require("../../classes/BoltyUtil");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const embed = BoltyUtil.BoltyEmbedHelp(client)
    .setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL())
    .setTitle("Bolty   ‣   Help ")
    .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({ dynamic: true })
    )
    .setTimestamp();

  if (args[0]) {
    let command = args[0];
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }

    if (!cmd)
      return message.channel.send(
        embed
          .setTitle("Invalid Command.")
          .setDescription(
            `Type \`${client.config.prefix}help\` for the list of the commands.`
          )
      );
    command = cmd.help;
    embed.setDescription(
      [
        `❯      **Command:** \`${
          command.name.slice(0, 1).toUpperCase() + command.name.slice(1)
        }\``,
        `❯      **Description:** \`${
          command.description || "No Description provided."
        }\``,
        `❯      **Usage:** \`${
          command.usage
            ? `\`${client.config.prefix}${command.name} ${command.usage}\``
            : "No Usage."
        }\` `,
        `❯      **Aliases:** \`${
          command.aliases ? command.aliases.join(", ") : "None"
        }\``,
        `❯      **Category:** \`${
          command.category ? command.category : "General" || "Misc"
        }\``,
        `❯      **Cooldown:** \`${command.cooldown ? command.cooldown : "2"}\``,
      ].join("\n")
    );

    return message.channel.send(embed);
  }

  const categories = readdirSync("./commands/");
  embed.setDescription(
    [
      `Available commands for ${client.user.username}.`,
      `The bot prefix is **${client.config.prefix}**`,
      "`<>`means needed and () it is optional but don't include those.",
    ].join("\n")
  );

  categories.forEach((category) => {
    const dir = client.commands.filter(
      (c) => c.help.category.toLowerCase() === category.toLowerCase()
    );
    const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

    try {
      if (dir.size === 0) return;
      if (
        message.author.id === "510866456708382730" ||
        message.author.id === "513749311696142336"
      )
        embed.addField(
          `❯ ${capitalise}`,
          dir.map((c) => `\`${c.help.name}\``).join(", ")
        );
      else if (category !== "Developer")
        embed.addField(
          `❯ ${capitalise}`,
          dir.map((c) => `\`${c.help.name}\``).join(", ")
        );
    } catch (e) {
      console.log(e);
    }
  });
  return message.channel.send(embed);
};

module.exports.help = {
  name: "help",
  description: "Show off my commands.",
  aliases: ["h", "cmds", "commands"],
  usage: "help [command name] (optional)",
  category: "Util",
};

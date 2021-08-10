const { Client, Message, MessageEmbed } = require("discord.js");
const { oneLine } = require("common-tags");
const BoltyUtil = require("../../classes/BoltyUtil");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const pingMsg = await message.reply(
    new MessageEmbed().setColor("RED").setDescription(".....")
  );

  return pingMsg.edit({
    embeds: [
      BoltyUtil.BoltyEmbed(client)
        .setTitle("Pong!")
        .setDescription(
          oneLine`
      ${message.channel.type !== "dm" ? `${message.author},` : ""}
			Pong! The message round-trip took **${
        (pingMsg.editedTimestamp || pingMsg.createdTimestamp) -
        (message.editedTimestamp || message.createdTimestamp)
      }ms**.
			${
        client.ws.ping
          ? `The heartbeat ping is **${Math.round(client.ws.ping)}ms**.`
          : ""
      }
      `
        ),
    ],
  });
};

module.exports.help = {
  name: "ping",
  description: "Checks my ping to the Discord API.",
  aliases: ["ping", "latency", "speed"],
  usage: "",
  category: "Util",
  cooldown: 3,
};

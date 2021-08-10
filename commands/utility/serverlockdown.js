const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMod = require("../../classes/BoltyMod");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return;
  const channels = message.guild.channels.cache.filter(
    (ch) => ch.type !== "category"
  );

  if (args[0] === "on") {
    channels.forEach((channel) => {
      channel.permissionOverwrites(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });
    });

    message.channel.send({
      embeds: [
        BoltyMod.BoltyBannedEmbed(message)
          .setDescription(`\n**Done! Server was locked 🔒.**`)
          .setAuthor(
            `Server Lockdown Was Successfull!`,
            `https://media3.giphy.com/media/rQcEj8UVOC6QvJs36s/giphy.gif?cid=ecf05e4704ybde80mlymts3ae0iv3c3wzeoymdf1ucyzpx67&rid=giphy.gif&ct=g`
          )
          .setThumbnail(
            `https://media3.giphy.com/media/rQcEj8UVOC6QvJs36s/giphy.gif?cid=ecf05e4704ybde80mlymts3ae0iv3c3wzeoymdf1ucyzpx67&rid=giphy.gif&ct=g`
          ),
      ],
    });
  } else if (args[0] === "off") {
    channels.forEach((channel) => {
      channel.permissionOverwrites(message.guild.roles.everyone, {
        SEND_MESSAGES: true,
      });
    });

    message.channel.send({
      embeds: [
        BoltyMod.BoltyBannedEmbed(message)
          .setAuthor(
            `Server unLockdown Was Successfull!`,
            `https://media3.giphy.com/media/rQcEj8UVOC6QvJs36s/giphy.gif?cid=ecf05e4704ybde80mlymts3ae0iv3c3wzeoymdf1ucyzpx67&rid=giphy.gif&ct=g`
          )
          .setDescription(`\n**Done! Server was unlocked 🔒.**`)
          .setThumbnail(
            `https://media3.giphy.com/media/rQcEj8UVOC6QvJs36s/giphy.gif?cid=ecf05e4704ybde80mlymts3ae0iv3c3wzeoymdf1ucyzpx67&rid=giphy.gif&ct=g`
          ),
      ],
    });
  }
};

module.exports.help = {
  name: "serverlockdown",
  description: "Locks down the whole server.",
  aliases: ["lockdown", "srvrlockdown", "slockdown"],
  usage: "[on | off]",
  category: "Utility",
  cooldown: 10,
};

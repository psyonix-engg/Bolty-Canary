const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMusic = require("../../classes/BoltyMusic");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  message.channel.send(
    BoltyMusic.normalBoltyEmbed(message, client)
      .setTitle(`Stopped!`)
      .setDescription(`Stopped playing the song.`)
  );
  return client.distube.stop(message);
};

module.exports.help = {
  name: "stop",
  description: "Sotp the current playing song.",
  aliases: ["s"],
  usage: "",
  category: "Music",
  cooldown: 500,
};

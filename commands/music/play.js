const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMusic = require("../../classes/BoltyMusic");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let musicArgs = args.join(" ");

  if (!musicArgs) {
    message.channel.send(
      BoltyMusic.musicBoltyEmbed(client, message)
        .setAuthor(`Error`, `${BoltyMusic.BoltyUrls.error}`)
        .setDescription(`No song was provided.`)
    );
  }

  return client.distube.play(message, musicArgs);
};

module.exports.help = {
  name: "play",
  description: "Play music.",
  aliases: ["p"],
  usage: "[song name here]",
  category: "Music",
  cooldown: 500,
};

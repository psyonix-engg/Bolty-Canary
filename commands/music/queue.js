const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMusic = require("../../classes/BoltyMusic");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (!message.guild.me.voice.channel)
    message.reply({
      embeds: [
        BoltyMusic.musicBoltyEmbed(client, message).setDescription(
          `Nothing is being played.`
        ),
      ],
    });

  if (!message.member.voice.channel)
    message.reply({
      embeds: [
        BoltyMusic.musicBoltyEmbed(client, message).setDescription(
          `You are not in any voice channel.`
        ),
      ],
    });

  //get the queue

  try {
    let queue = client.distube.getQueue(message);
    /*if (!queue)
      message.channel.send(
        BoltyMusic.musicBoltyEmbed(client, message).setDescription(
          `Nothing is being played.`
        )
      );
      */

    let queueMsg =
      `Currect queue:\n` +
      queue.songs
        .map(
          (song, id) =>
            `**${id + 1}**. [${song.name}](${song.url}) - \`${
              song.formattedDuration
            }\``
        )
        .join("\n");

    message.channel.send({
      embeds: [
        BoltyMusic.musicBoltyEmbed(client, message)
          .setAuthor(
            `${message.guild.name} Music Queue`,
            message.guild.iconURL({ dynamic: true })
          )
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setDescription(queueMsg),
      ],
    });
  } catch (e) {
    message.channel.send({
      embeds: [
        BoltyMusic.musicErrorBoltyEmb(client, message).setDescription(
          `**An error occurred and there are possible reasons why.**\nYou are not in any voice channel.\nYou are not playing any music.\nThere was an internal error from my side.`
        ),
      ],
    });
  }
};

module.exports.help = {
  name: "queue",
  description: "Display the music queue.",
  aliases: ["q"],
  usage: "",
  category: "Music",
  cooldown: 5,
};

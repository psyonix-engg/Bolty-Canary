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

  try {
    let queue = client.distube.getQueue(message);

    let npMsg =
      `Current song:\n` +
      queue.songs.map(
        (song) => `${song.name}(${song.url}) - \`${song.formattedDuration}\``
      );

    message.channel.send({
      embeds: [
        BoltyMusic.musicBoltyEmbed(client, message)
          .setAuthor(`Now Playing`, message.guild.iconURL({ dynamic: true }))
          .setDescription(
            `**${queue.songs.map((song) => `[${song.name}](${song.url})`)}**`
          )
          .addField(
            `Likes`,
            queue.songs.map((song) => `\`${song.likes}\``)
          )
          .addField(
            `Views`,
            queue.songs.map((song) => `\`${song.views}\``)
          )
          .addField(
            `Duration`,
            queue.songs.map((song) => `\`${song.formattedDuration}\``)
          ),
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
  name: "nowplaying",
  description: "Display what is the song that is currently being played.",
  aliases: ["np"],
  usage: "",
  category: "Music",
  cooldown: 5,
};

const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");
const BoltyInfo = require("../../classes/BoltyInfo");

/*
const types = {
  dm: "DM",
  group: "Group DM",
  store: "Store Channel",
  news: "News Channel",
  text: "Text Channel",
  voice: "Voice Channel",
  category: "Category",
  unknown: "Unknown",
};
*/

const types = {
  GUILD_TEXT: "Text Channel",
  DM: "DM",
  GUILD_VOICE: "Voice Channel",
  GROUP_DM: "DM Group",
  GUILD_CATEGORY: "Category",
  GUILD_STORE: "Store Channel",
  GUILD_NEWS_THREAD: "News Thread Channel",
  GUILD_PUBLIC_THREAD: "Public Thread Channel",
  GUILD_PRIVATE_THREAD: "Private Thread Channel",
  GUILD_STAGE_VOICE: "Voice Stage Channel",
  UNKOWN: "Unkown",
};
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let channel =
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]) ||
    message.channel;

  // let topic = channel.topic;

  //if (topic === undefined) topic = "No topic provided.";

  let emb = BoltyInfo.BoltyInfoEmbed(client, message)
    .addField("❯ Name", channel.name, true)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField(`❯ ID`, channel.id, true)
    .addField(`❯ NSFW`, channel.nsfw ? "Yes" : "No", true)
    .addField(`❯ Category`, channel.parent ? channel.parent.name : "None", true)
    .addField(`❯ Type`, types[channel.type], true)
    .addField(
      `❯ Creation Date`,
      moment.utc(channel.createdAt).format("MM/DD/YYYY h:mm A", true)
    )

    .addField(`❯ Topic`, channel.topic ?? "No channel topic.", true);

  message.channel.send({ embeds: [emb] });
};

module.exports.help = {
  name: "channel",
  description: "Shows basic information about a channel.",
  aliases: ["ch"],
  usage: "[mention channel here  |  ID of the channel]",
  category: "Info",
  cooldown: 5,
};

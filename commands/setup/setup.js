const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyUtil = require("../../classes/BoltyUtil");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return;

  let guild = message.guild;

  let msg = await message.channel.send(
    BoltyUtil.BoltyEmbed(client).setDescription(`Starting the setup...`)
  );

  guild.roles
    .create({
      data: {
        name: "Muted (Bolty)",
        color: "GREY",
        permissions: ["VIEW_CHANNEL"],
      },
      reason: "Bolty Bot Setup",
    })
    .catch((e) => {
      message.channel.send(
        BoltyUtil.BoltyEmbed(client).setDescription(
          `${BoltyUtil.BoltyEmotes.wrong_error} There was an error, please check that the bot have the proper permissions.\n${e}`
        )
      );
    });

  msg.edit(
    BoltyUtil.BoltyEmbed(client).setDescription(`Created The Muted Role`)
  );
  msg.delete({ timeout: 3000 });

  message.channel.send(
    BoltyUtil.BoltyEmbed(client).setDescription(
      `${BoltyUtil.BoltyEmotes.success} The Setup was successful!\nI have created the muted role, so you can mute people.`
    )
  );
};

module.exports.help = {
  name: "setup",
  description: "Will do basic setup so Bolty can work correctly!",
  aliases: ["stup", "st", "sp"],
  usage: "",
  category: "Setup",
};

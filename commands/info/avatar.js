const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyInfo = require("../../classes/BoltyInfo");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  /*
  const user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.author;

    message.channel.send(
      BoltyInfo.BoltyInfoEmbed(client, message)
        .setColor(`BLURPLE`)
        .setTitle(user.tag)
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 2048 }))
    );
    */

  try {
    let user = message.author;
    let avatar;

    if (args.length > 0) {
      let userID = args[0].slice(3, -1);
      user = message.guild.members.cache.get(userID).user.toString();
    }

    avatar = getUserAvatar(user);

    message.channel.send({
      embeds: [
        BoltyInfo.BoltyInfoEmbed(client, message)
          .setColor("BLURPLE")
          .setTitle(user.tag)
          .setImage(avatar),
      ],
    });

    function getUserAvatar(user) {
      let avatar = user.displayAvatarURL({ dynamic: true, size: 2048 });

      return avatar;
    }
  } catch (e) {
    message.channel.send({
      embeds: [
        BoltyInfo.BoltyInfoEmbed(client, message).setDescription(
          `There was an error trying to run this command.\n\`${e.message}\``
        ),
      ],
    });
  }

  /*
  let memb1 = message.mentions.members.first();

  if (memb1) {
    message.channel.send(
      BoltyInfo.BoltyInfoEmbed(client, message)
        .setColor(`BLURPLE`)
        .setTitle(memb1.user.tag)
        .setThumbnail(
          memb1.user.displayAvatarURL({ dynamic: true, size: 2048 })
        )
    );
  }

  let memb2 = message.guild.members.cache.get(args[0]);

  if (memb2) {
    message.channel.send(
      BoltyInfo.BoltyInfoEmbed(client, message)
        .setColor(`BLURPLE`)
        .setTitle(memb2.user.tag)
        .setThumbnail(
          memb2.user.displayAvatarURL({ dynamic: true, size: 2048 })
        )
    );
  }

  let msgAuth = message.author;

  if (msgAuth) {
    message.channel.send(
      BoltyInfo.BoltyInfoEmbed(client, message)
        .setColor(`BLURPLE`)
        .setTitle(msgAuth.tag)
        .setThumbnail(msgAuth.displayAvatarURL({ dynamic: true, size: 2048 }))
    );
  }
  */

  /*  message.channel.send(
    BoltyInfo.BoltyInfoEmbed(client, message)
      .setColor("BLURPLE")
      .setTitle(user.user.tag)
      .setImage(user.user.displayAvatarURL({ dynamic: true, size: 2048 }))
  );
  */
};

module.exports.help = {
  name: "avatar",
  description: "Shows your or other user's avatar.",
  aliases: ["av", "pfp", "profile-pic", "profile-picture"],
  usage: "[@user or ID] (optional)",
  category: "Info",
  cooldown: 10,
};

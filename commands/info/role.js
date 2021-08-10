const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyInfo = require("../../classes/BoltyInfo");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const role =
    message.guild.roles.cache.get(args[0]) ||
    message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
    ) ||
    message.mentions.roles.first();

  if (!role) {
    message.channel.send({
      embeds: [
        BoltyInfo.BoltyInfoEmbed(client, message)
          .setColor("RED")
          .setAuthor(`Error`, `${BoltyInfo.BoltyUrls.errorLink}`)
          .setDescription(
            `You did not provide a role to show information about.`
          )
          .setFooter(
            message.guild.name,
            message.guild.iconURL({ dynamic: true })
          ),
      ],
    });
  }

  const status = {
    false: "No",
    true: "Yes",
  };
  message.channel.send(
    BoltyInfo.BoltyInfoEmbed(client)
      .setColor(role.hexColor)
      .setTitle(`Role Information: \`[  ${role.name}  ]\``)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField(`**ID**`, `\`${role.id}\``, true)
      .addField("**Name**", role.name, true)
      .addField("**Hex**", role.hexColor, true)
      .addField("**Members**", role.members.size, true)
      .addField("**Position**", role.position, true)
      .addField("**Mentionable**", status[role.mentionable], true)
  );
};

module.exports.help = {
  name: "roleinfo",
  description: "",
  aliases: [""],
  usage: "",
  category: "",
  cooldown: "",
};

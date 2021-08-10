const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");
const { mem, cpu, os } = require("node-os-utils");
const { stripIndent } = require("common-tags");
const BoltyInfo = require("../../classes/BoltyInfo");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const d = moment.duration(message.client.uptime);
  const days = d.days == 1 ? `${d.days()} day` : `${d.days()} days`;
  const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
  const minutes =
    d.minutes() == 1 ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
  const seconds =
    d.seconds() == 1 ? `${d.seconds()} second` : `${d.seconds()} seconds`;
  const clientStats = stripIndent`
  Servers   :: ${message.client.guilds.cache.size}
  Users     :: ${message.client.users.cache.size}
  Channels  :: ${message.client.channels.cache.size}
  WS Ping   :: ${Math.round(message.client.ws.ping)}ms
  Uptime    :: ${days}, ${hours}, ${minutes}, ${seconds}
  `;
  const { totalMemMb, usedMemMb } = await mem.info();
  const serverStats = stripIndent`
  OS        :: ${(await os.oos()) ? "Linux" : "Linux OS"}
  CPU       :: ${cpu.model()}
  Cores     :: ${cpu.count()}
  CPU Usage :: ${await cpu.usage()} %
  RAM       :: ${totalMemMb} MB
  RAM Usage :: ${usedMemMb} MB 
`;

  message.channel.send({
    embeds: [
      BoltyInfo.BoltyInfoEmbed(client, message)
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle(`${client.user.username} Statistics`)
        .addField(`Commands`, `\`${message.client.commands.size}\``, true)
        .addField("Aliases", `\`${message.client.aliases.size}\``, true)
        .addField(`Client`, `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField("Server", `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setColor(message.guild.me.displayHexColor || "PURPLE"),
    ],
  });
};

module.exports.help = {
  name: "stats",
  description: "A bit of statistics on me.",
  aliases: ["s"],
  usage: "",
  category: "Info",
  cooldown: 10,
};

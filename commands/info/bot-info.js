const {
  Client,
  Message,
  MessageEmbed,
  version: version,
} = require("discord.js");
const { versionn } = require("../../package.json");
const BoltyInfo = require("../../classes/BoltyInfo");
const os = require("os");
const moment = require("moment");
require("moment-duration-format");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const date = new Date(client.uptime);

  const duration = moment
    .duration(client.uptime)
    .format(" D [days], H [hrs], m [mins], s [secs]");

  const msg = await message.channel.send({
    embeds: [
      BoltyInfo.BoltyEmbed(client).setAuthor(
        `Loading...`,
        `${BoltyInfo.BoltyUrls.successLink}`
      ),
    ],
  });
  msg
    .edit({
      embeds: [
        BoltyInfo.BoltyEmbed(client).setAuthor(
          `Loaded!...`,
          `${BoltyInfo.BoltyUrls.successLink}`
        ),
      ],
    })
    .then(msg.delete());

  const ping = msg.createdTimestamp - message.createdTimestamp;

  const core = os.cpus()[0];

  let botinfoEmbed = BoltyInfo.BoltyEmbed(client).setTitle(
    `Information About ${client.user.tag}`
  ).setDescription(`
  I was made by **Psyonix_#9705** And **Richardko3#8888**.\n
  **__General Information__**
        \u200b
        <:API:819891596635275284> API Latency  ::   **${client.ws.ping}MS**
        🤖 Bot Latency  ::   **${ping}MS**
        <:Version:819891812529471488> Bot Version  ::   **${versionn}**
        <:Uptime:819892030406656050> Bot Uptime  ::   **${duration}**
        👥 Users  ::   **${client.users.cache.size}**
        <:Server:819892538588528670> Servers  ::   **${
          client.guilds.cache.size
        }**
        <:Channels:819892704892420107> Channels  ::   **${
          client.channels.cache.size
        }**
        <:Commands:819892824559976528> Commands  ::   **${
          client.commands.size
        }**

        **__Software__**
        \u200b
        💻 Platform  ::   **Linux**
        <:CPU:819892989249323028> CPU  ::   **${os.cpus().length} Cores**
        <:Model:819893115850326037> Model  ::   **${core.model}**
        <:Speed:819893269622292501> Speed  ::   **${core.speed}MHz**
        <:Created:819893409342291968> Time Created  ::   **${new Date(
          client.user.createdTimestamp
        ).toLocaleString()}**
  `);

  message.channel.send({ embeds: [botinfoEmbed] });
};

module.exports.help = {
  name: "botinfo",
  description: "Display some information about **Bolty**.",
  aliases: ["bi", "botinf", "bot"],
  usage: "",
  category: "Info",
  cooldown: 10,
};

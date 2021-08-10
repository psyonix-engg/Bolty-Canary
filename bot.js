const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
});
const fs = require("fs");
const path = require("path");
const { sep } = require("path");
const BoltyUtil = require("./classes/BoltyUtil");
require("dotenv").config();
const Distube = require("distube");
const mongoose = require("mongoose");
const secret = require("./token_.json");

const distube = new Distube(client, {
  searchSongs: true,
  emitNewSongOnly: true,
  highWaterMark: 1 << 25,
  leaveOnStop: false,
  leaveOnEmpty: false,
  leaveOnFinish: false,
});

mongoose
  .connect(secret.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`[DATABASE] Sucessfully connected to MongoDB!`);
  })
  .catch((err) => {
    console.log(
      `[DATABASE] There was an error trying to connect to MongoDB: ${err}`
    );
  });

client.distube = distube;
const cooldowns = new Discord.Collection();

global.client = { client };
module.exports = { client };

const guildSettings = new Discord.Collection();

client.guildSettings = guildSettings;

client.config = require("./config.json");

const { prefix, blackColor, blueColor } = require("./config.json");
const { token } = require("./token_.json");
const { BoltyMuteEmbed } = require("./classes/BoltyMod");
const { cpuUsage } = require("process");
const { mod } = require("mathjs");
const { BoltyEmbed } = require("./classes/BoltyMusic");
const { stripIndent } = require("common-tags");

["commands", "aliases"].forEach((x) => (client[x] = new Discord.Collection()));

console.clear();
const load = (dir = "./commands/") => {
  fs.readdirSync(dir).forEach((dirs) => {
    const commands = fs
      .readdirSync(`${dir}${sep}${dirs}${sep}`)
      .filter((files) => files.endsWith(".js"));

    for (const file of commands) {
      const pull = require(`${dir}/${dirs}/${file}`);
      if (
        pull.help &&
        typeof pull.help.name === "string" &&
        typeof pull.help.category === "string"
      ) {
        if (client.commands.get(pull.help.name))
          return console.warn(
            `⚠ Two or more commands have the same name ${pull.help.name}.`
          );
        client.commands.set(pull.help.name, pull);
        console.log(`✅ Loaded command ${pull.help.name}.`);
      } else {
        console.log(
          `❌ Error loading command in ${dir}/${dirs}. you have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`
        );
        continue;
      }
      if (pull.help.aliases && typeof pull.help.aliases === "object") {
        pull.help.aliases.forEach((alias) => {
          if (client.aliases.get(alias))
            return console.warn(
              `⚠ Two commands or more commands have the same aliases ${alias}`
            );
          client.aliases.set(alias, pull.help.name);
        });
      }
    }
  });
};

load();

require("./mainGuildBoltyLogs/messageDelete");
client.on("ready", async () => {
  client.user.setPresence({
    activity: {
      name: "you :D",
      type: "WATCHING",
    },
    status: "idle",
  });
  console.log("ready!");
});

client.on("guildCreate", async (guild) => {
  let logChannel = "866652984674746399";
  const config = require("./config.json");

  const guildInfo = stripIndent`
   Guild ID  :: ${guild.id}
   Guild Voice Channels :: ${
     guild.channels.cache.filter((x) => x.type === "voice").size
   }
   Guild Text Channels :: ${
     guild.channels.cache.filter((x) => x.type === "text").size
   }
  `;

  const ownerInfo = stripIndent`
   Owner Tag :: ${guild.owner.user.tag}
   Owner ID  :: ${guild.owner.id}
  `;

  client.channels.cache.get(logChannel).send(
    new Discord.MessageEmbed()
      .setAuthor(`Added Guild!`, guild.iconURL({ dynamic: true }))
      .setTitle(`I was added to a guild`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor(config.colors.boltyEmbedColor)
      .addField(`Guild Name`, `\`${guild.name}\``, true)
      .addField(`Guild Members`, `\`${guild.memberCount}\``, true)
      .addField(`Guild Information`, `\`\`\`asciidoc\n${guildInfo}\`\`\``)
      .addField(`Owner Information`, `\`\`\`asciidoc\n${ownerInfo}\`\`\``)

      // .addField(
      //`Guild Information`,
      //  `${guild.name} (${guild.id}) **${guild.memberCount}** members.`
      //   )
      //.addField(
      //`Owner Information`,
      //`${guild.owner.user.tag} (${guild.owner.id}).`
      // )
      .setFooter(`Currently in ${client.guilds.cache.size} guilds.`)
  );
});

client.on("guildDelete", async (guild) => {
  const config = require("./config.json");
  let logChannel = "866652984674746399";

  /*
  Guild Name :: ${guild.name}
   Guild MemberCount :: ${guild.memberCount}
   */

  const guildInfo = stripIndent`
   Guild ID  :: ${guild.id}
   Guild Voice Channels :: ${
     guild.channels.cache.filter((x) => x.type === "voice").size
   }
   Guild Text Channels :: ${
     guild.channels.cache.filter((x) => x.type === "text").size
   }
  `;

  const ownerInfo = stripIndent`
   Owner Tag :: ${guild.owner.user.tag}
   Owner ID  :: ${guild.owner.id}
  `;

  client.channels.cache.get(logChannel).send(
    new Discord.MessageEmbed()
      .setAuthor(`Removed Guild`, guild.iconURL({ dynamic: true }))
      .setTitle(`I was removed from a guild`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor(config.colors.boltyEmbedColor)
      .addField(`Guild Name`, `\`${guild.name}\``, true)
      .addField(`Guild Members`, `\`${guild.memberCount}\``, true)
      .addField(`Guild Information`, `\`\`\`asciidoc\n${guildInfo}\`\`\``)
      .addField(`Owner Information`, `\`\`\`asciidoc\n${ownerInfo}\`\`\``)

      // .addField(
      //`Guild Information`,
      //  `${guild.name} (${guild.id}) **${guild.memberCount}** members.`
      //   )
      //.addField(
      //`Owner Information`,
      //`${guild.owner.user.tag} (${guild.owner.id}).`
      // )
      .setFooter(`Currently in ${client.guilds.cache.size} guilds.`)
  );
});

client.on("messageCreate", async (message) => {
  const mentionRegex = RegExp(`^<@!${client.user.id}>$`);

  const mentionRegexPrefix = RegExp(`^<@!${client.user.id}> `);

  if (message.content.match(mentionRegex))
    message.channel.send(
      BoltyUtil.BoltyEmbed(client)
        .setTitle(`My current prefix is \`${client.config.prefix}\``)
        .setDescription(`Type \`${client.config.prefix}help\` to get started.`)
    );

  const prefix = message.content.match(mentionRegexPrefix)
    ? message.content.match(mentionRegexPrefix)[0]
    : client.config.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let command;

  if (message.author.bot || !message.guild) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message.author);

  if (!message.content.startsWith(prefix)) return;

  if (cmd.length === 0) return;
  if (client.commands.has(cmd)) command = client.commands.get(cmd);
  else if (client.aliases.has(cmd))
    command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    if (!cooldowns.has(command.help.name)) {
      cooldowns.set(command.help.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.help.name);
    const cooldownAmount = (command.help.cooldown || 2) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${
            command.help.name
          }\` command.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  //music filters
  const filters = [
    "3d",
    "bassboost",
    "echo",
    "karaoke",
    "nightcore",
    "vaporwave",
    "flanger",
  ];

  if (filters.includes(command)) {
    let filter = client.distube.setFilter(message, command);
    embedBuilder(
      client,
      message,
      "BLURPLE",
      `Queue Filter`,
      `Currect queue filter is:  \`${filter || "Off"}\``
    );
  }

  try {
    if (command) command.run(client, message, args);
  } catch (err) {
    message.reply(
      BoltyMuteEmbed(message)
        .setAuthor(
          `Error while running`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `There was an error trying to run the command \`${command.help.name}\`.\n\`${err.message}\``
        )
    );
  }
});
client.login(require("./token_.json").token).catch(console.error());

/////////////////////MUSIC SYSTEM///////////////////////

/*
const status = (queue) =>
  `Volume: \`${queue.volume}\` | Filter: \`${
    queue.filter || "OFF"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
  */

distube
  .on("playSong", (message, queue, song) => {
    embedBuilder(
      client,
      message,
      "GREEN",
      "Playing new Song!",
      `Song: \`${song.name}\`  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}`
    );
  })
  .on("addSong", (message, queue, song) => {
    embedBuilder(
      client,
      message,
      `GREEN`,
      `Added a Song!`,
      `Song: \`${song.name}\`  -  \`${song.formattedDuration}\`\n\nRequested by: ${song.user}`
    );
  })
  .on("playList", (message, queue, playlist, song) => {
    embedBuilder(
      client,
      message,
      "GREEN",
      "Playling playlist",
      `Playlist: \`${playlist.name}\`  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${song.user}\n\nstarting playing Song: \`${song.name}\`  -  \`${song.formattedDuration}\``
    );
  })
  .on("addList", (message, queue, song) => {
    embedBuilder(
      client,
      message,
      "GREEN",
      "Added a Playling!",
      `Playlist: \`${playlist.title}\`  -  \`${playlist.total_items} songs\` \n\nRequested by: ${song.user}`
    );
  })
  .on("searchResult", (message, result) => {
    let i = 0;
    embedBuilder(
      client,
      message,
      "YELLOW",
      "",
      `**Choose an option from below**\n${result
        .map(
          (song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
        )
        .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
    );
  })
  // DisTubeOptions.searchSongs = true
  .on("searchCancel", (message) =>
    embedBuilder(client, message, "RED", `Searching canceled`, "")
  )
  .on("error", (message, err) =>
    embedBuilder(client, message, "RED", "An error encountered:", err)
  );

function embedBuilder(client, message, color, title, description) {
  let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setFooter(client.user.username, client.user.displayAvatarURL());
  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);
  return message.channel.send({ embeds: [embed] });
}
module.exports.embedBuilder = embedBuilder;

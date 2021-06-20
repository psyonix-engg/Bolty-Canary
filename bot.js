const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const path = require("path");
const { sep } = require("path");
const BoltyUtil = require("./classes/BoltyUtil");
require("dotenv").config();

client.config = require("./config.json");

const { prefix, blackColor, blueColor } = require("./config.json");
const { token } = require("./token_.json");

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

      if (!pull.help.ownerOnly) {
        pull.help.ownerOnly = false;
      }
    }
  });
};

load();

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

client.on("message", async (message) => {
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

  if (command) command.run(client, message, args);
});

client.login(require("./token_.json").token).catch(console.error());

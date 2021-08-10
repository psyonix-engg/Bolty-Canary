const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const BoltyDev = require("../../classes/BoltyDev");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("855156821093646366")) return;

  let codedin = args.slice(0).join(" ");

  let errEmb = BoltyDev.BoltyDevErrEmbed(client).setDescription(
    `You did not provide any code to evaluate.`
  );

  if (!codedin) {
    message.channel.send({ embeds: [errEmb] });
  }

  if (codedin === "client.config.token") return;
  if (codedin === "client.config.prefix") return;

  let undefinedEmbed = BoltyDev.BoltyDevErrEmbed(client).setDescription(
    `min. \n\`\`\`javascript\nundefined\n\`\`\``
  );
  let code = eval(codedin);

  if (codedin.length < 1 && !codedin)
    return message.channel.send({ embeds: [undefinedEmbed] });

  if (typeof code !== "string")
    code = require("util").inspect(code, { depth: 0 });

  let charov1 = BoltyDev.BoltyDevEmbed(client).setDescription(
    `min. \n\`\`\`javascript\n${
      code.length > 1024 ? "Character Over!" : code
    }\n\`\`\``
  );

  message.channel.send({ embeds: [charov1] });

  /*let errmeb = BoltyDev.BoltyDevErrEmbed(client).setDescription(
    `min. \n\`\`\`javascript\n${
      code.length > 1024 ? "Character Over!" : e
    }\n\`\`\``
  );
  */
};

module.exports.help = {
  name: "eval",
  description: "Evalutes my code.",
  aliases: ["ev"],
  usage: "[code here]",
  category: "Developer",
  cooldown: 2,
};

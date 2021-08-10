const { client } = require("../bot.js"),
  BoltyUtil = require("../classes/BoltyUtil");

client.on("guildBanAdd", async (guild, user) => {
  if (message.author.bot || !message.guild) return;

  let logChannel = `872811297929060463`;

  let channel = client.channels.cache.get(logChannel);

  const guildBanAddEmb = BoltyUtil.BoltyLogEmbed(client).setTitle(
    `Member Banned`
  ).setDescription(`
    A member was just banned.
    **Moderator:** \`${guild.member(user.tag)}\`
    **User:** ${user.tag}
     `);

  channel.send(msgDelEmb);
});

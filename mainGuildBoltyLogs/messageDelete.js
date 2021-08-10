const { client } = require("../bot.js"),
  BoltyUtil = require("../classes/BoltyUtil");

client.on("messageDelete", async (message) => {
  if (message.author.bot || !message.guild) return;

  let logChannel = `872811297929060463`;

  const msgDelEmb = BoltyUtil.BoltyLogEmbed(client).setTitle(`Message Deleted`)
    .setDescription(`A message was deleted by **${message.author.tag}.**
    **Content:** \`${message.content}\`
    **Channel:** <#${message.channel.id}>
    `);

  let channel = client.channels.cache.get(logChannel);

  channel.send(msgDelEmb);
});

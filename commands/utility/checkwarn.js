const { Client, Message, MessageEmbed } = require("discord.js");
const BoltyMod = require("../../classes/BoltyMod");
const fs = require("fs");
var warnDATA = JSON.parse(fs.readFileSync("databases/warns.json", "utf-8"));
const path = "databases/warns.json"

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
      var target =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
    
      if(!target) {

        if(message.guild.id in warnDATA === false) {
          warnDATA[message.guild.id] = {};
            fs.writeFile(path, JSON.stringify(warnDATA, null, 4), (err) =>{
                if(err) console.log(err)
            });
        }

        if(message.author.id in warnDATA[message.guild.id] === false) {
          warnDATA[message.guild.id][message.author.id] = {
            warnings: 0,
            "reasons": [],
            "dates": []
          };
            fs.writeFile(path, JSON.stringify(warnDATA, null, 4), (err) =>{
                if(err) console.log(err)
            });
        }

        var totalWarnsAuthor = warnDATA[message.guild.id][message.author.id].warnings

        const embed = BoltyMod.BoltyMuteEmbed(message)
        .setAuthor(
          `${message.author.tag} has ${totalWarnsAuthor} warning(s)`,
          `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
        )
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))

        for(var i=0; i < warnDATA[message.guild.id][message.author.id].dates.length; i++) {
          var id = `#${i+1}`
            embed.addField(id, `\`${warnDATA[message.guild.id][message.author.id].dates[i]}\` | \`${warnDATA[message.guild.id][message.author.id].reasons[i]}\``)
        }

        message.channel.send(embed);
        return
      }

      //user defined funct
      if(message.guild.id in warnDATA === false) {
        warnDATA[message.guild.id] = {};
          fs.writeFile(path, JSON.stringify(warnDATA, null, 4), (err) =>{
              if(err) console.log(err)
          });
      }

      if(target.id in warnDATA[message.guild.id] === false) {
        warnDATA[message.guild.id][target.id] = {
          warnings: 0,
          "reasons": [],
          "dates": []
        };
          fs.writeFile(path, JSON.stringify(warnDATA, null, 4), (err) =>{
              if(err) console.log(err)
          });
      }

      var totalWarnsTarget = warnDATA[message.guild.id][target.id].warnings

      const embed = BoltyMod.BoltyMuteEmbed(message)
      .setAuthor(
        `${target.user.tag} has ${totalWarnsTarget} warning(s)`,
        `https://cdn.discordapp.com/emojis/801791545060884510.png?v=1`
      )
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))

      for(var i=0; i < warnDATA[message.guild.id][target.id].dates.length; i++) {
        var id = `#${i+1}`
          embed.addField(id, `\`${warnDATA[message.guild.id][target.id].dates[i]}\` | \`${warnDATA[message.guild.id][target.id].reasons[i]}\``)
      }

      message.channel.send(embed);
}

 module.exports.help = {
    name: "checkwarn",
    description: "Check someone's warnings in the server",
    aliases: ["warnings"],
    usage: "[user]",
    category: "Utility",
  };
const { Client, Message, MessageEmbed } = require("discord.js");
//const BoltyCovid = require("../../classes/BoltyCovid");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var WorldAPIUrl = "https://cov-19-live.herokuapp.com/api/all";

function Get(Url) {
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", Url, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  var specifier = args[0];
  var country = args[1];

  if (!specifier) specifier = "world";

  if (specifier.toLowerCase() === "world") {
    const data = JSON.parse(Get(WorldAPIUrl));

    if (!data.status === "success")
      return message.channel.send("❌ Something went wrong");

    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("COVID-19 World")
      .addField("All Cases", formatNumber(data.cases), true)
      .addField("Recovered", formatNumber(data.recovered), true)
      .addField("Deaths", formatNumber(data.deaths), true)
      .addField("Cases Today", formatNumber(data.todayCases), true)
      .addField("Deaths Today", formatNumber(data.todayDeaths), true)
      .addField("Active Cases", formatNumber(data.active), true)
      .addField("Critical Cases", formatNumber(data.critical), true)
      .addField("Cases Per 1mil", formatNumber(data.casesPerOneMillion), true)
      .addField(
        "Critical Per 1mil",
        formatNumber(data.criticalPerOneMillion),
        true
      )
      .addField("Deaths Per 1mil", formatNumber(data.deathsPerOneMillion), true)
      .addField(
        "Recovered Per 1mil",
        formatNumber(data.recoveredPerOneMillion),
        true
      )
      .addField("Tests Per 1mil", formatNumber(data.testsPerOneMillion), true)
      .addField("Tests", formatNumber(data.tests), true)
      .addField("Population", formatNumber(data.population), true)
      .addField(
        "Affected Countries",
        formatNumber(data.affectedCountries),
        true
      );
    return message.channel.send({ embeds: [embed] });
  }

  if (specifier.toLowerCase() === "country") {
    if (!country)
      return message.channel.send({
        content: `❌ You did not specify a country`,
      });

    const data = JSON.parse(
      Get(`https://cov-19-live.herokuapp.com/api/countries/${country}`)
    );
    const WorlData = JSON.parse(Get(WorldAPIUrl));

    if (!data.status === "success")
      return message.channel.send("❌ Something went wrong");

    try {
      const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`COVID-19: ${country}`)
        .addField("All Cases", formatNumber(data.cases), true)
        .addField("Recovered", formatNumber(data.recovered), true)
        .addField("Deaths", formatNumber(data.deaths), true)
        .addField("Cases Today", formatNumber(data.todayCases), true)
        .addField("Deaths Today", formatNumber(data.todayDeaths), true)
        .addField("Active Cases", formatNumber(data.active), true)
        .addField("Critical Cases", formatNumber(data.critical), true)
        .addField("Cases Per 1mil", formatNumber(data.casesPerOneMillion), true)
        .addField(
          "Critical Per 1mil",
          formatNumber(data.criticalPerOneMillion),
          true
        )
        .addField(
          "Deaths Per 1mil",
          formatNumber(data.deathsPerOneMillion),
          true
        )
        .addField(
          "Recovered Per 1mil",
          formatNumber(data.recoveredPerOneMillion),
          true
        )
        .addField("Tests Per 1mil", formatNumber(data.testsPerOneMillion), true)
        .addField("Tests", formatNumber(data.tests), true)
        .addField("Population", formatNumber(data.population), true)
        .addField(
          "Affected Countries",
          formatNumber(WorlData.affectedCountries),
          true
        );
      return message.channel.send({ embeds: [embed] });
    } catch {
      return message.channel.send({ content: `❌ Country not found` });
    }
  }
};

module.exports.help = {
  name: "covid",
  description: "Gives you information on COVID-19.",
  aliases: ["cov19", "covid19", "cov-19", "covid-19", "corona"],
  usage: '<"world" / "country"> (country_name)',
  category: "Covid-19",
  cooldown: 5,
};

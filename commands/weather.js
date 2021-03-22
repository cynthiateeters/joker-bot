const Discord = require('discord.js');
const axios = require('axios');
const dotenv = require('dotenv');

const url = `https://api.openweathermap.org/data/2.5/weather?`;
const fields = `units=imperial&`;
const apikey = `appid=${process.env.OPENWEATHERMAP_KEY}`;

const g_url = `https://api.opencagedata.com/geocode/v1/json?`;
const g_key = process.env.OPENCAGEDATA_KEY;

const exampleEmbed = (
  temp,
  maxTemp,
  minTemp,
  pressure,
  humidity,
  wind,
  cloudness,
  icon,
  author,
  profile,
  formatted,
  cityName,
  stateName,
  country,
  flag
) =>
  new Discord.MessageEmbed()
    .setColor('RANDOM')
    // .setAuthor(`Hello, ${author}`, profile)
    .setTitle(
      `It is ${temp}\u00B0 F in ${cityName}${cityName ? ',' : ''} ${
        stateName || country
      }  ${flag}`
    )
    .addField(`Maximum Temperature:`, `${maxTemp}\u00B0 F`, true)
    .addField(`Minimum Temperature:`, `${minTemp}\u00B0 F`, true)
    .addField(`Humidity:`, `${humidity} %`, true)
    .addField(`Wind Speed:`, `${wind} mph`, true)
    .addField(`Pressure:`, `${pressure} hpa`, true)
    .addField(`Cloudiness:`, `${cloudness}`, true)
    .setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)
    .setFooter('Made With 💖 For IDMX');

module.exports = {
  name: 'weather',
  description: 'return weather to sender',
  async run(client, message, args) {
    //console.log(args);

    console.log(`${g_url}q=${args}&key=${g_key}`);

    const g_resp = await axios(`${g_url}q=${args}&key=${g_key}`).catch(
      (err) => {
        console.log(err);
        message.reply(`Enter a valid city name`);
        return;
      }
    );

    if (g_resp.data.results[0] == undefined) {
      message.reply(`Enter a valid city name`);
      return;
    }

    const lat = g_resp.data.results[0].geometry.lat;
    const lon = g_resp.data.results[0].geometry.lng;
    const formatted = g_resp.data.results[0].formatted;
    const cityName = g_resp.data.results[0].components.city || '';
    const stateName = g_resp.data.results[0].components.state_code || '';
    const country = g_resp.data.results[0].components.country;
    const flag = g_resp.data.results[0].annotations.flag;

    console.log(`${url}lat=${lat}&lon=${lon}&${fields}${apikey}`);

    axios
      .get(`${url}lat=${lat}&lon=${lon}&${fields}${apikey}`)
      .then((response) => {
        let apiData = response;
        let currentTemp = Math.ceil(apiData.data.main.temp);
        let maxTemp = Math.ceil(apiData.data.main.temp_max);
        let minTemp = Math.ceil(apiData.data.main.temp_min);
        let humidity = apiData.data.main.humidity;
        let wind = apiData.data.wind.speed;
        let author = message.author.username;
        let profile = message.author.displayAvatarURL;
        let icon = apiData.data.weather[0].icon;
        // let cityName = args;
        //let country = apiData.data.sys.country;
        let pressure = apiData.data.main.pressure;
        let cloudness = apiData.data.weather[0].description;
        message.channel.send(
          exampleEmbed(
            currentTemp,
            maxTemp,
            minTemp,
            pressure,
            humidity,
            wind,
            cloudness,
            icon,
            author,
            profile,
            formatted,
            cityName,
            stateName,
            country,
            flag
          )
        );
      })
      .catch((err) => {
        console.log(err);
        message.reply(`Enter a valid city name`);
      });
  },
};

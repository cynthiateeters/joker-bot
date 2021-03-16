const Discord = require('discord.js');
const fetch = require('node-fetch');
const url = `https://data.climacell.co/v4/timelines?`;
const location = `location=40.61072896285787,-74.68836188532062&`;
const fields = `fields=temperature&timesteps=1d&units=imperial&`;
const apikey = `apikey=ta6ovYsmm3yCCuzceAqcRm55JHJKigd8`;

module.exports = {
  name: 'weather',
  description: 'return weather to sender',
  async run(client, message, args) {
    const response = await fetch(url + location + fields + apikey)
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log(response);
  },
};

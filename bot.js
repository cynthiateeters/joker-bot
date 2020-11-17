const Jokes = require('./jokes.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');

dotenv.config();
const clientID = process.env.CLIENT_ID;

console.log('running ❤️');

client.login(clientID);

// channel id: 778302184173076481

client.on('message', (msg) => {
  console.log(msg.content);
  if (
    msg.channel.id == '778302184173076481' &&
    msg.content.toLowerCase().includes('joke')
  ) {
    console.log('Joke request 🍭');
    const indx = Math.floor(Math.random() * Jokes.length);
    msg.channel.send(`🦹 ${Jokes[indx].joke}`);
  }
});

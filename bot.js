const Jokes = require('./jokes.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');

dotenv.config();
const clientID = process.env.DISCORD_BOT_TOKEN;

client.on('ready', () => {
  client.user.setActivity('birds in the back yard', { type: 'WATCHING' });
  console.log(`${client.user.tag} ${client.user.avatarURL()}`);
  console.log(`Is this a bot? ${client.user.bot}`);
});

console.log('running ❤️');

client.login(clientID);

// channel id: 778302184173076481

client.on('message', (msg) => {
  console.log(msg.content);

  // If the message is "what is my avatar"
  if (msg.content === 'what is my avatar') {
    // Send the user's avatar URL
    msg.reply(msg.author.displayAvatarURL());
  }

  if (
    msg.channel.id == '778302184173076481' &&
    msg.content.toLowerCase().includes('joke')
  ) {
    console.log('Joke request 🍭');
    const indx = Math.floor(Math.random() * Jokes.length);
    msg.channel.send(`🦹 ${Jokes[indx].joke}`);
  }
});

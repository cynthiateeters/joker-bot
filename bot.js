const dotenv = require('dotenv');
const Discord = require('discord.js');

const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = '^';

dotenv.config();
const botToken = process.env.DISCORD_BOT_TOKEN;

/* canvas */

/* on ready */
client.on('ready', () => {
  client.user.setActivity(`and Laughing 🌟`, { type: 'PLAYING' });
  console.log(`[Who am I?]: ${client.user.tag}`);
  console.log(`[Am I a bot?]: ${client.user.bot}`);
});

console.log(`[Application start]: Running ❤️`);

client.login(botToken);

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  //const command = require(join(_dirname, 'commands', `${file}`));
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

client.on('error', console.error);

// channel id: 778302184173076481
// IDMX channel id : 814500314362282044
// 814500314362282044

client.on('message', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;
  if (message.channel.type === 'dm') return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (client.commands.has(command)) {
    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(`[message content]: ${message.content}`);

  if (message.member.displayName === '!Sebastian') {
    message.reply(
      `${message.member.displayName} is my best friend!🤗 He helps me with my jokes.`
    );
  }
});

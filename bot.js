const Jokes = require('./jokes.json');
const Canvas = require('canvas');
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
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

// channel id: 778302184173076481
// IDMX channel id : 814500314362282044 
// 814500314362282044

client.on('message', async (message) => {

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  /* canvas */
  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('./bkg.jpg');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  // Select the color of the stroke
  ctx.strokeStyle = '#f2f2f2';
  ctx.lineWidth = 16;

	// Draw a rectangle with the dimensions of the entire canvas
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  /* user name start */
  
  // Select the font size and type from one of the natively available fonts
	ctx.font = '60px sans-serif';
	// Select the style that will be used to fill the text in
	ctx.fillStyle = '#111111';
	// Actually fill the text with a solid color
  const text = `Hello\n${message.member.displayName}`;
	ctx.fillText(text, canvas.width / 2.5, canvas.height / 1.8);
  
  /* user name end */

  /* circle start */
  	// Pick up the pen
	ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
  ctx.clip();
  /*  circle end */
  
  	// Wait for Canvas to load the image
	const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
	// Draw a shape onto the main canvas
	ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'example.png');

  console.log(`[message content]: ${message.content}`);

  // If the message is "what is my avatar"
  if (message.content.toLowerCase().includes('avatar')) {
    // Send the user's avatar URL
    message.reply(message.author.displayAvatarURL());
    // message.channel.send(`I don't know. Why do you ask?`);
  }

  if (message.member.displayName === '!Sebastian') {
    message.reply(`${message.member.displayName} is my best friend!🤗 He helps me with my jokes.`);
  }

    // If the message is "hello"
    if (message.content.toLowerCase().includes('hello')) {
      // Send the user's avatar URL
      //message.reply(message.author.displayAvatarURL());

      message.channel.send(``, attachment);
      //message.member.displayName 
    }

  if (
    message.channel.id == '814500314362282044' &&
    message.content.toLowerCase().includes('joke')
  ) {
    console.log('Joke request 🍭');
    const indx = Math.floor(Math.random() * Jokes.length);
    message.channel.send(`🦹 ${Jokes[indx].joke}`);
  }
});

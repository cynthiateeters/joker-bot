const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
  name: 'canvas',
  description: 'test canvas',
  async run(client, message, args) {
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
    const avatar = await Canvas.loadImage(
      message.member.user.displayAvatarURL({ format: 'jpg' })
    );
    // Draw a shape onto the main canvas
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      'example.png'
    );
    message.channel.send(``, attachment);
    //message.member.displayName
  },
};

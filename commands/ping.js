const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Ping!',
  async run(client, message, args) {
    const ping = new Discord.MessageEmbed().setDescription(
      `🏓 response time: ${Date.now() - message.createdTimestamp}ms`
    );
    message.channel.send(ping);
  },
};

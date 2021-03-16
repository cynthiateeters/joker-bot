const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'return avatar image of sender',
  async run(client, message, args) {
    message.reply(message.author.displayAvatarURL());
  },
};

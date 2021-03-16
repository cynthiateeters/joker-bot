const Discord = require('discord.js');
const Jokes = require('../jokes.json');

module.exports = {
  name: 'joke',
  description: 'return joke to sender',
  async run(client, message, args) {
    console.log('Joke request 🍭');
    const indx = Math.floor(Math.random() * Jokes.length);
    message.channel.send(`
    
    **Joker Bot says:**
    \`\`\`css

   
    ${Jokes[indx].joke}
    
    \`\`\`
    hahahahaha😂🔥🤣✨😆!!!`);
  },
};

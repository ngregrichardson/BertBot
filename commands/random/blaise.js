const DadJokes = require('dadjokes-wrapper');
const dj = new DadJokes();
const commando = require('discord.js-commando');
class Blaise extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'blaise',
      group: 'random',
      memberName: 'blaise',
      description: 'Tells a dad joke.',
      throttling: {
        usages: 1,
        duration: 60
      },
      args: [{
        key: 'term',
        prompt: 'What would you like the joke to be about?',
        type: 'string',
        default: ''
      }]
    });
  }
  async run(message, { term }) {
    if(message.channel.name == 'spam') {
      if(term) {
        dj.searchJoke({'term': term}).then(function(res) {
          if(res) {
            message.channel.send(res.results[Math.floor(Math.random() * res.results.length)].joke);
          }else {
            message.channel.send('Sorry, there are no jokes with that keyword');
          }
        });
      } else {
        dj.randomJoke().then(function(res) {
          message.channel.send(res);
        });
      }
    }
  }
}
module.exports = Blaise;

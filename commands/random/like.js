const DadJokes = require('dadjokes-wrapper');
const dj = new DadJokes();
const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class Like extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'like',
      group: 'random',
      memberName: 'like',
      description: 'Tells you how many likes you have',
      throttling: {
        usages: 1,
        duration: 60
      },
      args: [{
        key: 'term',
        prompt: 'Whether to show your like count or the top likes',
        type: 'string',
        default: ''
      }]
    });
  }
  async run(message, { term }) {
    if(config.blaiseWhitelistedChannelNames.includes(message.channel.name) || config.blaiseWhitelistedChannelNames.includes("allowAll")) {
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
module.exports = Like;

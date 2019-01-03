const commando = require('discord.js-commando');
const Discord = require('discord.js');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class Like extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'like',
      group: 'random',
      memberName: 'like',
      description: 'DIsplays the amount of likes',
      throttling: {
        usages: 1,
        duration: 30
      },
      args: [{
        key: 'term',
        prompt: 'The correct usage of `!like` is `!like **count|top**`',
        type: 'string',
        default: ''
      }]
    });
  }
  async run(message, { term }) {
    if(config.likeCounterOn) {
      fs.readFile('commands/random/likes.json', function(err, response) {
        if(err) {
          console.log(err);
        }
        var data = JSON.parse(response);
        var values = [];
        var top;
        if(term == 'top') {
          for(var member in data) {
            values.push({'name': member, 'likes': data[member]})
          }
          if(values.length < 5) {
            top = values.sort((a, b) => b.likes - a.likes).splice(0, values.length);
          }else {
            top = values.sort((a, b) => b.likes - a.likes).splice(0, 5);
          }
          let embed = new Discord.RichEmbed().setColor("#127ABD").setTitle(`**Top Likes**`);
          for(var i = 0; i < top.length; i++) {
            embed.addField(`**${i + 1}. ** ${top[i].name}: **${top[i].likes}** likes`, `------------------------`);
          }
          message.channel.send(embed);
        }else if(term == 'count') {
          if(data[message.author.username]) {
          message.author.send("You have " + data[message.author.username] + " likes!");
        }else {
          message.author.send("You do not have any likes yet.");
        }
        }else {
          message.channel.send('You must specify `count` or `top` for this command.');
        }
      });
    }
  }
}
module.exports = Like;

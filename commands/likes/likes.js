const commando = require('discord.js-commando');
const Discord = require('discord.js');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));

class Likes extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'likes',
      group: 'likes',
      memberName: 'likes',
      description: 'Tells you the amount of likes you have.',
      throttling: {
        usages: 1,
        duration: 30
      },
      args: [{
        key: 'top',
        prompt: 'Would you like to displaythe top 5 liked members?',
        type: 'string',
        default: ''
      }]
    });
  }
  async run(message, { top }) {
    fs.readFileSync('commands/likes/likes.json', function(err, response) {
      if(err) {
        console.log(err);
      }
      var data = JSON.parse(response);
      if(top == 'top') {
        for(var i = 0; i < Object.keys(data).length; i++) {
          console.log();
        }
        //let embed = new Discord.RichEmbed().setTimestamp(Date.now()).setColor("#127ABD").setTitle(`**Top Liked Users**`).setDescription(`**1. ** ${}\n\n**Meeting Plans:** ${meetings.meetings[i].description}`);
      }
      if(data[message.author.username]) {
        message.author.send("You have " + data[message.author.username] + " likes!");
      }else {
        message.author.send("You do not have any likes yet.");
      }
    });
  }
}
module.exports = Likes;

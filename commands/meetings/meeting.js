const commando = require('discord.js-commando');

/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));
var meetings = JSON.parse(fs.readFileSync('commands/meetings/meetings.json'));
const moment = require('moment');
const formatJSON = require('json-format');
const Discord = require('discord.js');

class Meeting extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'meeting',
      group: 'meetings',
      memberName: 'meeting',
      description: 'Manages meetings **R**',
      args: [{
        key: 'action',
        prompt: 'The correct usage of `!meeting` is `!meeting **add|remove** "description" day month time',
        type: 'string'
      },
      {
        key: 'description',
        prompt: 'The correct usage of `!meeting` is `!meeting add|remove "**description**" day month time',
        type: 'string',
        default: ''
      },
      {
        key: 'day',
        prompt: 'The correct usage of `!meeting` is `!meeting add|remove "description" **day** month time',
        type: 'string',
        default: ''
      },
      {
        key: 'month',
        prompt: 'The correct usage of `!meeting` is `!meeting add|remove "description" day **month** time',
        type: 'string',
        default: ''
      },
      {
        key: 'time',
        prompt: 'The correct usage of `!meeting` is `!meeting add|remove "description" day month **time**',
        type: 'string',
        default: ''
      }]
    });
  }
  hasPermission(message) {
    if(config.restrictedCommandRoles) return message.member.roles.some(r => config.restrictedCommandRoles.includes(r.name));
  }

  async run(message, { action, description, day, month, time }) {
    if(action == 'add') {
      if(!meetings.meetings) {
        fs.writeFile('commands/meetings/meetings.json', JSON.stringify({ "meetings": [] }), function(err) {
          fs.readFile('commands/meetings/meetings.json', function(err, data){
            meetings = data;
          });
        });
      }
      var date = moment([ moment().year(), moment().month(month).format('M') - 1, parseInt(day), parseInt(time.split(':')[0]), parseInt(time.split(':')[1])]).toObject();
      var remaining = moment(date).diff(moment(), 'days');
      date.description = description;
      meetings.meetings.push(date);
      message.channel.send('The meeting was added. The bot is now restarting.');
      fs.writeFileSync('commands/meetings/meetings.json', JSON.stringify(meetings));
      setTimeout(function() {
        process.exit();
      }, 2000);
    }else if(action == 'remove') {
      for(var i = 0; i < meetings.meetings.length; i++) {
       if(meetings.meetings[i].description == description || meetings.meetings[i].day == parseInt(day) && meetings.meetings[i].month == moment().month(month).format('M') - 1) {
         let embed = new Discord.RichEmbed().setTimestamp(Date.now()).setColor("#127ABD").setTitle(`Are you sure you want to remove this? (yes/no)`).setDescription(`**Upcoming meeting on:** ${moment(meetings.meetings[i]).format('dddd, MMMM Do, h:mm')}\n\n**Meeting Plans:** ${meetings.meetings[i].description}`);
         message.channel.send(embed);
         var collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 10000 });
         collector.on('collect', message => {
           if(message.content.toLowerCase() == "yes") {
             meetings.meetings.splice(i - 1, 1);
             fs.writeFileSync('commands/meetings/meetings.json', JSON.stringify(meetings));
             message.channel.send('The meeting was removed. The bot is now restarting.');
             setTimeout(function() {
               process.exit();
             }, 2000);
           }else if(message.content.toLowerCase() == "no") {
             message.channel.send('The removal process was aborted.');
             return;
           }else {
             message.channel.send('The correct usage is `yes|no`');
           }
         });
       }
      }
    }else {
      message.channel.send('The correct usage of `!meeting` is `!meeting **add|remove** "description" day month time');
    }
             
  }
}
module.exports = Meeting;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeFromArray(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}
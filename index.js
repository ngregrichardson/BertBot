/* Config */
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration.json'));
const ui = require('./server.js');
/* Google Packages */
const GoogleSpreadsheet = require('googleapis');
/* Discord Packages */
const Discord = require('discord.js');
const commando = require('discord.js-commando');
/* Trello Packages */
const Trello = require('trello-events');
const RapidAPI = require('rapidapi-connect');
/* Gmail Packages */
var imaps = require('imap-simple');
var sendEmail = require('gmail-send')({
  user: process.env.GFROM,
  pass: process.env.GP,
  to: process.env.GTO
});
var gConfig;
/* Discord Setup */
const bot = new commando.Client();
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('info', 'Info');
bot.registry.registerGroup('polls', 'Polls');
bot.registry.registerGroup('spam', 'Spam');
bot.registry.registerGroup('custom', 'Custom');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");
bot.login(process.env.TOKEN);
/* Google Setup */
//var doc = new GoogleSpreadsheet(process.env.GSHID);
var sheet;
/* Swear Bot Setup */
const profanities = JSON.parse(fs.readFileSync('swears.json'));
/* Trello Setup */
const conf = JSON.parse(fs.readFileSync('conf.json'));
const rapid = new RapidAPI(process.env.R1, process.env.R2);
let latestActivityId = fs.existsSync('.latestActivityID') ? fs.readFileSync('.latestActivityID') : 0
const events = new Trello({
  pollFrequency: parseInt(config.trelloPollInterval),
  minId: latestActivityId,
  start: false,
  trello: {
    boards: config.watchedTrelloBoardIds,
    key: process.env.KEY,
    token: process.env.TTOKEN
  }
});

/* Bot Setup */
bot.on('ready', () => {
  /* Trello Events Setup */
  if(config.trelloNotificationsOn) {
    let guild = bot.guilds.get(parseInt(config.discordServerId))
    let channel = bot.channels.get(parseInt(config.trelloNotificationChannelId))
    if (!guild) {
      console.log(`Server with ID "${parseInt(config.discordServerId)}" not found! I can't function without a valid server and channel.\nPlease add the correct server ID to your conf file, or if the conf data is correct, ensure I have proper access.\nYou may need to add me to your server using this link:\n    https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`)
      process.exit()
    } else if (!channel) {
      console.log(`Channel with ID "${parseInt(config.trelloNotificationChannelId)}" not found! I can't function without a valid channel.\nPlease add the correct channel ID to your conf file, or if the conf data is correct, ensure I have proper access.`)
      process.exit()
    } else if (!config.watchedTrelloBoardIds || config.watchedTrelloBoardIds.length < 1) {
      console.log(`No board IDs provided! Please add at least one to your conf file. Check the readme if you need help finding a board ID.`)
    }
    conf.guild = guild
    conf.channel = channel
    if (!config.contentString) config.contentString = ""
    if (!config.enabledTrelloNotifications) config.enabledTrelloNotifications = []
    if (!config.userIDs) config.userIDs = {}
    if (!conf.realNames) conf.realNames = true
    if (!config.trelloPrefix) {
      config.trelloPrefix = "!"
      fs.writeFileSync('conf.json', JSON.stringify(conf, null, 4), (err, data) => console.log(`Updated conf file with default prefix ('!')`))
    }
    console.log(`== Bot logged in as @${bot.user.tag}. Ready for action! ==`)
    events.start()
  }

  /* Gmail Reader */
  if(config.orderRequestEmailSystemOn) {
    gConfig = {
      imap: {
        user: process.env.GFROM,
        password: process.env.GP,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 3000
      }
    };
    setInterval(function() {
      imaps.connect(gConfig).then(function (connection) { // Connect to the email
        return connection.openBox('ARCHIVE').then(function () { // Open the inbox
          var searchCriteria = [ // Search the inbox for
            ['FROM', process.env.GTO], // Emails from
            'UNSEEN' // Unopened
          ];
          var fetchOptions = {
            bodies: ['HEADER', 'TEXT'], // Get the headers and text
            markSeen: true // Mark the email as read
          };
          return connection.search(searchCriteria, fetchOptions).then(function (results) { // When the search is done
            var subjects = results.map(function (res) { // Get the subjects
              return res.parts.filter(function (part) {
                return part.which === 'HEADER';
              })[0].body.subject[0];
            });
            for(var i = 0; i < subjects.length; i++) { // For each email
              if(!subjects[i].includes('#')) return; // If it doesn't include a #
              var id = subjects[i].substring(subjects[i].indexOf('#') + 1); // Get the ID
              rapid.call('Trello', 'getCardChecklists', { // Get the checklist from the card
                'apiKeys': process.env.KEY, // Auth
                'accessToken': process.env.TTOKEN, // Auth
                'cardIdOrShortlink': id // Card ID
              }).on('success', (payload)=>{ // When it gets the checklist
                if(payload == undefined) return;
                for(var j = 0; j < payload[0].checkItems.length; j++) { // For each item in the checklist
                  if(payload[0].checkItems[j].name == config.orderPlacedChecklistItemName) { // If the item is called 'Order Placed'
                    rapid.call('Trello', 'updateCardCheckItem', { // Update the checklist item
                      'apiKeys': process.env.KEY, // Auth
                      'accessToken': process.env.TTOKEN, // Auth
                      'cardIdOrShortlink': id, // Card ID
                      'idCheckItem': payload[0].checkItems[j].id, // Checklist item ID
                      'state': 'complete' // State to set to
                    }).on('success', (payload)=>{ // When it updates the checklist item
                      rapid.call('Trello', 'getBoardLists', { // Get the id of the list to move to
                        'apiKeys': process.env.KEY, // Auth
                        'accessToken': process.env.TTOKEN, // Auth
                        'boardId': config.orderRequestBoardId // Board ID
                      }).on('success', (payload)=>{ // When it gets the list of lists
                        var listId; // List ID
                        for(var k = 0; k < payload.length; k++) { // For each list
                          if(payload[k].name == config.orderPlacedListName) { // If it is the list
                            listId = payload[k].id; // Get the id
                            break; // Break out of the loop
                          }
                        }
                        rapid.call('Trello', 'updateSingleCard', { // Update the card list
                          'apiKeys': process.env.KEY, // Auth
                          'accessToken': process.env.TTOKEN, // Auth
                          'cardIdOrShortlink': id, // Card ID
                          'idList': listId // List ID
                        }).on('success', (payload)=>{ // When it moves the card
                          //console.log('Completed!'); // Confirmation
                        }).on('error', (payload)=>{ // If it couldn't move the card
                          console.log("Error moving card: " + payload); // Print the error
                        });
                      }).on('error', (payload)=>{
                        console.log("Error getting list: " + payload); // Print the error
                      });
                    }).on('error', (payload)=>{ // If it couldn't update the checklist
                      console.log("Error updating checklist: " + payload); // Print the error
                    });
                    break; // Break from the loop
                  }
                }
              }).on('error', (payload)=>{ // If it couldn't retrieve the checklist
                console.log("Error retrieving checklist: " + payload); // Print the error
              });
            }
          });
        });
      });
    }, 30000);
  }
});

/* Swear Filter */
bot.on('message', message => { // When a message is sent
  if(config.swearFilterOn) {
    // If the message is not in the spam chat, not in dms, and not from BertBot himself
    if(!config.swearFilterWhitelistedChannelNames.includes(message.channel.name) && message.author.id !== bot.user.id && message.channel.type !== 'dm') {
      for (var i = 0; i < profanities.length; i++) { // Run through each profane word
        for (var x = 0; x < message.content.split(" ").length; x++) { // Run through each word in the message, splitting at the spaces
          if (message.content.toLowerCase().split(" ")[x] == profanities[i].toLowerCase()) { // If any of the words match
            var time = new Date(); // Get the date and time
            message.guild.owner.send('**' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '** | **' + message.author.username + '** tried to say **'+ profanities[i] + '** in **' + message.channel.name + "** `" + message.content + "`"); // Send a message to the server owner
            message.author.send("Your message in **" + message.channel.name + "** was deleted because it contained **" + profanities[i] + "**. If this is a mistake, contact your server moderator. Otherwise, you might want to retry sending your message like this: `" + message.content.replace(profanities[i], "****") + "`"); // Send a message to the author
            message.delete(); // Delete the message
            return; // Move on
          }
        }
      }
    }
  }
});


/* In progress like tracker */

// bot.on('messageReactionAdd', function(messageReaction, user) {
//   if(messageReaction._emoji.name == '👍') {
//     function setAuth(step) {
//       var creds = {
//         client_email: process.env.SAE,
//         private_key: process.env.GPK
//       };
//       //doc.useServiceAccountAuth(creds, step);
//     }
//   }
// });

// function checkForLikes(message) {
//   for(var i = 0; i < message.reactions.length; i++) {
//     if(message.reactions[i].emoji.id == '490900369811963914') {
//       // TODO: Google sheets stuff here
//     }
//   }
// }

/*
** ====================================
** Trello event handlers and functions.
** ====================================
*/

// Fired when a card is created
events.on('createCard', (event, board) => {
  if (!eventEnabled(`cardCreated`)) return
  let embed = getEmbedBase(event)
    .setTitle(`New card created under __${event.data.list.name}__!`)
    .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card created under __${event.data.list.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
  send(addDiscordUserData(embed, event.memberCreator))
})
// Fired when a card is updated (description, due date, position, associated list, name, and archive status)
events.on('updateCard', (event, board) => {
  let embed = getEmbedBase(event)
  if (event.data.old.hasOwnProperty("desc")) {
    if (!eventEnabled(`cardDescriptionChanged`)) return
    embed
      .setTitle(`Card description changed!`)
      .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card description changed (see below) by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      .addField(`New Description`, typeof event.data.card.desc === "string" && event.data.card.desc.trim().length > 0 ? (event.data.card.desc.length > 1024 ? `${event.data.card.desc.trim().slice(0, 1020)}...` : event.data.card.desc) : `*[No description]*`)
      .addField(`Old Description`, typeof event.data.old.desc === "string" && event.data.old.desc.trim().length > 0 ? (event.data.old.desc.length > 1024 ? `${event.data.old.desc.trim().slice(0, 1020)}...` : event.data.old.desc) : `*[No description]*`)
    send(addDiscordUserData(embed, event.memberCreator))
  } else if (event.data.old.hasOwnProperty("due")) {
    if (!eventEnabled(`cardDueDateChanged`)) return
    embed
      .setTitle(`Card due date changed!`)
      .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card due date changed to __${event.data.card.due ? new Date(event.data.card.due).toUTCString() : `[No due date]`}__ from __${event.data.old.due ? new Date(event.data.old.due).toUTCString() : `[No due date]`}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
  } else if (event.data.old.hasOwnProperty("pos")) {
    if (!eventEnabled(`cardPositionChanged`)) return
    embed
      .setTitle(`Card position changed!`)
      .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card position in list __${event.data.list.name}__ changed by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
  } else if (event.data.old.hasOwnProperty("idList")) {
    if (!eventEnabled(`cardListChanged`)) return
    embed
      .setTitle(`Card list changed!`)
      .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card moved to list __${event.data.listAfter.name}__ from list __${event.data.listBefore.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
  } else if (event.data.old.hasOwnProperty("name")) {
    if (!eventEnabled(`cardNameChanged`)) return
    embed
      .setTitle(`Card name changed!`)
      .setDescription(`**CARD:** *[See below for card name]* — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card name changed (see below) by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      .addField(`New Name`, event.data.card.name)
      .addField(`Old Name`, event.data.old.name)
    send(addDiscordUserData(embed, event.memberCreator))
  } else if (event.data.old.hasOwnProperty("closed")) {
    if (event.data.old.closed) {
      if (!eventEnabled(`cardUnarchived`)) return
      embed
        .setTitle(`Card unarchived!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card unarchived and returned to list __${event.data.list.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      send(addDiscordUserData(embed, event.memberCreator))
    } else {
      if (!eventEnabled(`cardArchived`)) return
      embed
        .setTitle(`Card archived!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card under list __${event.data.list.name}__ archived by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      send(addDiscordUserData(embed, event.memberCreator))
    }
  }
})
// Fired when a card is deleted
events.on('deleteCard', (event, board) => {
  if (!eventEnabled(`cardDeleted`)) return
  let embed = getEmbedBase(event)
    .setTitle(`Card deleted!`)
    .setDescription(`**EVENT:** Card deleted from list __${event.data.list.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
  send(addDiscordUserData(embed, event.memberCreator))
})
// Fired when a comment is posted, or edited
events.on('commentCard', (event, board) => {
  let embed = getEmbedBase(event)
  if (event.data.hasOwnProperty("textData")) {
    if (!eventEnabled(`commentEdited`)) return
    embed
      .setTitle(`Comment edited on card!`)
      .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card comment edited (see below for comment text) by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      .addField(`Comment Text`, event.data.text.length > 1024 ? `${event.data.text.trim().slice(0, 1020)}...` : event.data.text)
      .setTimestamp(event.data.dateLastEdited)
    send(addDiscordUserData(embed, event.memberCreator))
  } else {
    if (!eventEnabled(`commentAdded`)) return
    embed
      .setTitle(`Comment added to card!`)
      .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card comment added (see below for comment text) by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      .addField(`Comment Text`, event.data.text.length > 1024 ? `${event.data.text.trim().slice(0, 1020)}...` : event.data.text)
    send(addDiscordUserData(embed, event.memberCreator))
  }
})
// Fired when a member is added to a card
events.on('addMemberToCard', (event, board) => {
  let embed = getEmbedBase(event)
  .setTitle(`Member added to card!`)
  .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Member **[${conf.realNames ? event.member.fullName : event.member.username}](https://trello.com/${event.member.username})**`)
  let editedEmbed = addDiscordUserData(embed, event.member)
  if (event.member.id === event.memberCreator.id) {
    if (!eventEnabled(`memberAddedToCardBySelf`)) return
    editedEmbed.setDescription(editedEmbed.description + ` added themselves to card.`)
    send(editedEmbed)
  } else {
    if (!eventEnabled(`memberAddedToCard`)) return
    editedEmbed.setDescription(editedEmbed.description + ` added to card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(editedEmbed, event.memberCreator))
  }
})
// Fired when a member is removed from a card
events.on('removeMemberFromCard', (event, board) => {
  let embed = getEmbedBase(event)
  .setTitle(`Member removed from card!`)
  .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Member **[${conf.realNames ? event.member.fullName : event.member.username}](https://trello.com/${event.member.username})**`)
  let editedEmbed = addDiscordUserData(embed, event.member)
  if (event.member.id === event.memberCreator.id) {
    if (!eventEnabled(`memberRemovedFromCardBySelf`)) return
    editedEmbed.setDescription(editedEmbed.description + ` removed themselves from card.`)
    send(editedEmbed)
  } else {
    if (!eventEnabled(`memberRemovedFromCard`)) return
    editedEmbed.setDescription(editedEmbed.description + ` removed from card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(editedEmbed, event.memberCreator))
  }
})
// Fired when a list is created
events.on('createList', (event, board) => {
  if (!eventEnabled(`listCreated`)) return
  let embed = getEmbedBase(event)
    .setTitle(`New list created!`)
    .setDescription(`**EVENT:** List __${event.data.list.name}__ created by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
  send(addDiscordUserData(embed, event.memberCreator))
})
// Fired when a list is renamed, moved, archived, or unarchived
events.on('updateList', (event, board) => {
  let embed = getEmbedBase(event)
  if (event.data.old.hasOwnProperty("name")) {
    if (!eventEnabled(`listNameChanged`)) return
    embed
      .setTitle(`List name changed!`)
      .setDescription(`**EVENT:** List renamed to __${event.data.list.name}__ from __${event.data.old.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
  } else if (event.data.old.hasOwnProperty("pos")) {
    if (!eventEnabled(`listPositionChanged`)) return
    embed
      .setTitle(`List position changed!`)
      .setDescription(`**EVENT:** List __${event.data.list.name}__ position changed by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
  } else if (event.data.old.hasOwnProperty("closed")) {
    if (event.data.old.closed) {
      if (!eventEnabled(`listUnarchived`)) return
      embed
        .setTitle(`List unarchived!`)
        .setDescription(`**EVENT:** List __${event.data.list.name}__ unarchived by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      send(addDiscordUserData(embed, event.memberCreator))
    } else {
      if (!eventEnabled(`listArchived`)) return
      embed
        .setTitle(`List archived!`)
        .setDescription(`**EVENT:** List __${event.data.list.name}__ archived by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      send(addDiscordUserData(embed, event.memberCreator))
    }
  }
})
// Fired when an attachment is added to a card
events.on('addAttachmentToCard', (event, board) => {
  if(config.orderRequestEmailSystemOn) {
    if(event.data.list.name == config.orderRequestedListName) { // If the attachment is in the 'Orders Requested' list
      if(event.data.attachment != undefined) { // If the attachment exists
        sendEmail({ // Send an email
          subject: 'New order form from ' + event.memberCreator.fullName + '! #' + event.data.card.id, // Create the subject line
          html: '<a href="' + event.data.attachment.url + '" style="text-decoration:none;color:black;font-size:200%;">Here is the form!</a><br><p>Reply "Order Completed" to mark complete on the Trello</p>' // Create the email
        }, function (err, res) { // Callback
          if(err) { // If there is an error
            console.log("Error sending email: " + err); // Print the error
          }
        });
      }
    }
  }
  if (!eventEnabled(`attachmentAddedToCard`)) return
  let embed = getEmbedBase(event)
    .setTitle(`Attachment added to card!`)
    .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Attachment named \`${event.data.attachment.name}\` added to card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
  send(addDiscordUserData(embed, event.memberCreator))
})
// Fired when an attachment is removed from a card
events.on('deleteAttachmentFromCard', (event, board) => {
  if (!eventEnabled(`attachmentRemovedFromCard`)) return
  let embed = getEmbedBase(event)
    .setTitle(`Attachment removed from card!`)
    .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Attachment named \`${event.data.attachment.name}\` removed from card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
  send(addDiscordUserData(embed, event.memberCreator))
})
// Fired when a checklist is added to a card (same thing as created)
events.on('addChecklistToCard', (event, board) => {
  if (!eventEnabled(`checklistAddedToCard`)) return
  let embed = getEmbedBase(event)
    .setTitle(`Checklist added to card!`)
    .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist named \`${event.data.checklist.name}\` added to card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
  send(addDiscordUserData(embed, event.memberCreator))
})
// Fired when a checklist is removed from a card (same thing as deleted)
events.on('removeChecklistFromCard', (event, board) => {
  if (!eventEnabled(`checklistRemovedFromCard`)) return
  let embed = getEmbedBase(event)
    .setTitle(`Checklist removed from card!`)
    .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist named \`${event.data.checklist.name}\` removed from card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
  send(addDiscordUserData(embed, event.memberCreator))
})
// Fired when a checklist item's completion status is toggled
events.on('updateCheckItemStateOnCard', (event, board) => {
  if (event.data.checkItem.state === "complete") {
    if (!eventEnabled(`checklistItemMarkedComplete`)) return
    let embed = getEmbedBase(event)
      .setTitle(`Checklist item marked complete!`)
      .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist item under checklist \`${event.data.checklist.name}\` marked complete by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      .addField(`Checklist Item Name`, event.data.checkItem.name.length > 1024 ? `${event.data.checkItem.name.trim().slice(0, 1020)}...` : event.data.checkItem.name)
    send(addDiscordUserData(embed, event.memberCreator))
  } else if (event.data.checkItem.state === "incomplete") {
    if (!eventEnabled(`checklistItemMarkedIncomplete`)) return
    let embed = getEmbedBase(event)
      .setTitle(`Checklist item marked incomplete!`)
      .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist item under checklist \`${event.data.checklist.name}\` marked incomplete by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
      .addField(`Checklist Item Name`, event.data.checkItem.name.length > 1024 ? `${event.data.checkItem.name.trim().slice(0, 1020)}...` : event.data.checkItem.name)
    send(addDiscordUserData(embed, event.memberCreator))
  }
})

/*
** =======================
** Miscellaneous functions
** =======================
*/
events.on('maxId', (id) => {
  if (latestActivityId == id) return
  latestActivityId = id
  fs.writeFileSync('.latestActivityID', id)
})
const send = (embed, content = ``) => conf.channel.send(`${content} ${config.contentString}`, {embed:embed}).catch(err => console.error(err))
const eventEnabled = (type) => config.enabledTrelloNotifications.length > 0 ? config.enabledTrelloNotifications.includes(type) : true
const logEventFire = (event) => console.log(`${new Date(event.date).toUTCString()} - ${event.type} fired`)
const getEmbedBase = (event) => new Discord.RichEmbed()
.setFooter(`${conf.guild.members.get(bot.user.id).displayName} • ${event.data.board.name} [${event.data.board.shortLink}]`, bot.user.displayAvatarURL)
.setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
.setColor("#127ABD")
// adds thumbanail and appends user mention to the end of the description, if possible
const addDiscordUserData = (embed, member) => {
  if (config.userIDs[member.username]) {
    let discordUser = conf.guild.members.get(config.userIDs[member.username])
    if (discordUser) embed
      .setThumbnail(discordUser.user.displayAvatarURL)
      .setDescription(`${embed.description} / ${discordUser.toString()}`)
  }
  return embed
}
/* Ping */

//  cs(glitch): if I understand your question, you want to render the web page linked in server.js when someone loads https://discreet-quokka.glitch.me/, correct?

// yes exactly

//  cs: ok you can accomplish that by requiring server.js anywhere in this file, but you won't be able to both app.get() below 
//    *and* serving the static file from server.js at the same route
//  cs: *but* you don't need both. if you serve your static html file at "/" your keepalive ping will keep working
//  cs:  so you can get rid of all of the app stuff below oncve you include server.js. Howeber the path to the static file is incorrect in there, 
//    so that won't work until that's fixed. (notes over there) ha, nm, already fixed.
//  cs:   ok good luck!

//I think im on the same page, thank you!!
const http = require('http');
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

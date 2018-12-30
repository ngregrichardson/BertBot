# Welcome to BeʳᵗBot
BeʳᵗBot was created for FRC team 4750 to use in their Discord server. The bot features a variety of commands and tools and is self hosted and open-source, so feel free to make any changes you would like!
# Features
### Swear Filter
- Immediately and silenty removes any message containing a profanity
- Notifies the author of why their message was removed, allows them to resend without the profanity
- Notifies the server owner of the time, author, and profanity that was removed
- Includes the ability to customize blocked words and whitelist channels from the filter
### Trello Notifications
- Links Trello boards with a Discord channel to send notifications when an event happens on the board
- Able to select which boards to watch as well as customize the types of events that will send notifications
### Order Request System
- Links with Trello and Gmail to send a mentor a notification when an order request form is uploaded to Trello
- Once the order has been placed by the mentor, they can simply reply and it will move the card from the *Orders Requested* to *Orders Placed* list and check off the ckeclist item for *Order Placed*.
# Commands
### Kickoff
- Displays the amount of time until kickoff  
Use: `!kickoff`
### Poll
- Creates a yes/no/maybe poll in the channel  
Use: `!poll [question]`
### Strawpoll
- Creates a strawpoll and sends the link in the channel  
Use: `!strawpoll ["title"] ["option 1"] ["option 2"]...`
- Use quotation marks around the title and each option
### Blaise
- Sends a random dad joke in the channel  
Use: `!blaise`
### PID
- Calculates totally definitely correct PID values in the channel  
Use: `!pid`
### Winner
- Accurately predicts the winners of the upcoming FRC season  
Use: `!winner`
### Spam
- *not currently useable unless you have a channel and role named spam*
- Adds or removes a user from the spam chat  
Use: `!spam [add/remove] #[DiscordTag]`
# Setup
Setting up BeʳᵗBot is simple. It is a self-hosted bot, so this setup will show you how to create the bot and how to set it up on Glitch. Let's get started!
 1. Let's create a Discord application [here](https://discordapp.com/developers/applications/). The name and app icon can be anything you want.
 2. Go to the **Bot** tab on the left and hit *Add Bot* and then *Yes, do it!*. Again, the name and app icon can be anything you want. These will be what the bot user's name and avatar will be. The token that is generated will be needed later, so copy it or keep the tab open (but don't give it out!).
 3. Next, lets set up the bot on [Glitch](https://glitch.com). Create an account and then create a new *hello-express* project. In the top left, click on the name of your project (you can rename it if you want) and select *Advanced Options*. Then, after hitting *Grant access*, click *Import from GitHub* and paste in `ngregrichardson/BertBot`. This will import the project into Glitch.
 4. Next we can configure the bot to your needs. In *configuration.json*, there are a list of variables that you need to look over. You can decide which you need to change based on the following descriptions:
	- botName - The name of your bot as you set in the Discord application
	- teamNumber - The team number of your FRC team
	- discordServerId - The ID of your Discord server. Enable developer mode in Discord and right click on the server name to retrieve.
	- trelloNotificationsOn - Whether or not you want notifications from Trello boards in a channel enabled
		- trelloNotificationChannelId - The ID of the channel you want notifications in
		- trelloPollInterval - The amount of milliseconds between checks for new Trello updates (changing not recommended)
		- watchedTrelloBoardIds - The board IDs of the Trello boards you want to get notifications from. These are found in the link of the Trello board
		- enabledTrelloNotifications - The types of notifications you want (full list below)
		- trelloPrefix - Prefix for any Trello related commands (currently none)
	- orderRequestEmailSystemOn - Whether or not you want the order request system enabled
		- orderRequestBoardId - The Trello board ID of the *Order Request* board
		- orderPlacedChecklistItemName - The name of the checklist item that says whether or not the order has been placed
		- orderPlacedListName - The name of the list that has the placed orders
		- orderRequestedListName - The name of the list that has the requested orders
	- swearFilterOn - Whether or not the swear filter should be enabled
		- swearFilterWhitelistedChannelNames - The names of the channels that will not be affected by the swear filter
	- blaiseWhitelistedChannelNames - The names of the channels that allow the !blaise command (setting this to allowAll will allow it in all channels)
	- restrictedCommandRoles - The names of the roles that are able to use restricted commands
	- userIDs - The Trello name linked to the Discord ID of the person for use in Trello notifications
	- contentString - For use in Trello notifications, leave blank
5. Alright! now we're done the tedious part! The next thing we have to set up is out *.env* file. This is where all of our tokens and passwords will be kept. Copy and paste this in *.env* to get started, and I will explain what everything means below.
> TOKEN=  
> KEY=  
> TTOKEN=  
> GP=  
> GFROM=  
> GTO=  
> R1=  
> R2=  

- TOKEN - The token of your Discord bot (from step 2)
- KEY - [A Trello API key](https://developers.trello.com/docs/api-introduction)
- TTOKEN - [A Trello token](https://trello.com/app-key)
- GP - [A Google app password](https://myaccount.google.com/apppasswords) (only needed if using the order request system
- GFROM - Gmail address to send order request notification from
- GTO - Email address to send order request notification to
- R1 - [Rapid API project name](https://dashboard.rapidapi.com) (create a Rapid API account and create an app)
- R2 - [Rapid API API key](https://dashboard.rapidapi.com) (create a Rapid API account and create an app)
6. Alright! You're finally ready to add the bot to your server. Go ahead back to your Discord application and go to the **OAuth2** tab. Here, scroll down to *scopes* and select *bot*.  Then scroll down some more and select *Administrator*. Now you can follow the generated link and follow it to add the bot to your server!

## enabledTrelloNotifications List
- createCard - Triggered when a card is created
- updateCard - Triggered when anything on the card is changed
- deleteCard - Triggered when a card is deleted
- commentCard - Triggered when a comment is added or edited on a card
- addMemberToCard - Triggered when a member is added to a card
- removeMemberFromCard - Triggered when a member is removed from a card
- createList - Triggered when a list is created
- updateList - Triggered when a list is changed
- addAttachmentToCard - Triggered when an attachment is added to a card
- deleteAttachmentFromCard - Triggered when an attachment is deleted from a card
- addChecklistToCard - Triggered when a checklist is added to a card
- removeChecklistFromCard - Triggered when a checklist is removed from a card
- updateCheckItemStateOnCard - Triggered when a checklist item is checked or unchecked

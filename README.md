
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
### Meeting Notifications
- Notifies team of a meeting a day before
- Able to have multiple meetings with different days, times, and descriptions
### Order Request System
- Links with Trello and Gmail to send a mentor a notification when an order request form is uploaded to Trello
- Once the order has been placed by the mentor, they can simply reply and it will move the card from the *Orders Requested* to *Orders Placed* list and check off the ckeclist item for *Order Placed*.
### Like Tracker
- Monitors who has the most 👍 reactions on their messages
- Can be used for prizes and engagement
# Commands
### Kickoff
- Displays the amount of time until kickoff  
Use: `!kickoff`
### Poll
- Creates a yes/no/maybe poll in the channel **R**
Use: `!poll [question]`
### Strawpoll 
- Creates a strawpoll and displays it in the channel **R**
Use: `!strawpoll ["title"] ["option 1"] ["option 2"]...`
- Use quotation marks around the title and each option
### Blaise
- Displays a random dad joke in the channel  
Use: `!blaise [search term](optional)`
### PID
- Displays 100% correct calculated PID values
Use: `!pid`
### Winner
- Displays the guaranteed winners of the next FRC season
Use: `!winner`
### Spam 
- *not currently useable unless you have a channel and role named spam*
- Manages the spam chat **R**
Use: `!spam [add|remove] #[DiscordTag]`
### Command
- Add or remove custom commands **R**
Use: `!command [add|remove] [name] ["description"] ["response"]`
- Javascript can be injected if the response begins with `");` and ends with `console.log("`
### Meeting
- Add or remove meetings **R**
Use: `!meeting [add|remove] ["description"] [day] [month] [time]`
- To remove a meeting, either use just the description or (to be more specific) the description, day, and month
### Like
- Displays the author's amount of likes or the top 5 users
Use: `!like count|top`
# Setup
Setting up BeʳᵗBot is simple. It is a self-hosted bot, so this setup will show you how to create the bot and how to set it up on Glitch. Let's get started!
 1. Let's create a Discord application [here](https://discordapp.com/developers/applications/). The name and app icon can be anything you want.
 ![Step 1](https://i.imgur.com/022TUwH.jpg)
 2. Go to the **Bot** tab on the left and hit *Add Bot* and then *Yes, do it!*. Again, the name and app icon can be anything you want. These will be what the bot user's name and avatar will be. The token that is generated will be needed later, so copy it or keep the tab open (but don't give it out!).
 ![Step 2](https://i.imgur.com/vE1RAbK.jpg)
 3. Next, lets set up the bot on [Glitch](https://glitch.com). Create an account and then create a new *hello-express* project. In the top left, click on the name of your project (you can rename it if you want) and select *Advanced Options*. Then, after hitting *Grant access*, click *Import from GitHub* and paste in `ngregrichardson/BertBot`. This will import the project into Glitch.
 ![Step 3](https://i.imgur.com/w6CfsDL.jpg)
 4. Next we can configure the bot to your needs. Click on *Show* and select whatever features you'd like. The required features are highlighted in **red**.
 ![Step 4](https://i.imgur.com/kHl20EQ.jpg)
	- Bot Name - The name of your bot as you set in the Discord application
	- Team Number - The team number of your FRC team
	- Discord Server ID- The ID of your Discord server. Enable developer mode in Discord and right click on the server name to retrieve.
	- Enable Trello Notifications? - Whether or not you want notifications from Trello boards in a channel enabled
		- Trello Notification Channel ID - The ID of the channel you want Trello notifications in
		- Trello Poll Interval- The amount of milliseconds between checks for new Trello updates (changing not recommended)
		- Watched Trello Board IDs - The board IDs of the Trello boards you want to get notifications from. These are found in the link of the Trello board
		- Trello Prefix - Prefix for any Trello related commands
		- Enabled Trello Notifications - The types of notifications you want from Trello
	- Enable Order Request System? - Whether or not you want the order request system enabled
		- Order Request Board ID - The Trello board ID of the *Order Request* board
		- Order Placed Checklist Item Name - The name of the checklist item that says whether or not the order has been placed
		- Order Placed List Name - The name of the list that has the placed orders
		- Order Requested List Name - The name of the list that has the requested orders
	- Enable Swear Filter? - Whether or not you want the swear filter enabled
		- Swear Filter Whitelisted Channel Names - The names of the channels that will not be affected by the swear filter
	- Enable Meeting Notifications? - Whether or not you want the meeting notifications enabled
		- Meeting Notifications Channel ID - The ID of the channel you want meeting notifications in
	- Enable Like Tracker? - Whether or not you want the like tracker enabled
	- Blaise Whitelisted Channel Names - The names of the channels that allow the !blaise command (setting this to allowAll will allow it in all channels)
	- Restricted Command Roles - The names of the roles that are able to use restricted commands
Once you are done, make sure to hit *Save* and then once the page reloads, hit *Restart Bot* (don't mind the error page :P). You can now close that window.
5. Alright! The next thing we have to set up is out *.env* file. This is where all of our tokens and passwords will be kept. Copy and paste this into *.env* to get started.
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
- R2 - [Rapid API API key](https://dashboard.rapidapi.com) (found with the Rapid API project name)
6. Alright! You're finally ready to add the bot to your server. Go ahead back to your Discord application and go to the **OAuth2** tab. Here, scroll down to *Scopes* and select *bot*.  Then scroll down some more and select *Administrator*. Now you can follow the generated link and follow it to add the bot to your server!
![Step 6](https://i.imgur.com/ZdImqIO.jpg)
7. Now your bot is all set up! In order for it to stay running 24/7, make sure to set up [UptimeRobot](https://uptimerobot.com) as described [here](https://support.glitch.com/t/how-to-make-a-glitch-project-to-run-constantly/2439/2?u=ngregrichardson). To change any settings, go back to BeʳᵗBot's Configuration page and change whatever you want! Just be sure to hit *Save* and *Restart Bot* when you're done. If you need any help, are getting any errors, or want to chat about the development of the bot, join the BeʳᵗBot Discord from the Configuration page.
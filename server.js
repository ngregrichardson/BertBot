
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/config', function(request, response) {
  response.sendFile(__dirname + '/configuration.json');
});

app.get('/settings', function(request, response) {
  response.sendFile(__dirname + '/settings.js');
});

app.get('/styles', function(request, response) {
  response.sendFile(__dirname + '/styles.css');
});

app.post("/save", function (request, response) {
  console.log(request.body);
  
  // fs.writeFile('configuration.json', data, function(err) {
  //   if(err) {
  //    console.log(err); 
  //   }
  //   response.redirect("/");
  // });
  // try {
  //   var posts = datastore.get("posts");
  //   // We get the contents of the submitted form and append it to the posts array
  //   posts.push(request.body); // the form data is in request.body because we're using the body-parser library to help make dealing with requests easier
  //   // We store the updated posts array back in our database posts entry
  //   datastore.set("posts", posts);
  //   // And then we redirect the view back to the homepage
  //   response.redirect("/");
  // } catch (err) {
  //   console.log(err);
  // }
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

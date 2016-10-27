var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var VALIDATION_TOKEN = "smitten";

//page access token:
//EAAQB2wXR6IUBALGsBhM7D8roFZAkct2LNC80QhPBfRKqHQ34aPQGcMZAHflN77Ysoxl8HWAWvOSqSEnRd4K5kfa55XBaGoxzRCbn51wUJFfITAK7CQOuOWaAOG2tGYDwoeZBCt9ODn4eBRftsHE0GhgnYrcc0vNf7eSnaNKVAZDZD

app.use(bodyParser.json());//middleware

app.get('/', function(req, res){
  res.end("this is the home page");
});

app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      console.log(pageEntry.messaging);
      // Iterate over each messaging event
            pageEntry.messaging.forEach(function(messagingEvent) {
              if (messagingEvent.message) {
                if (detectAnger (messagingEvent.message.text) ) {
                  console.log("received angry message!!");
              }
              } else {
                console.log("We've received a message from a disatisfied person.");
                console.log(messagingEvent);
                //here we can send an email or sms
              }
            });
          });

          // Assume all went well.
          //
          // You must send back a 200, within 20 seconds, to let us know you've
          // successfully received the callback. Otherwise, the request will time out.
          res.sendStatus(200);
        }
      });

// VERIFIATION ROUTE
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running");
});

function detectAnger(str){
  str = str.toLowerCase();
  if(str.indexOf("crap") >= 0 || str.indexOf("disgusting") >= 0 ||str.indexOf("garbage") >= 0){
    return true;
  }
  else {
    return false;
  }
}

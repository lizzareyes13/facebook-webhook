var express = require('express');
var app = express();
var express = require("body-parser");

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.end("this is the home page");
});

app.post("/webhook", function(req, res){
  console.log(req);
  res.status(200).send("ok");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running");
});

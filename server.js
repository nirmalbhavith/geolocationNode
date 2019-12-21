var express = require("express");
var bodyParser = require("body-parser"); // Allows the form data into the application

const axios = require("axios"); // http client used to call third party services over end point

const CircularJSON = require("circular-json"); // JSON-Format

var app = express();

app.set("view engine", "ejs"); // set the template engine in Express

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/nearby/location/search", function(req, res) {
  let api_key = ""; // palce the API_key

  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.lat},${req.body.long}&radius=${req.body.radius}&keyword=${req.body.customer_name}&language=${req.body.lang}&key=${api_key}`
    )
    .then(response => {
      let json = CircularJSON.stringify(response);
      res.send(json);
      res.end();
    })
    .catch(error => {
      console.error(error);
    });
});

var server = app.listen(4300, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);
});

module.exports = server;

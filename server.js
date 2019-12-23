var express = require("express");

var bodyParser = require("body-parser");

const axios = require("axios");

const CircularJSON = require("circular-json");

require("dotenv").config();

var app = express();

const api_key = process.env.GOOGLE_API_KEY;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/nearby/location/search", function(req, res) {
  // console.log(
  //   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.lat},${req.body.long}&radius=${req.body.radius}&keyword=${req.body.customer_name}&language=${req.body.lang}&key=${api_key}`
  // );

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

var server = app.listen(process.env.PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);
});

module.exports = server;

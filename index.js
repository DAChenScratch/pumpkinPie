const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const app = express();
const main = require("./main");

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set("port", process.env.PORT || 9001);

app.enable("verbose errors");

app.use(logger("dev"));
app.use(bodyParser.json());
//app.use(poweredByHandler);
// serve static log files at /logs
app.use("/logs", express.static(__dirname + '/logs'));

// Used for checking if this snake is still alive.
// Signals start of a new game
app.get("/", (req, res) =>{
  const blue = "#3b94e3";
  const pink = "#cc4ff1";
  const green = "#2be384";
  const green2 = "#02B07C";
  const purple = "#9557E0";
  const orange = "#ffa64d";
  return res.json({
    apiversion: "1",
    color: orange,
    head: "bfl-pumpkin",
    tail: "shac-coffee"
  });
})
app.post("/start", (req, res) => {
  return "ok"
});

// Each move request
app.post("/move", (req, res) => {
  return main.move(req, res);
});

// Signals death or win. End of game for you
app.post("/end", (req, res) => {
  return main.end(req, res);
});


app.listen(app.get("port"), () => {
  console.log("Server listening on port %s", app.get("port"));
});
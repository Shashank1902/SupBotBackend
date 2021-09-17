const express = require("express");
const rs = require("rivescript");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

const bot = new rs();
bot
  .loadFile([
    "brain/brain.rive",
    "brain/begin.rive",
    "brain/clients.rive",
    "brain/eliza.rive",
    "brain/myself.rive",
  ])
  .then(loading_done)
  .catch(loading_error);
function loading_done() {
  console.log("Bot has finished loading!");
  bot.sortReplies();
}
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}

app.post("/chatbot", cors(), (req, res) => {
  const msg = req.body.message;

  let username = "local-user";
  bot.reply(username, msg).then(function (reply) {
    console.log("The bot says: " + reply);
    res.send(reply);
  });
  console.log(msg);
});

app.get("/chatbot", (req, res) => {
  let username = "local-user";
  bot.reply(username, "Hello").then(function (reply) {
    console.log("The bot says: " + reply);
    reply = "shashank";
    res.status(200).json(reply);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

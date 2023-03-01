import { Client, Message } from "discord.js-selfbot-v13";

const builder = require("../modules/xenowo_builder");
const { asciiLogo } = require("../modules/xenowo_libs");
const xenowu_libs = require("../modules/xenowo_libs");
module.exports = {
  data: new builder.xenoBuilder(
    "fact",
    "Learn some very cool, new facts!",
    "fun"
  ),
  execute: (msg: Message, bot: Client) => {
    var facts = [
      "Vatican City is the smallest country in the world.",
      "Odontophobia is the fear of teeth.",
      "The eiffel tower grows by 6 inches every summer! I wish my p3n1s would do that...",
      "Ketchup was originally designed as a medicine.",
      "The last letter added to the English alphabet was 'J'.",
      "You can hear a blue whale's heartbeat from over 2 miles away.",
      "The French have their own name for a French kiss.",
      "The american flag was made by a high-school kid! And he got a B- for his work!",
      "McDonalds once tried distributing broccoli chewing gum to kids. That didn’t go well...",
    ];
    msg.channel.send(
      "```ansi\n" +
        asciiLogo() +
        "```" +
        "```ansi\n" +
        `[1;34mFact: [0;34m${facts[Math.floor(Math.random() * facts.length)]}` +
        "```"
    );
  },
};

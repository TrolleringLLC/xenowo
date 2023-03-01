import { Client, Message } from "discord.js-selfbot-v13";

const builder = require("../modules/xenowo_builder");
const { asciiLogo } = require("../modules/xenowo_libs");
const xenowuLib = require("../modules/xenowo_libs");
const axios = require("axios");
var https = require("https");
var agent = new https.Agent({ family: 4 });
module.exports = {
  data: new builder.xenoBuilder("cat", "Cats are cool!", "image"),
  execute: (msg: Message, bot: Client) => {
    var x = "";
    axios
      .get("https://api.thecatapi.com/v1/images/search", { httpsAgent: agent })
      .then((resp: any) => {
        if (resp.data != undefined) {
          var catJs = resp.data[0];
          msg.reply(catJs["url"]);
        }
      })
      .catch((err: Error) => {
        console.error(err);
        msg.channel.send(
          "```ansi\n" +
            asciiLogo() +
            "```" +
            "```diff\n" +
            `
        An error has occured!
         ${err}` +
            "```"
        );
      });
  },
};

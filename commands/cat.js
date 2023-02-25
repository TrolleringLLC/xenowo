const builder = require("../modules/xenowo_builder");
const { asciiLogo } = require("../modules/xenowo_libs");
const xenowuLib = require("../modules/xenowo_libs");
const axios = require("axios");
var https = require("https");
var agent = new https.Agent({ family: 4 });
module.exports = {
  data: new builder.xenoBuilder("cat", "Cats are cool!", "image"),
  execute: (msg, bot) => {
    var x = "";
    axios
      .get("https://api.thecatapi.com/v1/images/search", { httpsAgent: agent })
      .then((resp) => {
        if (resp.data != undefined) {
          var catJs = resp.data[0];
          var z = msg.reply(catJs["url"]);
          x = z;
        }
      })
      .catch((err) => {
        console.error(err);
        var z = msg.channel.send(
          asciiLogo +
            "```diff\n" +
            `
        An error has occured!
         ${err}` +
            "```"
        );
        x = z;
      });
  },
};

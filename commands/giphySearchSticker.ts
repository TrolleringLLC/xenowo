import { Client, Message } from "discord.js-selfbot-v13";

const builder = require("../modules/xenowo_builder");
const { asciiLogo } = require("../modules/xenowo_libs");
const xenowuLib = require("../modules/xenowo_libs");
const axios = require("axios");
var https = require("https");
module.exports = {
  data: new builder.xenoBuilder(
    "giphySticker",
    "search giphy for a sticker!",
    "image"
  ),
  execute: (msg: Message, bot: Client) => {
    const args: string = msg.content.replace(
      xenowuLib.retrieveSetting("prefix") + "giphySticker ",
      ""
    );
    if (
      !xenowuLib.retrieveSetting("giphyApiKey") ||
      xenowuLib.retrieveSetting("giphyApiKey") == ""
    ) {
      msg.channel.send(
        "```ansi\n" +
          xenowuLib.asciiLogo() +
          "``````diff\n- No API key has been set.```"
      );
      return;
    }
    axios
      .get(
        `https://api.giphy.com/v1/stickers/search?api_key=${xenowuLib.retrieveSetting(
          "giphyApiKey"
        )}&q=${args}&limit=1`
      )
      .then((resp: any) => {
        if (!resp.data.meta) {
          msg.channel.send(
            "```ansi\n" +
              xenowuLib.asciiLogo() +
              "``````diff\n- An unknown error has occured!\nDebug Information:\n" +
              JSON.stringify(resp.data) +
              "```"
          );
          return;
        }
        if (resp.data.meta.status == 401) {
          msg.channel.send(
            "```ansi\n" +
              xenowuLib.asciiLogo() +
              "``````diff\n- Your API key is invalid!\nDebug Information:\n" +
              JSON.stringify(resp.data) +
              "```"
          );
          return;
        }
        msg.channel.send(resp.data.data[0].embed_url);
      });
  },
};

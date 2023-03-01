import { Client, Message } from "discord.js-selfbot-v13";

const builder = require("../modules/xenowo_builder");
var figlet = require("figlet");
const { retrieveSetting, asciiLogo } = require("../modules/xenowo_libs");
module.exports = {
  data: new builder.xenoBuilder(
    "text2ascii",
    "Generate very epic looking ascii art!",
    "image"
  ),
  execute: (msg: Message, bot: Client) => {
    var args = msg.content.replace(
      retrieveSetting("prefix") + "text2ascii",
      ""
    );
    if (args == "" || args == " ") {
      msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "```" +
          "```diff\n" +
          `- No arguments have been found!` +
          "```"
      );
      return;
    }
    figlet.text(
      args,
      {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      },
      function (err: Error, data: string) {
        if (err) {
          console.log("Something went wrong...");
          msg.channel.send(
            "```ansi\n" +
              asciiLogo() +
              "```" +
              "```diff\n" +
              `- ERROR:\n${err}` +
              "```"
          );
          console.error(err);
          return;
        }
        var art = "[0;34m";
        var arr = data.split("\n");
        for (const da of arr) {
          var num: Number = arr.indexOf(da);
          if (da.startsWith("    ")) {
            if (num == arr.length) {
              art += da.slice(4);
            } else {
              art += da.slice(4) + "\n";
            }
          } else {
            if (num == arr.length) {
              art += da;
            } else {
              art += da + "\n";
            }
          }
        }
        msg.channel.send("```ansi\n" + art + "```");
        return;
      }
    );
  },
};

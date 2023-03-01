const builder = require("../modules/xenowo_builder");
var figlet = require("figlet");
const { retrieveSetting } = require("../modules/xenowo_libs");
module.exports = {
  data: new builder.xenoBuilder(
    "text2ascii",
    "Generate very epic looking ascii art!",
    "image"
  ),
  execute: (msg, bot) => {
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
      function (err, data) {
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
        for (const da in arr) {
          if (arr[da].startsWith("    ")) {
            if (da == arr.length) {
              art += arr[da].slice(4);
            } else {
              art += arr[da].slice(4) + "\n";
            }
          } else {
            if (da == arr.length) {
              art += arr[da];
            } else {
              art += arr[da] + "\n";
            }
          }
        }
        msg.channel.send("```ansi\n" + art + "```");
        return;
      }
    );
  },
};

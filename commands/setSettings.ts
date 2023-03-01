import { Client, Message } from "discord.js-selfbot-v13";
const builder = require("../modules/xenowo_builder");
const {
  asciiLogo,
  retrieveSetting,
  setSetting,
} = require("../modules/xenowo_libs");
const xenowu_libs = require("../modules/xenowo_libs");

module.exports = {
  data: new builder.xenoBuilder("settings", "Manage your settings.", "utility"),
  execute: (msg: Message, bot: Client) => {
    const args = msg.content
      .replace(xenowu_libs.retrieveSetting("prefix"), "")
      .split(" ");
    if (!args[1]) {
      msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "```" +
          "```diff\n- No argument has been provided for argument 1.```"
      );
      return;
    }
    if (!args[2]) {
      msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "```" +
          "```diff\n- No argument has been provided for argument 2.```"
      );
      return;
    }
    switch (args[1]) {
      case "get":
        msg.channel.send(
          "```ansi\n" +
            asciiLogo() +
            "```" +
            "```ini\n" +
            `[ SETTINGS ]\n${args[2]} = ${retrieveSetting(args[2])}` +
            "```"
        );
        return;
      case "set":
        if (!args[3]) {
          msg.channel.send(
            "```ansi\n" +
              asciiLogo() +
              "```" +
              "```diff\n- No argument has been provided for argument 3.```"
          );
          return;
        }
        msg.channel.send(
          "Option: " +
            args[2] +
            " has been successfully set to " +
            args[3] +
            "."
        );
        setSetting(args[2], args[3]);
        return;
    }
  },
};

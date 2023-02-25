const { xenoBuilder } = require("../modules/xenowo_builder");
const {
  asciiLogo,
  retrieveSetting,
  setSetting,
} = require("../modules/xenowo_libs");
const xenowu_libs = require("../modules/xenowo_libs");

module.exports = {
  data: new xenoBuilder("settings", "Manage your settings.", "utility"),
  execute: (msg, bot) => {
    const args = msg.content
      .replace(xenowu_libs.retrieveSetting("prefix"), "")
      .split(" ");
    console.log(args);
    if (!args[1]) {
      msg.channel.send(
        asciiLogo +
          "```diff\n- No argument has been provided for argument 1.```"
      );
      return;
    }
    if (!args[2]) {
      msg.channel.send(
        asciiLogo +
          "```diff\n- No argument has been provided for argument 2.```"
      );
      return;
    }
    switch (args[1]) {
      case "get":
        msg.channel.send(
          "```ini\n" +
            `[ SETTINGS ]\n${args[2]} = ${retrieveSetting(args[2])}` +
            "```"
        );
        return;
      case "set":
        if (!args[3]) {
          msg.channel.send(
            asciiLogo +
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

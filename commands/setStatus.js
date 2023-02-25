const Discord = require("discord.js-selfbot-v13");
const { xenoBuilder } = require("../modules/xenowo_builder");
const { asciiLogo } = require("../modules/xenowo_libs");
const xenowu_libs = require("../modules/xenowo_libs");
module.exports = {
  data: new xenoBuilder("setstatus", "Set your status!", "utility"),
  execute: (msg, bot) => {
    const args = msg.content
      .replace(
        xenowu_libs.retrieveSetting("prefix") +
          require("./setSettings").data.name +
          " ",
        ""
      )
      .split(" ~ ");
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
    const r = new Discord.CustomStatus().setState(args[2]).setEmoji(args[1]);
    bot.user.setActivity(r);
    msg.channel.send(`Your status has been set to: ${args[1]} - ${args[2]}`);
  },
};

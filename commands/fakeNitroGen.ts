import { Client, Message } from "discord.js-selfbot-v13";
const { retrieveSetting, asciiLogo } = require("../modules/xenowo_libs");
const b = require("../modules/xenowo_builder");
module.exports = {
  data: new b.xenoBuilder("fakenitro", "Generate (fake) nitro", "utility"),
  execute: (msg: Message, bot: Client) => {
    if (!bot.user) return;
    var args: string[] = msg.content.split(" ");
    if (!args[1]) {
      msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "``````diff\n- You need to specify how many nitro codes you want to generate.```"
      );
      return;
    }
    if (!args[2]) {
      msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "``````diff\n- You need to specify what type of nitro you want to generate. Options: normal/basic```"
      );
      return;
    }
    if (args[2] != "normal" && args[2] != "basic") {
      msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "``````diff\n- That nitro type is not valid. Options: normal/basic```"
      );
      return;
    }
    try {
      var times: number = Number(args[1]);
      var nitroChars: number;
      if (args[2] == "normal") {
        nitroChars = 24;
      } else {
        nitroChars = 16;
      }
      for (let i = 0; i < times; i++) {
        msg.channel.send(
          `https://discord.gift/${require("randomstring").generate(nitroChars)}`
        );
      }
      msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "``````ansi\n[1;34m Successfully generated all nitro codes.```  "
      );
    } catch {
      msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "``````diff\n- The argument needs to be an number or another error occured..```"
      );
      return;
    }
  },
};

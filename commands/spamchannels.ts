import { Message, Client, DMChannel } from "discord.js-selfbot-v13";
const lib = require("../modules/xenowo_libs");
const builder = require("../modules/xenowo_builder");
module.exports = {
  data: new builder.xenoBuilder(
    "spamchannels",
    "Spam channels in the server (only works with permission) !!! BANNABLE !!!",
    "utility"
  ),
  execute: (msg: Message, bot: Client) => {
    const args: string[] = msg.content.split(" ");
    if (msg.channel instanceof DMChannel) {
      msg.channel.send(
        "```ansi\n" +
          lib.asciiLogo() +
          "``````diff\n- You can't execute that command in a DMChannel```"
      );
      return;
    }
    if (!bot.guilds) return;
    if (!msg.member?.permissions.has("MANAGE_CHANNELS")) {
      msg.channel.send(
        "```ansi\n" +
          lib.asciiLogo() +
          "``````diff\n- You do not have the required permissions to do that here```"
      );
      return;
    }
    if (!args[1]) {
      msg.channel.send(
        "```ansi\n" +
          lib.asciiLogo() +
          "``````diff\n- You need to specify an amount.```"
      );
      return;
    }
    if (!args[2]) {
      msg.channel.send(
        "```ansi\n" +
          lib.asciiLogo() +
          "``````diff\n- You need to specify a name.```"
      );
      return;
    }
    try {
      var amount: number = Number(args[1]);
      for (let i = 0; i < amount; i++) {
        msg.guild?.channels
          .create(args[2])
          .then((c) => {
            lib.logInfo(`[1;35mCreated channel with name: ${c.name} & id: ${c.id}`);
          })
          .catch();
      }
    } catch {}
  },
};

import { Message, Client, DMChannel } from "discord.js-selfbot-v13";
const lib = require("../modules/xenowo_libs");
const builder = require("../modules/xenowo_builder");
module.exports = {
  data: new builder.xenoBuilder(
    "nukechannels",
    "Nuke all channels in the server (only works with permission) !!! BANNABLE !!!",
    "utility"
  ),
  execute: (msg: Message, bot: Client) => {
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
    msg.guild?.channels.cache.forEach((channel) => {
      channel.delete().catch();
    });
  },
};

import { Client, Message } from "discord.js-selfbot-v13";

const Discord = require("discord.js-selfbot-v13");
const builder = require("../modules/xenowo_builder");
const { asciiLogo, retrieveSetting } = require("../modules/xenowo_libs");
const xenowu_libs = require("../modules/xenowo_libs");
module.exports = {
  data: new builder.xenoBuilder("massdm", "Mass-dm people!", "utility"),
  execute: (msg: Message, bot: Client) => {
    if (msg.deletable) msg.delete().catch();
    const args = msg.content.replace(
      xenowu_libs.retrieveSetting("prefix") + "massdm ",
      ""
    );
    require("axios")
      .get(
        `https://discord.com/api/v9/channels/${msg.channel.id}/messages?limit=100`,
        { headers: { Authorization: retrieveSetting("token") } }
      )
      .then((val: any) => {
        var members: string[] = [];
        for (let ob of val.data) {
          //if (bot.user == null) return;
          if (members.includes(ob.author.id)) continue;
          if (ob.author.id == bot.user?.id) continue;
          members.push(ob.author.id);
          bot.users.fetch(ob.author.id).then((val) => {
            val.send(args);
          });
        }
      });
  },
};

const Discord = require("discord.js-selfbot-v13");
const { xenoBuilder } = require("../modules/xenowo_builder");
const { asciiLogo, retrieveSetting } = require("../modules/xenowo_libs");
const xenowu_libs = require("../modules/xenowo_libs");
module.exports = {
  data: new xenoBuilder("massdm", "Mass-dm people!", "utility"),
  execute: (msg, bot) => {
    if (msg.deletable) msg.delete().catch();
    const args = msg.content.replace(
      xenowu_libs.retrieveSetting("prefix") + "massdm ",
      ""
    );
    enabled = true;
    let sent = [];
    require("axios")
      .get(
        `https://discord.com/api/v9/channels/${msg.channel.id}/messages?limit=100`,
        { headers: { Authorization: retrieveSetting("token") } }
      )
      .then((val) => {
        require("fs").writeFileSync("testing.json", JSON.stringify(val.data));
        var members = [];
        for (const ob in val.data) {
          if (members.includes(val.data[ob].author.id)) continue;
          if (val.data[ob].author.id == bot.user.id) continue;
          members.push(val.data[ob].author.id);
          bot.users.fetch(val.data[ob].author.id).then((val) => {
            val.send(args);
          });
        }
      });
  },
};

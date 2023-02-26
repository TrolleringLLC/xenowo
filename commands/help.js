const builder = require("../modules/xenowo_builder");
const { asciiLogo, retrieveSetting } = require("../modules/xenowo_libs");
const xenowuLib = require("../modules/xenowo_libs");
const fs = require("fs");
var path = require("path");
const { Message } = require("discord.js-selfbot-v13");
module.exports = {
  data: new builder.xenoBuilder(
    "help",
    "The help command, for all your needs.",
    "fun"
  ),
  execute: (msg, bot) => {
    const args = msg.content
      .replace(xenowuLib.retrieveSetting("prefix"), "")
      .split(" ");

    if (!args[1]) {
      var x = msg.channel.send(
        asciiLogo +
          "```ini\n" +
          `

[ USAGE ]

${xenowuLib.retrieveSetting("prefix")}help <CATEGORY>

[ CATEGORIES ]

fun = Fun & Harmless commands.
utility = Useful commands
image = Image commands
nsfw = The forbidden...

[ join: .gg/sWErAGjRWD ]
            ` +
          "```"
      );
      return;
    }
    if (!builder.categories.includes(args[1])) {
      var x = msg.channel.send(
        xenowuLib.asciiLogo + "```diff\n" + "- That category does not exist!```"
      );
      return;
    }
    var commtext = "";
    fs.readdirSync("./commands").forEach(async (file) => {
      const cmd = require(`./${file}`);
      if (cmd.data.category != args[1]) return [];
      commtext = commtext.concat(
        xenowuLib.retrieveSetting("prefix") +
          cmd.data.name +
          " = " +
          cmd.data.description +
          "\n"
      );
    });
    var x = msg.channel.send(
      asciiLogo +
        "```ini\n" +
        `
[ ${String(args[1]).toUpperCase()} COMMANDS ]
${commtext}

[ join: .gg/sWErAGjRWD ]
    ` +
        "```"
    );
  },
};

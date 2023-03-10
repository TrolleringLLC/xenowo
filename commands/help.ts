import { Client, Message } from "discord.js-selfbot-v13";
import { readdirSync } from "fs";
const builder = require("../modules/xenowo_builder");
const { asciiLogo, retrieveSetting } = require("../modules/xenowo_libs");
const xenowuLib = require("../modules/xenowo_libs");
module.exports = {
  data: new builder.xenoBuilder(
    "help",
    "The help command, for all your needs.",
    "utility"
  ),
  execute: (msg: Message, bot: Client) => {
    const args = msg.content
      .replace(xenowuLib.retrieveSetting("prefix"), "")
      .split(" ");

    if (!args[1]) {
      var x = msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "```" +
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
    if (!Object.values(builder.categories).includes(args[1])) {
      var x = msg.channel.send(
        "```ansi\n" +
          asciiLogo() +
          "```" +
          "```diff\n" +
          "- That category does not exist!```"
      );
      return;
    }
    var commtext = "";
    readdirSync("./commands").forEach(async (file: string) => {
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
      "```ansi\n" +
        asciiLogo() +
        "```" +
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

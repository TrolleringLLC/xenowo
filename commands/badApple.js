const builder = require("../modules/xenowo_builder");
const { asciiLogo } = require("../modules/xenowo_libs");
const xenowuLib = require("../modules/xenowo_libs");
const fs = require("fs");
module.exports = {
  data: new builder.xenoBuilder("badapple", "A very very bad apple!", "fun"),
  execute: async (msg, bot) => {
    var badApple = String(fs.readFileSync("./data/badApple.txt")).split(
      "SPLIT"
    );
    var x = await msg.channel.send("Playing Bad Apple ///");
    for (const apple in badApple) {
      await x.edit(badApple[apple]);
    }
  },
};

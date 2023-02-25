const axios = require("axios");
const {
  retrieveSetting,
  logInfo,
  logError,
} = require("../modules/xenowo_libs");
const chalk = require("chalk");
module.exports = {
  active: false,
  name: "messageCreatae",
  execute: (msg, bot) => {
    // IN PROGRESS
    if (msg.author.id == bot.user.id) return;
    var args = msg.content.split(" ");
    for (const argument in args) {
      var argum = args[argument];
      if (String(argum).length == 20) {
        //LilPenis
        axios({
          method: "post",
          url: "http://localhost:3000/api/auth/rank",
          headers: {
            "Content-Type": "multipart/formdata",
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0",
            Cookie:
              "token=MDAwMDAwMDk5Ng.Ykdndnh2azVHSHUxaDBSWnZOUW8.bkFyNUY3bUVxS055a3pVb0c2RVY",
          },
          data: new FormData().append("key", argum),
        }).then((resp) => {
          logInfo(JSON.stringify(resp.data));
        });
      }
    }
  },
};

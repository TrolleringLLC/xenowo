const fs = require("fs");
const axios = require("axios");
module.exports = {
  asciiLogo: () => {
    if (
      require("../modules/xenowo_libs.js").retrieveSetting("theme") == "default"
    )
      return `[1;36m██╗  ██╗███████╗███╗   ██╗ ██████╗ ██╗    ██╗ ██████╗ 
[1;36m╚██╗██╔╝██╔════╝████╗  ██║██╔═══██╗██║    ██║██╔═══██╗
[1;36m ╚███╔╝ █████╗  ██╔██╗ ██║██║   ██║██║ █╗ ██║██║   ██║
[1;36m ██╔██╗ ██╔══╝  ██║╚██╗██║██║   ██║██║███╗██║██║   ██║
[1;36m██╔╝ ██╗███████╗██║ ╚████║╚██████╔╝╚███╔███╔╝╚██████╔╝
[1;36m╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝  ╚═════╝ [0;37m`;
    var logo = "";
    var x = require("yaml").parse(
      fs.readFileSync(`data/themes/${this.retrieveSetting("theme")}.yaml`)
    );
    for (const line in x) {
      if (line == x.length) {
        logo += x.logo[line];
      } else {
        logo += x.logo[line] + "\n";
      }
    }
    return logo;
  },
  retrieveToken: () => {
    return JSON.parse(fs.readFileSync("./data/settings.json")).token;
  },
  logError: (er) => {
    console.error("[1;31m[ERROR][0;37m " + er);
  },
  logInfo: (info) => {
    console.log("[1;34m[INFO][0;37m " + info);
  },
  xenowoLog: (a) => {
    console.log("[1;34m[[38;5;199mX[38;5;200mE[38;5;254mN[38;5;255mO[38;5;67mW[38;5;68mO[1;34m][0;37m " + a);
  },
  retrieveSetting: (setting) => {
    return JSON.parse(fs.readFileSync("data/settings.json"))[setting];
  },
  setSetting: (setting, value) => {
    const x = JSON.parse(fs.readFileSync("./data/settings.json"));
    x[setting] = value;
    fs.writeFileSync("./data/settings.json", JSON.stringify(x));
    return;
  },
  generateToken: (email, password, auth) => {
    var aPromise = new Promise(function (resolve, reject) {
      axios
        .post("https://discord.com/api/v9/auth/login", {
          captcha_key: null,
          gift_code_sku_id: null,
          login: email,
          login_source: null,
          password: password,
          undelete: false,
        })
        .then((response) => {
          const ticket = response.data.ticket;
          if (response.data.mfa) {
            axios
              .post("https://discord.com/api/v9/auth/mfa/totp", {
                code: auth,
                gift_code_sku_id: null,
                login_source: null,
                ticket: ticket,
              })
              .then((response) => {
                resolve(response.data.token);
              })
              .catch((error) => {
                reject(error);
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return aPromise;
  },
};

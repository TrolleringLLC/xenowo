const fs = require("fs");
const axios = require("axios");
module.exports = {
  asciiLogo: () => {
    if (require("../modules/xenowo_libs").retrieveSetting("theme") == "default")
      return `[1;36m██╗  ██╗███████╗███╗   ██╗ ██████╗ ██╗    ██╗ ██████╗ 
[1;36m╚██╗██╔╝██╔════╝████╗  ██║██╔═══██╗██║    ██║██╔═══██╗
[1;36m ╚███╔╝ █████╗  ██╔██╗ ██║██║   ██║██║ █╗ ██║██║   ██║
[1;36m ██╔██╗ ██╔══╝  ██║╚██╗██║██║   ██║██║███╗██║██║   ██║
[1;36m██╔╝ ██╗███████╗██║ ╚████║╚██████╔╝╚███╔███╔╝╚██████╔╝
[1;36m╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝  ╚═════╝ [0;37m`;
    var logo = "";
    var x = require("yaml").parse(
      fs.readFileSync(
        `data/themes/${require("../modules/xenowo_libs").retrieveSetting(
          "theme"
        )}.yaml`,
        "utf-8"
      )
    );
    for (const line in x.logo) {
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
  logError: (er: any) => {
    console.error("[1;31m[ERROR][0;37m " + er);
  },
  logInfo: (info: string) => {
    console.log("[1;34m[INFO][0;37m " + info);
  },
  xenowoLog: (a: string) => {
    console.log("[1;34m[[38;5;199mX[38;5;200mE[38;5;254mN[38;5;255mO[38;5;67mW[38;5;68mO[1;34m][0;37m " + a);
  },
  retrieveSetting: (setting: string) => {
    return JSON.parse(fs.readFileSync("data/settings.json"))[setting];
  },
  setSetting: (setting: string, value: string) => {
    const x = JSON.parse(fs.readFileSync("./data/settings.json"));
    x[setting] = value;
    fs.writeFileSync("./data/settings.json", JSON.stringify(x));
    return;
  },
  generateToken: (email: string, password: string, auth: string) => {
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
        .then((response: any) => {
          const ticket = response.data.ticket;
          if (response.data.mfa) {
            axios
              .post("https://discord.com/api/v9/auth/mfa/totp", {
                code: auth,
                gift_code_sku_id: null,
                login_source: null,
                ticket: ticket,
              })
              .then((response: any) => {
                resolve(response.data.token);
              })
              .catch((error: Error) => {
                reject(error);
              });
          }
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
    return aPromise;
  },
};

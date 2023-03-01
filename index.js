// Importing
const xenowuLib = require("./modules/xenowo_libs.js");
const { Client } = require("discord.js-selfbot-v13");
const prompt = require("prompt-sync")();
const client = new Client({ checkUpdate: false });
const fs = require("fs");
const {
  getAllCommands,
  retrieveSetting,
  logInfo,
  logError,
  xenowoLog,
  asciiLogo,
} = require("./modules/xenowo_libs.js");
const yaml = require("yaml");
const { exit } = require("process");
const { default: axios } = require("axios");

// check if theme is set, if yes load it.
var theme;
var themeAvailable = false;
if (retrieveSetting("theme") != "default") {
  console.log(`data/themes/${retrieveSetting("theme")}.yaml`);
  if (fs.existsSync(`data/themes/${retrieveSetting("theme")}.yaml`)) {
    themeAvailable = true;
    theme = yaml.parse(
      fs.readFileSync(`data/themes/${retrieveSetting("theme")}.yaml`, "utf8")
    );
  } else {
    logError(`Could not find a theme named: ${retrieveSetting("theme")}`);
  }
}

// version
var version = fs.readFileSync("version");
var state = "BETA";

// print boot logo
if (!themeAvailable) {
  console.log(asciiLogo());
} else {
  for (const line in theme.logo) {
    console.log(theme.logo[line]);
  }
}
console.log("[0;33m╔════════════════════════════════════════════════════╗[0;37m");

// print information about sb
xenowoLog("Author: [1;36mhexlocation#0887[0;37m / [1;36m696339037971021865[0;37m");
xenowoLog(`Version: [38;0;60;199;163m${version}[0;37m/[38;2;255;0;60;1m${state}[0;37m`);
if (themeAvailable) xenowoLog(`Theme: [1;36m${theme["name"]}[0;37m`);

// check for updates
xenowoLog("Checking for updates...");
axios
  .get("https://raw.githubusercontent.com/TrolleringLLC/xenowo/main/version")
  .then((val) => {
    if (val.data != version) {
      xenowuLib.logInfo("Please update to the latest version of XenOwO.");
      exit(1);
    } else {
      var token;
      // Registering commands from commands folder, puts everything into an array
      var commands = [];
      fs.readdirSync("./commands").forEach(async (file) => {
        const cmd = require(`./commands/${file}`);
        logInfo(
          `[0;32mRegistered new command: ${file}/${retrieveSetting("prefix")}${
            cmd.data.name
          }[0;37m`
        );
        commands.push({ data: cmd.data, file: file });
      });

      // Registering all events in the events folder
      fs.readdirSync("./events").forEach(async (file) => {
        const event = require(`./events/${file}`);
        if (!event.active) {
          if (event.active == false) {
            logError(
              "[0;31mDidn't register unactive event: " +
                `${file}/${event.name} ! DO NOT PANIC[0;37m`
            );
            return;
          }
        }
        logInfo(`[0;33mRegistered new event: ${file}/${event.name}[0;37m`);
        client.on(event.name, (...args) => event.execute(...args, client));
      });

      // Show message on ready
      client.on("ready", async () => {
        logInfo(
          `[4;32mXenowu has been started up successfully[0;37m | [1;36m${client.user.username}#${
            client.user.discriminator
          } [0;37m| [1;36m${client.user.id}[0;37m | [0;32mYour prefix is: [1;32m${retrieveSetting("prefix")}[0;37m`
        );
      });

      // Command Handler
      client.on("messageCreate", (msg) => {
        // Check if the author is the owner of SB, if not, throw away.
        const author = msg.author;
        if (author.id != client.user.id) return;

        // If message doesn't start with set prefix, throw away.
        if (!msg.content.startsWith(xenowuLib.retrieveSetting("prefix")))
          return;

        // Split command into arguments & remove prefix
        const cmd = msg.content
          .replace(xenowuLib.retrieveSetting("prefix"), "")
          .split(" ");

        // Delete the command if it's present.
        setTimeout(() => {
          var d = msg.deletable;
          try {
            if (d) msg.delete().catch();
          } catch {}
        }, retrieveSetting("deleteDelay"));

        if (cmd[0] == "reload") {
          client.removeAllListeners();
          commands.length = 0;
          fs.readdirSync("./events").forEach(async (file) => {
            const event = require(`./events/${file}`);
            if (!event.active) {
              if (event.active == false) {
                msg.channel.send(
                  "```ansi\n[0;31mDidn't register unactive event: " +
                    `${file}/${event.name}.[0;37m` +
                    "```"
                );
              } else {
                msg.channel.send(
                  "```ansi\n" +
                    `[0;33mRegistered new event: ${file}/${event.name}[0;37m` +
                    "```"
                );
                client.on(event.name, (...args) =>
                  event.execute(...args, client)
                );
              }
            }
          });
          fs.readdirSync("./commands").forEach(async (file) => {
            const cmd = require(`./commands/${file}`);
            msg.channel.send(
              "```ansi\n" +
                `[0;32mRegistered new command: ${file}/${retrieveSetting("prefix")}${
                  cmd.data.name
                }[0;37m` +
                "```"
            );
            commands.push({ data: cmd.data, file: file });
          });

          return;
        }
        // Execute the command, while passing the message and bot through.
        var x = commands.find((element) => element.data.name == cmd[0]);
        if (x == undefined) return;
        require("./commands/" + x.file).execute(msg, client);
      });

      // Retrieving token from file
      token = xenowuLib.retrieveSetting("token");

      // Login to token
      client.login(token).catch((e) => {
        // If login fails, try to regen token
        // Doesn't always work, may need captcha solver.
        logError("[0;31mToken is invalid. [4;31mPlease regenerate your token.[0;37m");
        logError(
          "[0;31mLOGGING OUT OF THE DISCORD APP/WEBAPP WILL CAUSE YOUR TOKEN TO GET REGENERATED.[0;37m"
        );
        exit(1);
        // WIP TOKEN REGENERATION !!!
        if (xenowuLib.retrieveSetting("mfa")) {
          xenowuLib
            .generateToken(
              prompt("Email > "),
              prompt("Password > "),
              prompt("2FA code > ")
            )
            .then((tk) => {
              token = tk;
              xenowuLib.setSetting("token", tk);
              client.login(tk);
            });
        } else {
          xenowuLib
            .generateToken(prompt("Email > "), prompt("Password > "), 0)
            .then((tk) => {
              token = tk;
              xenowuLib.setSetting("token", tk);
              client.login(tk);
            });
        }
      });
      module.exports = commands;
    }
  });

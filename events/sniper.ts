import { Client, Message } from "discord.js-selfbot-v13";

const { post } = require("axios");
const {
  retrieveSetting,
  logInfo,
  logError,
} = require("../modules/xenowo_libs");
const chalk = require("chalk");

module.exports = {
  name: "messageCreate",
  execute: (msg: Message, bot: Client) => {
    if (msg.author.id == bot.user?.id) return;
    var args = msg.content.split(" ");
    for (const argument in args) {
      var argum = args[argument];
      if (argum.includes("discord.gift/")) {
        var code = argum.split("discord.gift/")[1];
        post(
          `https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`,
          {
            headers: {
              Authorization: retrieveSetting("token"),
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Vivaldi/5.7.2921.60",
            },
          }
        )
          .then((resp: any) => {
            logError(`Nitro code ${chalk.bold(code)} is valid! Claimed.`);
            logError(`Nitro code ${chalk.bold(code)} is invalid!`);
            var data = {
              username: "salad best uwu",
              avatar_url:
                "https://static.vecteezy.com/system/resources/thumbnails/017/691/577/original/salad-scene-icon-of-nice-animated-for-your-food-packs-easy-to-use-with-transparent-background-hd-motion-graphic-animation-free-free-video.jpg",
              embeds: [
                {
                  author: {
                    name: "Xenowu",
                    url: "https://www.reddit.com/r/cats/",
                    icon_url:
                      "https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZXxlbnwwfHwwfHw%3D&w=1000&q=80",
                  },
                  title: "Xenowu Nitro Notification",
                  description: `A valid nitro code has been found and claimed!`,
                  color: 8453888,
                  fields: [
                    { name: `Source`, value: `${msg.url}`, inline: true },
                    {
                      name: `Author`,
                      value: `${msg.author.username}#${msg.author.discriminator}`,
                      inline: true,
                    },
                    {
                      name: "Code",
                      value: `${code}`,
                      inline: true,
                    },
                  ],
                },
              ],
            };
            post(retrieveSetting("webhook"), data);
          })
          .catch((err: Error) => {
            logError(`Nitro code ${chalk.bold(code)} is invalid!`);
            var data = {
              username: "salad best uwu",
              avatar_url:
                "https://static.vecteezy.com/system/resources/thumbnails/017/691/577/original/salad-scene-icon-of-nice-animated-for-your-food-packs-easy-to-use-with-transparent-background-hd-motion-graphic-animation-free-free-video.jpg",
              embeds: [
                {
                  author: {
                    name: "Xenowu",
                    url: "https://www.reddit.com/r/cats/",
                    icon_url:
                      "https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZXxlbnwwfHwwfHw%3D&w=1000&q=80",
                  },
                  title: "Xenowu Nitro Notification",
                  description: `An invalid nitro code has been found!`,
                  color: 16711680,
                  fields: [
                    { name: `Source`, value: `${msg.url}`, inline: true },
                    {
                      name: `Author`,
                      value: `${msg.author.username}#${msg.author.discriminator}`,
                      inline: true,
                    },
                    {
                      name: "Code",
                      value: `${code}`,
                      inline: true,
                    },
                  ],
                },
              ],
            };
            post(retrieveSetting("webhook"), data);
          });
      }
    }
  },
};

const express = require("express");
const cheerio = require("cheerio");
const request = require("request-promise");
const cron = require("node-cron");
const app = express();

const checkSubYoutubeChannel = async youtubeChannel => {
  let res = await request(youtubeChannel);

  let $ = cheerio.load(res);

  let nameyoutubeChannel = $(
    '[class="spf-link branded-page-header-title-link yt-uix-sessionlink"]'
  ).attr("title");

  let subCount = $(
    '[class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip"]'
  ).attr("aria-label");

  return { nameyoutubeChannel, subCount };
};

(async () => {
  let youtubeChannel = "https://www.youtube.com/user/PewDiePie";

  cron.schedule("* * * * * *", async () => {
    const result = await checkSubYoutubeChannel(youtubeChannel);

    app.get("/", (req, res) => {
      res.json(result);
    });
  });
})();

app.listen(3000, () => {
  console.log("Application is running on port 3000");
});

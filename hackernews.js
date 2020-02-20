const express = require("express");
const cheerio = require("cheerio");
const request = require("request-promise");
const cron = require("node-cron");
const fs = require("fs");
const app = express();

let checkNewsfeedFunc = async URL => {
  let res = await request(URL);
  let $ = await cheerio.load(res);
  let scrapeResults = [];

  $(".athing").each((i, el) => {
    let topic = $(el)
      .find(".title")
      .text();

    let link = $(el)
      .find(".title a")
      .attr("href");

    scrapeResults.push({ topic, link });
  });

  fs.writeFileSync("newsfeed.json", JSON.stringify(scrapeResults));
  return scrapeResults;
};

(async () => {
  let feedHackernews = "https://news.ycombinator.com/newest";
  cron.schedule("* * * * *", async () => {
    await checkNewsfeedFunc(feedHackernews);

    app.get("/", (req, res) => {
      fs.readFile("newsfeed.json", (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);

        return res.send(student);
      });
    });
    console.log(new Date().toLocaleString());
  });
})();

app.listen(3000, () => {
  console.log("Application is running on port 3000");
});

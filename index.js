const express = require("express");
const fs = require("fs");
const csv = require("neat-csv");
const cron = require("node-cron");
const raw = fs.readFileSync("./post.csv", "utf8");
const FetchDATA = require("./hackernews");

const app = express();

const readCSV = async () => {
  const result = await csv(raw, { headers: false });
  app.get("/", function(req, res) {
    res.json(result);
  });
};

readCSV();
FetchDATA(`https://news.ycombinator.com/`);

app.listen(3000);

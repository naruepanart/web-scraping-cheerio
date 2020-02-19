const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");
/* writeStream.write(`Topic,Link \n`); */

const FetchDATA = async url => {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  $(".athing").each((i, el) => {
    const topic = $(el)
      .find(".title")
      .text();

    const link = $(el)
      .find(".title a")
      .attr("href");

    writeStream.write(`${topic} , ${link} \n`);
    /*   console.log(`${topic} , ${link}`); */
  });
  
  console.log("Done...");
};

FetchDATA(`https://news.ycombinator.com/`);

/* for (let i = 1; i <= 3; i++) {
  FetchPage(i);
}

function FetchPage(i) {
  setTimeout(() => {
    FetchDATA(`https://news.ycombinator.com/news?p=${i}`);
  }, 1000 * i);
} */

/*   const Topic = $(".athing").text(); */
/*   console.log(Topic); */

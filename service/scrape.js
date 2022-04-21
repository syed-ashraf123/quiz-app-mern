const axios = require("axios");
const API = "https://opentdb.com/api.php";
const fs = require("fs").promises;
let num = 0;
const crawl = async (i, difficulty) => {
  const res = await axios(
    API + `/?amount=30&category=${i}&difficulty=${difficulty}&type=multiple`
  );
  await new Promise((r) => setTimeout(r, 3000));
  if (!res.data.results.length) return;
  try {
    await fs.writeFile(
      `./quizes/${num}.json`,
      JSON.stringify(res.data.results)
    );
    num = num + 1;
  } catch (err) {
    console.log(i, res.data);
    console.log(err);
  }
  return;
};

const DIFFICULTY = ["easy", "medium", "hard"];

(async () => {
  for (let diff = 0; diff < DIFFICULTY.length; diff++) {
    for (let i = 09; i <= 32; i++) {
      await crawl(i, DIFFICULTY[diff]);
    }
  }
})();

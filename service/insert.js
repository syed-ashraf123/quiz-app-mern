const axios = require("axios");
const fs = require("fs").promises;

async function insertData() {
  for (let i = 0; i <= 09; i++) {
    const data = await fs.readFile(`./quizes/${i}.json`, "utf-8");
    const quiz = JSON.parse(data);
    for (let i = 0; i <= 30; i++) {
      await axios.post("http://localhost:4000/populate", quiz[i]);
    }
  }
  console.log("done");
}
insertData();

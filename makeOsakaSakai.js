import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readData((data) => {
  if (data.都道府県コード == "大阪" &&
    (
      data.警察署等コード == "堺" ||
      data.警察署等コード == "西堺" ||
      data.警察署等コード == "北堺" ||
      data.警察署等コード == "南堺" ||
      data.警察署等コード == "中堺" ||
      data.警察署等コード == "黒山"
    )
  ) {
    list.push(data);
  }
});

await Deno.writeTextFile("data/osaka-sakai.csv", CSV.stringify(list));
console.log(list[0], list.length);

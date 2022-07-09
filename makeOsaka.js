import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readData((data) => {
  if (data.都道府県コード == "大阪") {
    list.push(data);
  }
});

await Deno.writeTextFile("data/osaka.csv", CSV.stringify(list));
console.log(list[0], list.length);

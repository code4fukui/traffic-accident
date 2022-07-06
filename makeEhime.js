import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readData((data) => {
  if (data.都道府県コード == "愛媛") {
    list.push(data);
  }
});

await Deno.writeTextFile("data/ehime.csv", CSV.stringify(list));
console.log(list[0], list.length, list.filter(d => d.color == "red").length);

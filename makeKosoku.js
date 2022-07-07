import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readData((data) => {
  if (data.発生地点 != undefined) {
    list.push(data);
  }
});

await Deno.writeTextFile("data/kosoku.csv", CSV.stringify(list));
console.log(list[0], list.length);

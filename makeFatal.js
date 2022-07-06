import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readData((data) => {
  if (data.事故内容 == "死亡") {
    list.push(data);
  }
});

await Deno.writeTextFile("data/fatal.csv", CSV.stringify(list));
console.log(list[0], list.length);

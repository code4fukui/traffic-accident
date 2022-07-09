import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readData((data) => {
  if (data.緯度 < 20 || data.緯度 > 50 || data.経度 < 120 || data.経度 > 150) {
    list.push(data);
    console.log(data);
  }
});

await Deno.writeTextFile("data/error.csv", CSV.stringify(list));
console.log(list[0], list.length);

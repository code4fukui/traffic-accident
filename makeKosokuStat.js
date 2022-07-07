import { readDataKosoku } from "./readDataKosoku.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readDataKosoku((data) => {
  list.push(data);
});

await Deno.writeTextFile("data/kosoku-stat.csv", CSV.stringify(list));
console.log(list[0], list.length);

import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readData((data) => {
  const obj = {};
  const names = ["都道府県コード", "警察署等コード", "本票番号", "事故内容", "昼夜", "天候", "地形", "車両形状（当事者A）", "車両形状（当事者B）", "車両の衝突部位（当事者A）", "車両の衝突部位（当事者B）"];
  for (const name of names) {
    obj[name] = data[name];
  }
  list.push(obj);
});

await Deno.writeTextFile("data/stat1.csv", CSV.stringify(list));
console.log(list[0], list.length);

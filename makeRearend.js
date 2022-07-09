import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readData((data) => {
  if (
    data["車両の衝突部位（当事者A）"].startsWith("後-") ||
    data["車両の衝突部位（当事者A）"].startsWith("右後-") ||
    data["車両の衝突部位（当事者A）"].startsWith("左後-") ||
    data["車両の衝突部位（当事者B）"].startsWith("後-") ||
    data["車両の衝突部位（当事者B）"].startsWith("右後-") ||
    data["車両の衝突部位（当事者B）"].startsWith("左後-")
  ) {
    list.push(data);
    //console.log(data);
  }
});

await Deno.writeTextFile("data/rearend.csv", CSV.stringify(list));
console.log(list[0], list.length);

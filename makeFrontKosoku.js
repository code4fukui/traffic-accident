import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const list = [];
await readData((data) => {
  if (data.発生地点 != undefined &&
    (
      data["車両の衝突部位（当事者A）"].startsWith("前-") ||
      data["車両の衝突部位（当事者A）"].startsWith("右前-") ||
      data["車両の衝突部位（当事者A）"].startsWith("左前-")
    ) && (
      data["車両の衝突部位（当事者B）"].startsWith("前-") ||
      data["車両の衝突部位（当事者B）"].startsWith("右前-") ||
      data["車両の衝突部位（当事者B）"].startsWith("左前-")
    )
  ) {
    list.push(data);
  }
});

await Deno.writeTextFile("data/kosoku-front.csv", CSV.stringify(list));
console.log(list[0], list.length);

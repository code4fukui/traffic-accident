import { CSV } from "https://js.sabae.cc/CSV.js";

const names = ["無", "前", "右", "後", "左", "右前", "右後", "左後", "左前"];

const list = [];
for (let i = 0; i < names.length; i++) {
  for (let j = 0; j < names.length; j++) {
    list.push({
      code: i + "" + j,
      value: names[i] + "-" + names[j],
      description: "",
    });
  }
}
await Deno.writeTextFile("code/hit.csv", CSV.stringify(list));

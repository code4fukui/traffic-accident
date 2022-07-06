import { readData } from "./readData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const nofukui = 52;
const noechizen = 111;
const nosabae = 109;

const list = [];
await readData((data) => {
  //const echizen = json.filter(d => d.都道府県コード == nofukui && (d.警察署等コード == noechizen || d.警察署等コード == nosabae));
  if (data.都道府県コード == "福井") {
    list.push(data);
  }
});

await Deno.writeTextFile("data/fukui.csv", CSV.stringify(list));
console.log(list[0], list.length);

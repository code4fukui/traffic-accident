import { CSV } from "https://js.sabae.cc/CSV.js";

const make = async (srcfn, dstfn) => {
  const data = await CSV.fetch(srcfn);
  const json = CSV.toJSON(data);
  const nofukui = 52;
  const noechizen = 111;
  const nosabae = 109;
  const echizen = json.filter(d => d.都道府県コード == nofukui);
  //const echizen = json.filter(d => d.都道府県コード == nofukui && (d.警察署等コード == noechizen || d.警察署等コード == nosabae));
  
  //console.log(json[0]);
  //await Deno.writeTextFile("fukui.csv", CSV.stringify(fukui));
  await Deno.writeTextFile(dstfn, CSV.stringify(echizen));
};
await make("data_src/honhyo_2019.csv", "data/fukui_2019.csv");
await make("data_src/honhyo_2020.csv", "data/fukui_2020.csv");

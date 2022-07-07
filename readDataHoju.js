import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";
import { TextDecoderSJIS } from "https://js.sabae.cc/TextDecoderSJIS.js";
import { convert } from "./convert.js";

const srcfns = [
  "data_src/hojuhyo_2019.csv",
  "data_src/hojuhyo_2020.csv",
];

export const readDataHoju = async (callback) => {
  for (const srcfn of srcfns) {
    const r = new CSVReader(srcfn, new TextDecoderSJIS());
    const head = await r.readRecord();
    for (;;) {
      const data = await r.readRecord(head);
      if (data == null) {
        break;
      }
      convert(data);
      callback(data);
    }
    r.close();
  }
};

const list = [];
await readDataHoju((d) => {
  if (d.補充票番号 != "001") {
    list.push(d);
  }
});
console.log(list);

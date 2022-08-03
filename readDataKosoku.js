import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";
import { TextDecoderSJIS } from "https://js.sabae.cc/TextDecoderSJIS.js";
import { convert } from "./convert.js";

export const readDataKosoku = async (callback) => {
  for (let i = 2019; i <= 2021; i++) {
    const srcfn = `data_src/kosokuhyo_${i}.csv`;
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

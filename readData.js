import { CSVReader } from "https://code4fukui.github.io/csv-rw/CSVReader.js";
import { TextDecoderSJIS } from "https://js.sabae.cc/TextDecoderSJIS.js";
import { convert } from "./convert.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

export const readData = async (callback) => {
  for (let i = 2019; i <= 2021; i++) {
    const srcfn = `data_src/honhyo_${i}.csv`;
    const apfn = `data_src/hojuhyo_${i}.csv`;
    const kosokufn = `data_src/kosokuhyo_${i}.csv`;
    //const apdata = CSV.toJSON(await CSV.fetch(apfn));
    const kosokudata = CSV.toJSON(await CSV.fetch(kosokufn));

    const r = new CSVReader(srcfn, new TextDecoderSJIS());
    const head = await r.readRecord();
    for (;;) {
      const data = await r.readRecord(head);
      if (data == null) {
        break;
      }
      const kosoku = kosokudata.find(d => d.本票番号 == data.本票番号 && d.都道府県コード == data.都道府県コード && d.警察署等コード == data.警察署等コード);
      if (kosoku) {
        for (const name in kosoku) {
          if (data[name]) {
            continue;
          }
          data[name] = kosoku[name];
        }
      }
      /*
      const ap = apdata.find(d => d.本票番号 == data.本票番号 && );
      if (!ap) {
        //throw new Error("can't find 補充票");
      } else {
        for (const name in ap) {
          if (data[name]) {
            continue;
          }
          data[name] = ap[name];
        }
      }
      */
      convert(data);
      callback(data);
    }
    r.close();
  }
};

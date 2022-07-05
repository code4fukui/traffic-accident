import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const analyze = async () => {
  const fn = "data_src/honhyo_2019.csv";
  //const fn = "data_src/honhyo_2020.csv";
  const data = await CSV.fetch(fn);
  const json = CSV.toJSON(data);
  //const max = ArrayUtil.max(json, (d) => parseInt(d.死者数));
  const max = ArrayUtil.max(json, (d) => parseInt(d.負傷者数)); // 2020 17, 2019 31
  console.log(max);
};

await analyze();

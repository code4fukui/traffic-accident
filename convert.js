import { CSV } from "https://js.sabae.cc/CSV.js";

const getSchema = async () => {
  const root = CSV.toJSON(await CSV.fetch("code/code.csv"));
  const schema = {};
  for (const d of root) {
    if (d.file[0] == "#") {
      continue;
    }
    const sc = CSV.toJSON(await CSV.fetch("code/" + d.file));
    schema[d.name] = sc;
  }
  return schema;
};

const schema = await getSchema();

const dms2d = (d, m, s) => {
  const p = (s) => parseFloat(s);
  return p(d) + p(m) / 60 + p(s) / (60 * 60);
};
const kdms2d = (s) => {
  // 1413108483
  let n = s.length == 10 ? 1 : 0;
  n += 2;
  const d = s.substring(0, n);
  const m = s.substring(n, n + 2);
  n += 2;
  const sec = parseInt(s.substring(n)) / 1000;
  return dms2d(d, m, sec).toFixed(6);
};
const getDate = (d, pre) => {
  const year = d[pre + "年"];
  const month = d[pre + "月"];
  const day = d[pre + "日"];
  delete d[pre + "年"];
  delete d[pre + "月"];
  delete d[pre + "日"];
  return year + "-" + month + "-" + day;
};
const getTime = (d, pre) => {
  const hour = d[pre + "時"];
  const min = d[pre + "分"];
  delete d[pre + "時"];
  delete d[pre + "分"];
  return hour + ":" + min;
};

export const convert = (d) => {
  if (d["地点　緯度（北緯）"]) {
    d.緯度 = kdms2d(d["地点　緯度（北緯）"]);
    /*
    if (d.緯度 > 0 && d.緯度 < 0.1) {
      console.log(d["地点　緯度（北緯）"], d["地点　経度（東経）"])
      Deno.exit(0); // 000000000 0000000000, 000016566 0000036144
    }
    */
    delete d["地点　緯度（北緯）"];
    d.経度 = kdms2d(d["地点　経度（東経）"]);
    delete d["地点　経度（東経）"];
  }
  if (d["発生日時　　月"]) {
    d.発生日 = getDate(d, "発生日時　　");
    d.発生時 = getTime(d, "発生日時　　");
  }

  const d2 = {};
  for (const name in d) {
    for (const name2 in schema) {
      const sc = schema[name2];
      //console.log(sc)
      //if (sc.means.indexOf("本票") == -1) {
      /*
      if (sc.means.indexOf("本票") == -1) {
        continue;
      }
      */
      if (name.startsWith(name2)) {
        const f = (() => {
          if (sc.option) {
            const opt = sc.option.split("/");
            return sc.find(i => {
              if (i.code != d[name]) {
                return false;
              }
              for (const o of opt) {
                if (i[o] != d[o]) {
                  return false;
                }
              }
              return true;
            });
          } else {
            return sc.find(i => i.code == d[name]);
          }
        })();
        if (!f) {
          if (name == "トンネル番号" && d[name] == "000") {
            d2[name] = "";
            continue;
          } else if (d[name].trim().length == 0) {
            d2[name] = "";
            continue;
          } else {
            console.log(sc, d[name], name, name2);
            throw new Error("can't convert");
          }
        }
        d2[name] = f.value;
      }
    }
  }
  for (const name in d2) {
    d[name] = d2[name];
  }
  const num = ["死者数", "負傷者数", "当事者車両台数", "トンネル延長距離", "発生地点"];
  for (const n of num) {
    if (d[n] != undefined) {
      d[n] = parseInt(d[n]);
    }
  }

  if (d.事故内容 != undefined) {
    d.color = d.事故内容 == "負傷" ? "blue" : "red";
  }
};

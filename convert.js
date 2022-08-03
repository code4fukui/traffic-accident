import { CSV } from "https://js.sabae.cc/CSV.js";

const getSchema = async () => {
  const root = CSV.toJSON(await CSV.fetch("code/code.csv"));
  const schema = {};
  for (const d of root) {
    if (d.file[0] == "#") {
      continue;
    }
    const sc = CSV.toJSON(await CSV.fetch("code/" + d.file));
    schema[d.name] = { schema: d, code: sc };
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

/*
0001～0999 一般国道（国道番号） 0 現道区間又は包括路線
1000～1499 主要地方道－都道府県道 1～9 バイパス区間
1500～1999 主要地方道－市道
2000～2999 一般都道府県道
3000～3999 一般市町村道
4000～4999 高速自動車国道 *1
5000～5499 自動車専用道－指定 *1
5500～5999 自動車専用道－その他
6000～6999 道路運送法上の道路
7000～7999 農（免）道
8000～8499 林道
8500～8999 港湾道
9000～9499 私道
9500 その他
9900 一般の交通の用に供するその他の道路
*/
const getRoadType = (n) => {
  if (n.length == 5) {
    const bypass = n.substring(4);
    n = n.substring(0, 4);
  } else if (n.length != 4) {
    throw new Error("illegal road type: " + n);
  }
  if (n <= 999) {
    return "一般国道"; // "国道" + n + "号線";
  } else if (n <= 1499) {
    return "都道府県道";
  } else if (n <= 1999) {
    return "市道";
  } else if (n <= 2999) {
    return "一般都道府県道";
  } else if (n <= 3999) {
    return "一般市町村道";
  } else if (n <= 4999) {
    return "高速自動車国道";
  } else if (n <= 5499) {
    return "自動車専用道－指定";
  } else if (n <= 5999) {
    return "自動車専用道－その他";
  } else if (n <= 6999) {
    return "道路運送法上の道路";
  } else if (n <= 7999) {
    return "農（免）道";
  } else if (n <= 8499) {
    return "林道";
  } else if (n <= 8999) {
    return "港湾道";
  } else if (n <= 9499) {
    return "私道";
  } else if (n == 9500) {
    return "その他";
  } else if (n == 9900) {
    return "一般の交通の用に供するその他の道路";
  } else {
    throw new Error("illegal road code: " + n);
  }
};
const decodeRoadCdoe = (n) => {
  const type = getRoadType(n);
  if (type == "一般国道") {
    const bypass = n.substring(4);
    return "国道" + parseInt(n.substring(0, 4)) + "号線" + (bypass != "0" ? "バイパス" + bypass : "");
  }
  return type + " " + n;
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
      const ss = schema[name2];
      const sc = ss.code;
      //console.log(ss.schema, d)
      //Deno.exit(0)
      //if (sc.means.indexOf("本票") == -1) {
      /*
      if (sc.means.indexOf("本票") == -1) {
        continue;
      }
      */
      if (name.startsWith(name2)) {
        const f = (() => {
          if (ss.schema.option) {
            const opt = ss.schema.option.split("/");
            return sc.find(i => {
              if (name == "路線コード") {
                if (!d[name].startsWith(i.code)) {
                  return false;
                }
              } else {
                if (i.code != d[name]) {
                  return false;
                }
              }
              for (const o of opt) {
                if (o == "路線コード") {
                  if (!d[o].startsWith(i[o])) {
                    return false;
                  }
                } else if (i[o] != d[o]) {
                  return false;
                }
              }
              return true;
            });
          } else {
            if (name == "路線コード") {
              return sc.find(i => d[name].startsWith(i.code));
            } else {
              return sc.find(i => i.code == d[name]);
            }
          }
        })();
        if (!f) {
          if (name == "トンネル番号" && d[name] == "000") {
            d2[name] = "";
            continue;
          } else if (d[name].trim().length == 0) {
            d2[name] = "";
            continue;
          } else if (name == "路線コード") {
            d[name] = decodeRoadCdoe(d[name]);
            continue;
          } else {
            console.log(d.都道府県コード, d[name], name, name2);
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

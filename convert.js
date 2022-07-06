import { CSV } from "https://js.sabae.cc/CSV.js";

const getSchema = async () => {
  const root = CSV.toJSON(await CSV.fetch("code/code.csv"));
  const schema = {};
  for (const d of root) {
    const sc = CSV.toJSON(await CSV.fetch("code/" + d.file));
    schema[d.name] = sc;
  }
  return schema;
};

const schema = await getSchema();

const data1 = CSV.toJSON(await CSV.fetch("data/fukui_2019.csv"));
const data2 = CSV.toJSON(await CSV.fetch("data/fukui_2020.csv"));
const data = [];
for (const d of data1) {
  data.push(d);
}
for (const d of data2) {
  data.push(d);
}

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
data.map(d => {
  d.緯度 = kdms2d(d["地点　緯度（北緯）"]);
  delete d["地点　緯度（北緯）"];
  d.経度 = kdms2d(d["地点　経度（東経）"]);
  delete d["地点　経度（東経）"];
  d.発生日 = getDate(d, "発生日時　　");
  d.発生時 = getTime(d, "発生日時　　");

  for (const name in d) {
    for (const name2 in schema) {
      if (name.startsWith(name2)) {
        const f = schema[name2].find(i => i.code == d[name]);
        if (!f) {
          console.log(f, schema[name2], d[name], name, name2)
        }
        d[name] = f.value;
      }
    }
  }
  d.死者数 = parseInt(d.死者数);
  d.負傷者数 = parseInt(d.負傷者数);

  d.color = d.事故内容 == "負傷" ? "blue" : "red";
});
await Deno.writeTextFile("data/fukui.csv", CSV.stringify(data));
console.log(data.length);
console.log(data.filter(d => d.color == "red").length);

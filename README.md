# traffic-accident 交通事故オープンデータ

福井県で年間1,000件、交通事故0プロジェクト

## データ出典

- [交通事故統計情報のオープンデータ｜警察庁Webサイト](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/index_opendata.html)

## サンプルアプリ

### 地図表示

- [福井県の交通事故 2019-2020](https://code4fukui.github.io/traffic-accident/fukui.html)
- [愛媛県の交通事故 2019-2020](https://code4fukui.github.io/traffic-accident/ehime.html)
- [大阪府の交通事故 2019-2020](https://code4fukui.github.io/traffic-accident/osaka.html)
- [大阪府堺市の交通事故 2019-2020](https://code4fukui.github.io/traffic-accident/osaka-sakai.html)
- [日本の交通死亡事故 2019-2020](https://code4fukui.github.io/traffic-accident/fatal.html)
- [高速道路での交通事故 2019-2020](https://code4fukui.github.io/traffic-accident/kosoku.html)
- [高速道路での正面衝突事故 2019-2020](https://code4fukui.github.io/traffic-accident/kosoku-front.html)
- 追突事故 2019-2020 ※データサイズが100MBオーバーのため別途対応予定

### 分析

- [高速道路での交通事故分析2019-2020](https://code4fukui.github.io/traffic-accident/kosokustat.html)
- [交通事故分析2019-2020](https://code4fukui.github.io/traffic-accident/stat.html)

### その他

- [緯度経度異常データ2019-2021](https://code4fukui.github.io/traffic-accident/error.html)

## コード値表

- [コード値表](code/code.csv)
- [コード値一覧](code)
- データソース「[各種コード表](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/2019/codebook_2019.pdf)」

## 変換プログラム

- [extract.js](extract.js) 警察庁オープンデータから条件で抽出する
- [convert.js](convert.js) コード表を元に読みやすいデータに変換する / 緯度経度を度表記に変換する

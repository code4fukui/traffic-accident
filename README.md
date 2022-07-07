# traffic-accident 交通事故オープンデータ

福井県で年間1,000件、交通事故0プロジェクト

## データ出典

- [交通事故統計情報のオープンデータ｜警察庁Webサイト](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/index_opendata.html)

## サンプルアプリ

- [福井県の交通事故2019-2020](https://code4fukui.github.io/traffic-accident/fukui.html)
- [愛媛県の交通事故2019-2020](https://code4fukui.github.io/traffic-accident/ehime.html)
- [日本の交通死亡事故2019-2020](https://code4fukui.github.io/traffic-accident/fatal.html)

## コード値表

- [コード値表](code/code.csv)
- [コード値一覧](code)
- データソース「[各種コード表](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/2019/codebook_2019.pdf)」

## 変換プログラム

- [extract.js](extract.js) 警察庁オープンデータから条件で抽出する
- [convert.js](convert.js) コード表を元に読みやすいデータに変換する / 緯度経度を度表記に変換する

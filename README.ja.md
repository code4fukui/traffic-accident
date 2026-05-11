# traffic-accident 交通事故オープンデータ

このプロジェクトは、警察庁が公開する日本の交通事故オープンデータ（2019-2021年）を処理し、可視化するものです。データの変換、フィルタリング、分析を行うスクリプトと、可視化のためのインタラクティブなウェブベースの地図やチャートが含まれています。

これは福井県の「交通事故0プロジェクト」の一環です。

## デモ

### 地図の可視化
- [福井県 2019-2021](https://code4fukui.github.io/traffic-accident/fukui.html)
- [愛媛県 2019-2021](https://code4fukui.github.io/traffic-accident/ehime.html)
- [大阪府 2019-2020](https://code4fukui.github.io/traffic-accident/osaka.html)
- [大阪府堺市 2019-2020](https://code4fukui.github.io/traffic-accident/osaka-sakai.html)
- [日本全国の死亡事故 2019-2021](https://code4fukui.github.io/traffic-accident/fatal.html)
- [高速道路の事故 2019-2020](https://code4fukui.github.io/traffic-accident/kosoku.html)
- [高速道路の正面衝突事故 2019-2020](https://code4fukui.github.io/traffic-accident/kosoku-front.html)
- 注: 追突事故データ（2019-2020年）は100MBを超えるため、別途処理しています。

### データ分析
- [高速道路事故統計 2019-2020](https://code4fukui.github.io/traffic-accident/kosokustat.html)
- [一般事故統計 2019-2020](https://code4fukui.github.io/traffic-accident/stat.html)

### データ品質
- [無効な緯度・経度を含むレコード 2019-2021](https://code4fukui.github.io/traffic-accident/error.html)

## 機能

- **データ変換**: 警察庁のShift-JISエンコードされた生のCSVファイルを、デコードされた値を持つ扱いやすいUTF-8のCSVファイルに変換します。
- **座標変換**: 緯度・経度を度分秒（DMS）形式から10進数の度（decimal degrees）形式に変換します。
- **データフィルタリング**: 都道府県（`makeFukui.js`）、事故類型（`makeFatal.js`）、場所（`makeKosoku.js`）などのさまざまな条件に基づいてデータのサブセットを生成するスクリプトが含まれています。
- **インタラクティブマップ**: カスタムウェブコンポーネント `<csv-map>` を通じて Leaflet.js を使用し、インタラクティブな地図上に事故発生地点を可視化します。
- **統計ダッシュボード**: 事故の傾向を調査するための、フィルタリング可能な円グラフを備えたシンプルな分析ダッシュボード（`stat.html`、`kosokustat.html`）を提供します。
- **データ検証**: 異常な地理座標を持つレコードを特定し、分離します（`makeError.js`）。

## はじめに

### 前提条件
- [Deno](https://deno.land/manual/getting_started/installation) ランタイム

### 使い方

1.  **リポジトリのクローン:**
    ```sh
    git clone https://github.com/code4fukui/traffic-accident.git
    cd traffic-accident
    ```

2.  **ソースデータのダウンロード:**
    - [警察庁オープンデータサイト](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/index_opendata.html)にアクセスします。
    - 2019年、2020年、2021年の本票（`honhyo`）、補充票（`hojuhyo`）、高速票（`kosokuhyo`）のCSVファイルをダウンロードします。
    - ダウンロードしたCSVファイルを `data_src/` ディレクトリに配置します。

3.  **処理スクリプトの実行:**
    - メインのビルドスクリプトを実行して、すべてのデータセットを処理します。これにより、`data_src/` からデータが読み込まれ、ファイルが処理され、結果が `data/` ディレクトリに出力されます。
    ```sh
    deno run --allow-read --allow-write make.js
    ```

4.  **結果の確認:**
    - 処理されたCSVファイルは `data/` ディレクトリに保存されます。
    - ルートディレクトリにある `.html` ファイル（例: `fukui.html`、`fatal.html`）をウェブブラウザで開き、可視化を確認します。

## 主要なスクリプト

- `make.js`: 他のすべての `make*.js` スクリプトを実行して最終的なデータセットを生成するメインのビルドスクリプトです。
- `convert.js`: `code/` ディレクトリ内のコード表を使用して、生データのフィールドを人間が読める値に変換するためのコアロジックです。座標変換も処理します。
- `readData.js`: ソースCSVから本票と高速票の事故データを読み込み、マージします。
- `make<name>.js`（例: `makeFukui.js`、`makeFatal.js`）: メインデータセットをフィルタリングし、`data/` ディレクトリに特定のCSVファイルを作成する個別のスクリプトです。
- `csv-map.js`: Leafletマップ上にCSVデータをレンダリングするためのカスタムウェブコンポーネントです。

## データソース

- **主なソース**: [交通事故統計情報のオープンデータ｜警察庁Webサイト](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/index_opendata.html)
- **コード表**: 変換スクリプトは、公式の[警察庁コードブック (PDF)](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/2019/codebook_2019.pdf) に基づく、[`code/`](code) ディレクトリにあるコード表を使用します。

## ライセンス

このプロジェクトは MIT License の下でライセンスされています。

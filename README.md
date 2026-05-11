# traffic-accident 交通事故オープンデータ

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This project processes and visualizes open data on traffic accidents in Japan (2019-2021) from the National Police Agency. It includes scripts to convert, filter, and analyze the data, along with interactive web-based maps and charts for visualization.

This is part of the "交通事故0プロジェクト" (Traffic Accident Zero Project) in Fukui Prefecture.

## Demos

### Map Visualizations
- [Fukui Prefecture 2019-2021](https://code4fukui.github.io/traffic-accident/fukui.html)
- [Ehime Prefecture 2019-2021](https://code4fukui.github.io/traffic-accident/ehime.html)
- [Osaka Prefecture 2019-2020](https://code4fukui.github.io/traffic-accident/osaka.html)
- [Sakai City, Osaka 2019-2020](https://code4fukui.github.io/traffic-accident/osaka-sakai.html)
- [Fatal Accidents in Japan 2019-2021](https://code4fukui.github.io/traffic-accident/fatal.html)
- [Expressway Accidents 2019-2020](https://code4fukui.github.io/traffic-accident/kosoku.html)
- [Expressway Head-on Collisions 2019-2020](https://code4fukui.github.io/traffic-accident/kosoku-front.html)
- Note: Rear-end collision data (2019-2020) exceeds 100MB and is being handled separately.

### Data Analysis
- [Expressway Accident Statistics 2019-2020](https://code4fukui.github.io/traffic-accident/kosokustat.html)
- [General Accident Statistics 2019-2020](https://code4fukui.github.io/traffic-accident/stat.html)

### Data Quality
- [Records with Invalid Latitude/Longitude 2019-2021](https://code4fukui.github.io/traffic-accident/error.html)

## Features

- **Data Conversion**: Converts raw, Shift-JIS encoded CSV files from the NPA into user-friendly UTF-8 CSVs with decoded values.
- **Coordinate Transformation**: Transforms latitude and longitude from Degrees-Minutes-Seconds (DMS) format into decimal degrees.
- **Data Filtering**: Includes scripts to generate subsets of data based on various criteria, such as prefecture (`makeFukui.js`), accident type (`makeFatal.js`), or location (`makeKosoku.js`).
- **Interactive Maps**: Visualizes accident locations on interactive maps using Leaflet.js via the custom `<csv-map>` web component.
- **Statistical Dashboards**: Provides simple analysis dashboards (`stat.html`, `kosokustat.html`) with filterable pie charts to explore accident trends.
- **Data Validation**: Identifies and isolates records with anomalous geographic coordinates (`makeError.js`).

## Getting Started

### Prerequisites
- [Deno](https://deno.land/manual/getting_started/installation) runtime

### Usage

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/code4fukui/traffic-accident.git
    cd traffic-accident
    ```

2.  **Download the Source Data:**
    - Visit the [NPA Open Data website](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/index_opendata.html).
    - Download the main (`honhyo`), supplementary (`hojuhyo`), and expressway (`kosokuhyo`) CSV files for the years 2019, 2020, and 2021.
    - Place the downloaded CSV files into the `data_src/` directory.

3.  **Run the Processing Scripts:**
    - Execute the main build script to process all datasets. This will read from `data_src/`, process the files, and write the results to the `data/` directory.
    ```sh
    deno run --allow-read --allow-write make.js
    ```

4.  **View the Results:**
    - The processed CSV files will be available in the `data/` directory.
    - Open the `.html` files in the root directory (e.g., `fukui.html`, `fatal.html`) in your web browser to see the visualizations.

## Key Scripts

- `make.js`: The main build script that executes all other `make*.js` scripts to generate the final datasets.
- `convert.js`: Core logic for converting raw data fields into human-readable values using the code tables in the `code/` directory. It also handles coordinate conversion.
- `readData.js`: Reads and merges the main and expressway accident data from the source CSVs.
- `make<name>.js` (e.g., `makeFukui.js`, `makeFatal.js`): Individual scripts that filter the main dataset to create specific CSV files in the `data/` directory.
- `csv-map.js`: A custom web component for rendering CSV data on a Leaflet map.

## Data Source

- **Primary Source**: [交通事故統計情報のオープンデータ｜警察庁Webサイト (Traffic Accident Statistics Open Data | National Police Agency Website)](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/index_opendata.html)
- **Code Tables**: The conversion scripts use code tables located in the [`code/`](code) directory, which are based on the official [NPA Codebook (PDF)](https://www.npa.go.jp/publications/statistics/koutsuu/opendata/2019/codebook_2019.pdf).

## License

This project is licensed under the MIT License.
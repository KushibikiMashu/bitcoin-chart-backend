extern crate csv;
extern crate chrono;

use std::{
    error::Error,
    process,
    fs::File,
};

use csv::ReaderBuilder;

use chrono::{
    NaiveDateTime,
};

struct BitcoinRecord {
    id: str,
    price: str,
    timestamp: i64,
    created_at: str,
}

impl BitcoinRecord {
    pub fn new(record: csv::StringRecord) -> BitcoinRecord {
        BitcoinRecord {
            id: record[0],
            price: record[1],
            timestamp: str_to_timestamp(&record[2]),
            created_at: record[2],
        }
    }
}

fn str_to_timestamp(datetime: &str) -> i64 {
    let dt = NaiveDateTime::parse_from_str(datetime, "%Y-%m-%d %H:%M:%S").unwrap();
    let mut timestamp: i64 = dt.timestamp();
    (timestamp - 9 * 60 * 60)
}


fn read(filenames: [&str; 3]) -> Result<(), Box<Error>> {
    for filename in &filenames {
        let f = File::open(filename)?;

        let mut rdr = ReaderBuilder::new()
            .has_headers(false)
            .from_reader(f);

        for result in rdr.records() {
            let record = result?;
            println!("{:?}", record);

//            let b_record: BitcoinRecord = BitcoinRecord::new(record);
//            println!("{:?#}", b_record);
        }
    }
    Ok(())
}

fn main() {
    let filenames = ["../data/csv/zaif.csv", "../data/csv/bitflyer.csv", "../data/csv/coincheck.csv"];

    if let Err(err) = read(filenames) {
        println!("error running example: {}", err);
        process::exit(1);
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn str_to_timestamp() {
        let dt = NaiveDateTime::parse_from_str("2019-04-30 4:53:28", "%Y-%m-%d %H:%M:%S").unwrap();
        let mut timestamp: i64 = dt.timestamp();
        timestamp = timestamp - 9 * 60 * 60;
        assert_eq!(timestamp, 1556567608);
    }
}

// 各jsonのデータをid, timestamp, created_atにする

// 1つのjsonに3つのデータを突っ込む
// {zaif: [], bitflyer:[], coincheck:[]}
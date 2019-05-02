extern crate csv;
extern crate chrono;
extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;

use std::{
    error::Error,
    process,
    fs::File,
    io::BufReader,
};
use csv::ReaderBuilder;
use chrono::NaiveDateTime;
use serde::{Serialize, Deserialize};

#[derive(Debug, Deserialize)]
struct Record {
    id: i32,
    price: i32,
    created_at: String,
}

#[derive(Debug, Serialize)]
struct BitcoinRecord {
    id: i32,
    price: i32,
    timestamp: i64,
    created_at: String,
}

impl BitcoinRecord {
    pub fn new(record: Record) -> BitcoinRecord {
        BitcoinRecord {
            id: record.id,
            price: record.price,
            timestamp: str_to_timestamp(&record.created_at),
            created_at: record.created_at,
        }
    }
}

fn str_to_timestamp(datetime: &String) -> i64 {
    let dt = NaiveDateTime::parse_from_str(datetime, "%Y-%m-%d %H:%M:%S").unwrap();
    let timestamp: i64 = dt.timestamp();
    (timestamp - 9 * 60 * 60)
}


fn read(filenames: [&str; 3]) -> Result<(), Box<Error>> {
//    let mut json : Vec<str> = vec![];

    for filename in &filenames {
        let mut rdr = ReaderBuilder::new()
            .has_headers(false)
            .from_path(filename)?;

        for result in rdr.deserialize() {
            let record: Record = result?;
            let b_record: BitcoinRecord = BitcoinRecord::new(record);
            let b_json: String = serde_json::to_string(&b_record)?;
            println!("{}", b_json);
        }
    }
    Ok(())
}

//fn write(filename: &str, json: &str)-> Result<(), Box<Error>>{
//    let mut file = File::create(filename);
//    let buf = BufReader::new(json);
//    write!(file, "{}", buf)?;
//    file.flush()?;
//    OK(())
//}

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
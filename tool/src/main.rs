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
    io::{
        BufWriter,
        prelude::*,
    },
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

fn format_filename_csv(filename: &str) -> String {
    format!("{}{}{}", "../data/csv/", filename, ".csv")
}

pub fn format_filename_json(filename: &str) -> String {
    format!("{}{}{}", "../data/new/", filename, ".json")
}

fn read(from: &str, to: &str) -> Result<(), Box<Error>> {
    println!("b");
    let mut rdr = ReaderBuilder::new()
        .has_headers(false)
        .from_path(from)?;

    let mut f = File::create(to)?;
    let mut buffer = BufWriter::new(f);

    buffer.write(b"[");
    for result in rdr.deserialize() {
        let record: Record = result?;
        let b_record: BitcoinRecord = BitcoinRecord::new(record);
        let json = serde_json::to_string(&b_record)?;
        buffer.write(&json.into_bytes());
        println!("{}", &b_record.id);
        &buffer.write(b",");
    }
    buffer.write(b"]");

    Ok(())
}

fn main() {
    let filenames = ["zaif", "bitflyer", "coincheck"];

    for filename in &filenames {
        let mut from = String::from("../data/csv/");
        let mut to = String::from("../data/new/");
        from.push_str(filename);
        to.push_str(filename);
        from.push_str(".csv");
        to.push_str(".json");
        println!("{}", from);
        println!("{}", to);

        read(&from, &to);

//        if let Err(err) = read(filename) {
//            println!("error running example: {}", err);
//            process::exit(1);
//        }
    }
}

#[cfg(test)]
mod test {
    use chrono::NaiveDateTime;
    use super::*;

    #[test]
    fn test_str_to_timestamp() {
        let dt = NaiveDateTime::parse_from_str("2019-04-30 4:53:28", "%Y-%m-%d %H:%M:%S").unwrap();
        let mut timestamp: i64 = dt.timestamp();
        timestamp = timestamp - 9 * 60 * 60;
        assert_eq!(timestamp, 1556567608);
    }

    #[test]
    fn test_format_filename_csv() {
        let filename = format_filename_csv("zaif");
        assert_eq!(&filename, "../data/csv/zaif.csv");
    }

    #[test]
    fn test_format_filename_json() {
        let filename = format_filename_json("zaif");
        assert_eq!(&filename, "../data/new/zaif.json");
    }
}

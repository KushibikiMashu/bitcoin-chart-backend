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

fn read(from: &str, to: &str) -> Result<(), Box<Error>> {
    println!("b");
    let mut rdr = ReaderBuilder::new()
        .has_headers(false)
        .from_path(from)?;

    let mut json: Vec<String> = vec![];
    let mut f = File::create(to)?;

    // bufferに格納したいが、serde_jsonのto_writerの引数の型がbufferではないため、
    // IOにそのままfileを利用している
    //  let mut buffer = BufWriter::new(f);

    f.write(b"[");
    for result in rdr.deserialize() {
        let record: Record = result?;
        let b_record: BitcoinRecord = BitcoinRecord::new(record);
        serde_json::to_writer(&f, &b_record)?;
        println!("{}", &b_record.id);
        &f.write(b",");
    }
    f.write(b"]");

    Ok(())
}

fn main() {
    let filenames = ["zaif", "bitflyer", "coincheck"];
    println!("a");

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
    use super::*;

    #[test]
    fn str_to_timestamp() {
        let dt = NaiveDateTime::parse_from_str("2019-04-30 4:53:28", "%Y-%m-%d %H:%M:%S").unwrap();
        let mut timestamp: i64 = dt.timestamp();
        timestamp = timestamp - 9 * 60 * 60;
        assert_eq!(timestamp, 1556567608);
    }
}

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

fn str_to_timestamp(datetime: &str) -> i64 {
    let dt = NaiveDateTime::parse_from_str(datetime, "%Y-%m-%d %H:%M:%S").unwrap();
    let timestamp: i64 = dt.timestamp();
    (timestamp - 9 * 60 * 60)
}

fn format_filename_csv(filename: &str) -> String {
    format!("{}{}{}", "../data/csv/", filename, ".csv")
}

fn format_filename_json(filename: &str) -> String {
    format!("{}{}{}", "../data/new/", filename, ".json")
}

fn read(input: &str) -> Result<String, Box<Error>> {
    let mut rdr = ReaderBuilder::new()
        .has_headers(false)
        .from_path(&input)?;

    // 下記のコードはrustっぽくない気がする
    // vecに格納してstringとして結合するのもあり
    let mut json = String::from("[");
    for result in rdr.deserialize() {
        let record: Record = result?;
        let b_record = BitcoinRecord::new(record);
        println!("{}", &b_record.id);

        let mut obj = serde_json::to_string(&b_record)?;
        obj.push_str(",");
        json.push_str(&obj);
    }
    json.pop();
    json.push_str("]");

    Ok(json)
}

fn write(output: String, content: String) -> Result<(), Box<Error>> {
    let f = File::create(output)?;
    let mut buffer = BufWriter::new(f);
    buffer.write(&content.into_bytes())?;

    Ok(())
}

fn main() {
    let filenames = ["zaif", "bitflyer", "coincheck"];

    for filename in &filenames {
        let input: String = format_filename_csv(filename);
        let output: String = format_filename_json(filename);

        match read(&input) {
            Ok(content) => {
                if let Err(e) = write(output, content) {
                    println!("error. cannot write : {}", e);
                    process::exit(1);
                }
            },
            Err(e) => {
                println!("error. cannot read : {}", e);
                process::exit(1);
            }
        };
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

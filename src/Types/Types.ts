export interface DbSchema {
  [key: string]: Bitcoin[];
}

export interface Bitcoin {
  id: number;
  buyPrice: number;
  datetime: string;
}

export interface BitcoinPrice {
  buyPrice: number;
  datetime: string;
}

export type BitcoinPrices = BitcoinPrice[];

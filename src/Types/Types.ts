export interface ExchangeSchema {
  id: number;
  buyPrice: number;
  datetime: string;
}

export interface BitcoinPrice {
  buyPrice: number;
  datetime: string;
}

export type BitcoinPrices = BitcoinPrice[];

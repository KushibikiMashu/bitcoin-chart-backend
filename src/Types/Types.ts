export enum Exchange {
  Zaif = "zaif",
  Bitflyer = "bitflyer",
  Coincheck = "coincheck"
}

export interface DbSchema {
  [key: string]: Bitcoin[] | [];
}

export interface Bitcoin {
  id: number;
  buyPrice: number;
  datetime: string;
}

export interface BuyPriceAndDatetime {
  buyPrice: number;
  datetime: string;
}

export type BitcoinChartPlot = number[];

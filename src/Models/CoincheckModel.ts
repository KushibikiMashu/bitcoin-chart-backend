import { coincheckDb } from "./Config";
import { readFileSync } from "fs";
import ExchangeModelInterface from "./ExchangeModelInterface";
import { Bitcoin, BitcoinChartPlot, Exchange } from "../Types/Types";

export default class CoincheckModel implements ExchangeModelInterface {
  private db;
  private table;

  constructor() {
    this.db = coincheckDb;
    this.init();
    this.table = coincheckDb.get(Exchange.Coincheck);
  }

  init(): void {
    this.db.defaults({ coincheck: null }).write();
  }

  migrate(): void {
    if (this.table.value() !== null) return;
    const json = JSON.parse(
      readFileSync(`data/json/${Exchange.Coincheck}.json`, "utf8")
    );
    this.db.set(Exchange.Coincheck, json).write();
  }

  getAll(): Bitcoin[] {
    return this.table.value();
  }

  getChartPlots(): BitcoinChartPlot[] {
    const value: Bitcoin[] = this.table.value();
    return value.map(v => ({
      price: v.buyPrice,
      datetime: new Date(v.datetime).getTime()
    }));
  }
}

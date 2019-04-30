import { zaifDb } from "./Config";
import { readFileSync } from "fs";
import ExchangeModelInterface from "./ExchangeModelInterface";
import { Exchange, BitcoinPrices } from "../Types/Types";

export default class ZaifModel implements ExchangeModelInterface {
  private db;
  private table;

  constructor() {
    this.db = zaifDb;
    this.init();
    this.table = zaifDb.get(Exchange.Zaif);
  }

  init(): void {
    this.db.defaults({ zaif: null }).write();
  }

  migrate(): void {
    if (this.table.value() !== null) return;
    const json = JSON.parse(
      readFileSync(`data/json/${Exchange.Zaif}.json`, "utf8")
    );
    this.db.set(Exchange.Zaif, json).write();
  }

  getAll(): BitcoinPrices {
    return this.table.value();
  }
}

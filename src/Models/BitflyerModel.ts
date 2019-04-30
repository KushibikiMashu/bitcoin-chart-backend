import { bitflyerDb } from "./Config";
import { readFileSync } from "fs";
import ExchangeModelInterface from "./ExchangeModelInterface";
import { BitcoinPrices, Exchange } from "../Types/Types";

export default class BitflyerModel implements ExchangeModelInterface {
  private db;
  private table;

  constructor() {
    this.db = bitflyerDb;
    this.init();
    this.table = bitflyerDb.get(Exchange.Bitflyer);
  }

  init(): void {
    this.db.defaults({ bitflyer: null }).write();
  }

  migrate(): void {
    if (this.table.value() !== null) return;
    const json = JSON.parse(
      readFileSync(`data/json/${Exchange.Bitflyer}.json`, "utf8")
    );
    this.db.set(Exchange.Bitflyer, json).write();
  }

  getAll(): BitcoinPrices {
    return this.table.value();
  }
}

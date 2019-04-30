import { zaifDb } from "./Config";
import ExchangeModelInterface from "./ExchangeModelInterface";
import { DbSchema, BitcoinPrices } from "../Types/Types";
import { readFileSync } from "fs";

export default class ZaifModel implements ExchangeModelInterface {
  private db;
  private table;

  constructor() {
    this.db = zaifDb;
    this.init();
    this.table = zaifDb.get("zaif");
  }

  init(): void {
    this.db.defaults({ zaif: [] }).write();
  }

  initialInsert(): void {
    const json = JSON.parse(readFileSync("data/json/zaif.json", "utf8"));
  }
}

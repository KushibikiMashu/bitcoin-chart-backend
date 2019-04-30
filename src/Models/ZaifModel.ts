import { zaifDb } from "./Config";
import ExchangeModelInterface from "./ExchangeModelInterface";
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
    this.db.defaults({ zaif: null }).write();
  }

  initialInsert(): void {
    if (this.table.value() !== null) return;
    const json = JSON.parse(readFileSync("data/json/zaif.json", "utf8"));
    this.db.set("zaif", json).write();
  }
}

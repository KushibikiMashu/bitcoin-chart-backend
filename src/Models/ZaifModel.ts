import { zaifDb } from "./Config";
import ExchangeModelInterface from "./ExchangeModelInterface";
import { BitcoinPrices } from "../Types/Types";

export default class ZaifModel {
  // db: =

  constructor() {}

  static initialize() {
    zaifDb.defaults({ zaif: [] }).write();

    const table = zaifDb.get("zaif");

    table.push({ id: 2, buyPrice: 3, datetime: "" }).write();
  }
}

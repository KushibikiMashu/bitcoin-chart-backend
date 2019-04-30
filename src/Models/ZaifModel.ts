import db, { ExchangeSchema } from "./Config";
import ExchangeModelInterface from "./ExchangeModelInterface";

// export default class ZaifModel implements ExchangeModelInterface{
export default class ZaifModel {
  static set(): void {
    db.defaults({ id: 0, buyPrice: 1, datetime: "string" }).write();
  }
}

import { BitcoinPrices } from "../Types/Types";

export default interface ExchangeModelInterface {
  getAll(): BitcoinPrices;
}

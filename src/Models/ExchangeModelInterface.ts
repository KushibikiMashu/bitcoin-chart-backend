import { BitcoinPrices } from "../Types/Types";

export default interface ExchangeModelInterface {
  // TODO プロパティdb, tableを記述する

  init(): void;
  initialInsert(): void;
}

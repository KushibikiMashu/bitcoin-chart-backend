import { BitcoinPrices } from "../Types/Types";

export default interface ExchangeModelInterface {
  // TODO プロパティを記述する

  // getAll(): BitcoinPrices;
  init(): void;
  initialInsert(): void;
}

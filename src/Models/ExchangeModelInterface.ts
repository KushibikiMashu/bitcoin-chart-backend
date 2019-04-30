import { ExchangeSchema } from "./Config";

export default interface ExchangeModelInterface {
  getAll(): Array<ExchangeSchema>;
}

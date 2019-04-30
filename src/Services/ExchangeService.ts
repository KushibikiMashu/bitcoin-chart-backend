import ZaifModel from "../Models/ZaifModel";
import BitflyerModel from "../Models/BitflyerModel";
import CoincheckModel from "../Models/CoincheckModel";
import { Bitcoin } from "../Types/Types";

export default class ExchangeService {
  private zaif;
  private bitflyer;
  private coincheck;

  constructor() {
    this.zaif = new ZaifModel();
    this.bitflyer = new BitflyerModel();
    this.coincheck = new CoincheckModel();
  }

  getAll(): { [key: string]: Bitcoin[] } {
    return {
      zaif: this.zaif.getAll(),
      bitflyer: this.bitflyer.getAll(),
      coincheck: this.coincheck.getAll()
    };
  }
}

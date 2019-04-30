import ZaifModel from "../Models/ZaifModel";
import BitflyerModel from "../Models/BitflyerModel";
import CoincheckModel from "../Models/CoincheckModel";
import { Bitcoin, BuyPriceAndDatetime, BitcoinChartPlot } from "../Types/Types";

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

  getAllChartPlot(): { [key: string]: BitcoinChartPlot[] } {
    return {
      zaif: ExchangeService.getChartPlot(this.zaif.getAll()),
      bitflyer: ExchangeService.getChartPlot(this.bitflyer.getAll()),
      coincheck: ExchangeService.getChartPlot(this.coincheck.getAll())
    };
  }

  static getChartPlot(values: BuyPriceAndDatetime[]): BitcoinChartPlot[] {
    return values.map(v => ({
      price: v.buyPrice,
      datetime: new Date(v.datetime).getTime()
    }));
  }
}

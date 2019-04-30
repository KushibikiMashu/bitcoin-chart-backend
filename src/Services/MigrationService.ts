import ZaifModel from "../Models/ZaifModel";
import BitflyerModel from "../Models/BitflyerModel";
import CoincheckModel from "../Models/CoincheckModel";

export default class MigrationService {
  static migrate(): void {
    new ZaifModel().migrate();
    new BitflyerModel().migrate();
    new CoincheckModel().migrate();
  }
}

import * as express from "express";
import ZaifModel from "../../Models/ZaifModel";
import BitflyerModel from "../../Models/BitflyerModel";
import CoincheckModel from "../../Models/CoincheckModel";

const router = express.Router();

// Nowにはsshログインできないため、サーバー内でmigrationを実行できない。
// このため、APIでmigrationを代用している。
router.get("/", (req: express.Request, res: express.Response) => {
  new ZaifModel().migrate();
  new BitflyerModel().migrate();
  new CoincheckModel().migrate();
  res.send("Migration Succeeded.");
});

export default router;

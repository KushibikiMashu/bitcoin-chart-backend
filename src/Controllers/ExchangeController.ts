import * as express from "express";
import ZaifModel from "../Models/ZaifModel";

const router = express.Router();

router.get("/all", (req: express.Request, res: express.Response) => {
  // ZaifModel.initialize();
  new ZaifModel().initialInsert();
  // dbから値を取り出す
  // jsonにして返却する
  res.send("/api/list");
});

export default router;

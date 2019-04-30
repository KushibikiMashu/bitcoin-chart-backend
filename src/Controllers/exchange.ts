import * as express from "express";

import ZaifModel from "../Models/ZaifModel";

const router = express.Router();

router.get("/all", (req: express.Request, res: express.Response) => {
  // dbから値を取り出す
  // jsonにして返却する
  ZaifModel.set();
  res.send("/api/list");
});

export default router;

import * as express from "express";

import { set } from "../models/zaifModel";

const router = express.Router();

router.get("/list", (req: express.Request, res: express.Response) => {
  // dbから値を取り出す
  // jsonにして返却する
  set();
  res.send("/api/list");
});

export default router;

import * as express from "express";
const router = express.Router();

router.get("/list", (req: express.Request, res: express.Response) =>
  // dbから値を取り出す
  // jsonにして返却する
  res.send("/api/list")
);

export default router;

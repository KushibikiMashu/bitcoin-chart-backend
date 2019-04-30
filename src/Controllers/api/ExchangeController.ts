import * as express from "express";

const router = express.Router();

router.get("/all", (req: express.Request, res: express.Response) => {
  // DBから値を取り出すserviceを作る
  // jsonにして返却する
  res.send("/api/list");
});

export default router;

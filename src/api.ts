import * as express from "express";
const router = express.Router();

router.get("/list", (req: express.Request, res: express.Response) =>
  res.send("/api/list")
);

export default router;

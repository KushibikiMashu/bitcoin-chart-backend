import * as express from "express";
import ExchangeService from "../../Services/ExchangeService";

const router = express.Router();

router.get("/chart", (req: express.Request, res: express.Response) => {
  res.send(new ExchangeService().getAllChartPlot()).json();
});

router.get("/all", (req: express.Request, res: express.Response) => {
  res.send(new ExchangeService().getAll()).json();
});

export default router;

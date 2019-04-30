import * as express from "express";
import exchange from "./Controllers/ExchangeController";
import ZaifModel from "./Models/ZaifModel";
import BitflyerModel from "./Models/BitflyerModel";
import CoincheckModel from "./Models/CoincheckModel";

const app = express();
const port = 3005;

app.use("/api/exchange", exchange);

app.get("/zaif", (req, res) => {
  new ZaifModel().initialInsert();
  new BitflyerModel().initialInsert();
  new CoincheckModel().initialInsert();
  res.send("ok");
});

app.get("/", (req: express.Request, res: express.Response) =>
  res.sendStatus(404)
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

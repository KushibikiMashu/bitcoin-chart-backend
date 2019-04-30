import * as express from "express";
import exchange from "./Controllers/ExchangeController";
import ZaifModel from "./Models/ZaifModel";

const app = express();
const port = 3005;

app.use("/api/exchange", exchange);

app.get("/zaif", (req, res) => {
  new ZaifModel().initialInsert();
  res.send("ok");
});

app.get("/", (req: express.Request, res: express.Response) =>
  res.sendStatus(404)
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import * as express from "express";
import exchange from "./Controllers/api/ExchangeController";
import migration from "./Controllers/api/MigrationConrtoller";

const app = express();
const port = 3005;

app.use("/api/exchange", exchange);
app.use("/api/migration", migration);

app.get("/", (req: express.Request, res: express.Response) =>
  res.sendStatus(404)
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

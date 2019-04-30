import * as express from "express";
import exchange from "./Controllers/Api/ExchangeController";
import migration from "./Controllers/Api/MigrationConrtoller";

const app = express();
const port = 3005;

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  }
);

app.use("/api/exchange", exchange);
app.use("/api/migration", migration);

app.get("/", (req: express.Request, res: express.Response) =>
  res.sendStatus(404)
);

app.listen(port, () => console.log(`Listening on port ${port}!`));

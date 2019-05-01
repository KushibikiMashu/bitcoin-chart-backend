import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import exchange from "./Controllers/Api/ExchangeController";
import migration from "./Controllers/Api/MigrationConrtoller";

const app = express();

app.use(cors());
app.use(helmet());

app.use("/api/exchange", exchange);
app.use("/api/migration", migration);

app.get("/", (req: express.Request, res: express.Response) =>
  res.sendStatus(404)
);

app.listen(3005);

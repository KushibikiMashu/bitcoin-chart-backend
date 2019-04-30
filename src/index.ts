import * as express from "express";
import exchange from "./Controllers/exchange";

const app = express();
const port = 3005;

app.use("/api/exchange", exchange);

app.get("/", (req: express.Request, res: express.Response) =>
  res.sendStatus(404)
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import * as express from "express";
import exchanges from "./controllers/exchanges";

const app = express();
const port = 3005;

app.get("/", (req: express.Request, res: express.Response) =>
  res.sendStatus(404)
);

app.use("/api/exchanges", exchanges);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

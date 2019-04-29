import * as express from "express";
import api from "./router/api";

const app = express();
const port = 3005;

app.use("/api", api);

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World!")
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

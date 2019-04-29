import * as express from "express";
const app = express();
import api from "./api";
const port = 3005;

app.use("/api", api);

app.get("/", (req: express.Request, res: express.Response) =>
  // dbから値を取り出す
  // jsonにして返却する
  res.send("Hello World!")
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

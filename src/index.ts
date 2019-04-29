import * as express from "express";
const app = express();
const port = 3005;

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World!")
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

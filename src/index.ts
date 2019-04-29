import * as express from "express";
import api from "./controllers/api";

const app = express();
const port = 3005;

app.use("/api", api);

app.get("/", (req: express.Request, res: express.Response) =>
  res.status(404).json({ message: 'File Not Found.' })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

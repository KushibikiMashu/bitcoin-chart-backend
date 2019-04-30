import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { ExchangeSchema } from "../Types/Types";

const adapter = new FileSync<ExchangeSchema>("database/db.json");
const db = low(adapter);

export default db;

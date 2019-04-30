import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

interface ExchangeSchema {
  id: number;
  buyPrice: number;
  datetime: string;
}

const adapter = new FileSync<ExchangeSchema>("database/db.json");
const db = low(adapter);

export default db;

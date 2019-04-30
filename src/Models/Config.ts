import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { DbSchema } from "../Types/Types";

export const zaifDb = low(new FileSync<DbSchema>("database/zaif.json"));

export const bitflyerDb = low(new FileSync<DbSchema>("database/bitflyer.json"));

export const coincheckDb = low(
  new FileSync<DbSchema>("database/coincheck.json")
);

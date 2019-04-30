import db from "./config";

export function set() {
  db.defaults({ id: 0, buyPrice: 0, datetime: "" }).write();
}

import { Database } from "sqlite3";
import { readFileSync } from "fs";

const db = new Database("db.sqlite")

db.exec(readFileSync("sql/users.sql").toString());
db.exec(readFileSync("sql/initial-users.sql").toString());

export default db;

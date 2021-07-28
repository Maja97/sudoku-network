import { createPool } from "mysql";

const pool = createPool({
  host: "eu-cdbr-west-01.cleardb.com",
  user: "b84a2c13a18f54",
  password: "8b7eaf25",
  database: "heroku_3cb8794d209ab6f",
  port: 3306,
});

export default pool;

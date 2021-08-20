import pool from "./index.js";
const db = {};

db.saveSudoku = (board, published) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO games (board, published) VALUES (?,?)",
      [board, published],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

export default db;

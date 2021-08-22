import pool from "./index.js";
const db = {};

db.saveSudoku = (board, published, boardName, boardImage, username, type) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO games (board, published, board_name, board_image, username, board_type) VALUES (?,?,?,?,?,?)",
      [board, published, boardName, boardImage, username, type],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

db.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM games WHERE published=1", (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

export default db;

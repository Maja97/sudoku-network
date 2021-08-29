import pool from "./index.js";

const db = {};

db.saveSolved = (boardId, username, time, rating) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO solved (board_id, username, time, rating) VALUES(?,?,?,?)",
      [boardId, username, time, rating],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

db.checkUserSolved = (boardId, username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM solved WHERE board_id = ? AND username = ?",
      [boardId, username],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

db.getAllSolvedByUser = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT board_id FROM solved WHERE username=?",
      [username],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

export default db;

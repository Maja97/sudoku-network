import pool from "./index.js";
const db = {};

const types = {
  "X-Sudoku": "X",
  "6x6": "SMALL",
  Standard: "STANDARD",
};

db.saveSudoku = (
  board,
  published,
  boardName,
  boardImage,
  username,
  type,
  date_published
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO games (board, published, board_name, board_image, username, board_type, date_published) VALUES (?,?,?,?,?,?,?)",
      [board, published, boardName, boardImage, username, type, date_published],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

db.getAll = (filters) => {
  return new Promise((resolve, reject) => {
    let { type, date } = filters;
    const params = [];
    let sql = "SELECT * FROM games WHERE published=1";
    if (type) {
      sql += " AND board_type = ?";
      params.push(types[type]);
    }

    pool.query(sql, params, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

db.getUserSudokus = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM games WHERE username = ?",
      [username],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

db.publishSudoku = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE games SET published = 1 WHERE board_id = ?",
      [id],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

db.getSudoku = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM games WHERE board_id = ?",
      [id],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

db.deleteUserFromSudoku = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE games SET username=NULL WHERE board_id = ?",
      [id],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

db.deleteSudoku = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM games WHERE board_id = ?",
      [id],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

export default db;

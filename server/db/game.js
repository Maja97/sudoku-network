import pool from "./index.js";
const db = {};

const types = {
  "X-Sudoku": "X",
  "6x6": "SMALL",
  Standard: "STANDARD",
};

const timeFilters = {
  THIS_WEEK: "This week",
  THIS_YEAR: "This year",
  THIS_MONTH: "This month",
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
    let publish;
    if (published) publish = 1;
    else publish = null;
    pool.query(
      "INSERT INTO games (board, published, board_name, board_image, username, board_type, date_published) VALUES (?,?,?,?,?,?,?)",
      [board, publish, boardName, boardImage, username, type, date_published],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

db.getAll = (filters) => {
  return new Promise((resolve, reject) => {
    let { type, publishDate, rating } = filters;

    const params = [];
    let sql = "SELECT * FROM games WHERE published=1";
    if (type) {
      sql += " AND board_type = ?";
      params.push(types[type]);
    }
    if (publishDate) {
      if (publishDate === timeFilters.THIS_WEEK) {
        sql += " AND YEARWEEK(date_published, 1) = YEARWEEK(NOW(), 1)";
      } else if (publishDate === timeFilters.THIS_MONTH) {
        sql +=
          " AND MONTH(date_published) = MONTH(NOW()) AND YEAR(date_published) = YEAR(NOW())";
      } else if (publishDate === timeFilters.THIS_YEAR) {
        sql += " AND YEAR(date_published) = YEAR(NOW())";
      }
    }
    if (rating) {
      sql += " AND ROUND(average_rating) = ?";
      params.push(rating);
    }
    if (rating === 0) {
      sql += " AND average_rating IS NULL";
    }

    sql += " ORDER BY date_published DESC";

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

db.publishSudoku = (id, dateTime) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE games SET published = 1, date_published = ? WHERE board_id = ?",
      [dateTime, id],
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

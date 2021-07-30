import pool from "./index.js";
let db = {};

db.register = (email, password, username, first_name, last_name, phone) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email],
      (err, res) => {
        if (res.length !== 0) {
          return reject(err);
        } else {
          pool.query(
            "INSERT INTO users (email, password, username, first_name, last_name, phone) VALUES (?,?,?,?,?,?)",
            [email, password, username, first_name, last_name, phone],
            (error, result) => {
              if (error) return reject(error);
              return resolve(result);
            }
          );
        }
      }
    );
  });
};

db.login = (email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

export default db;

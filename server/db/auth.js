import pool from "./index.js";
let db = {};

db.register = (email, password, username, first_name, last_name) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email],
      (err, res) => {
        if (res.length !== 0) {
          return reject(err);
        } else {
          pool.query(
            "INSERT INTO users (email, password, username, first_name, last_name) VALUES (?,?,?,?,?)",
            [email, password, username, first_name, last_name],
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

db.updateUser = (email, hash, username, firstName, lastName, oldUsername) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET username=?, email=?, password=?, first_name=?, last_name=? WHERE username=?",
      [username, email, hash, firstName, lastName, oldUsername],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

export default db;

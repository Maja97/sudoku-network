import pool from "./index.js";
const db = {};

db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, res) => {
      if (err) return reject(err);

      return resolve(res);
    });
  });
};

db.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE user_id = ?", [id], (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

db.oneByMail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};
export default db;

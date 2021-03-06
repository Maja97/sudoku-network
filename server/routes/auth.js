import { Router } from "express";
import { validationResult } from "express-validator";
import db from "../db/auth.js";
import usersDb from "../db/users.js";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import dotenv from "dotenv";
import redisClient from "../redis_connect.js";
import { verifyRefreshToken } from "../functions/auth.js";
import bcrypt from "bcryptjs";
import { loginRules, registerRules } from "../helpers/authHelper.js";
dotenv.config();

const router = Router();

router.post("/register", registerRules, async (req, res) => {
  const { email, password, username, first_name, last_name } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    bcrypt
      .hash(password, 10)
      .then(async (hash) => {
        await db.register(email, hash, username, first_name, last_name);
        res.status(200).json("Register successful");
      })
      .catch((e) => res.status(500).json("Register failed"));
  } catch (e) {
    res.status(500).json("Register failed");
  }
});

router.post("/updateUser", async (req, res) => {
  const { email, password, username, firstName, lastName, oldUsername } =
    req.body;
  try {
    bcrypt
      .hash(password, 10)
      .then(async (hash) => {
        await db.updateUser(
          email,
          hash,
          username,
          firstName,
          lastName,
          oldUsername
        );
        res.status(200).json("Update successful");
      })
      .catch((e) => {
        console.log(e);
        res.status(501).json("Could not update user");
      });
  } catch (e) {
    res.status(500).json("Update user failed");
  }
});

router.post("/login", loginRules, async (req, res) => {
  const { email, password } = req.body;
  await usersDb.oneByMail(email).then((user) => {
    const hashed = user[0].password;
    bcrypt.compare(password, hashed).then(async (result) => {
      if (result) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
          let results = await db.login(email, hashed);

          if (results.length > 0) {
            const user = { sub: results[0].email, userID: results[0].user_id };
            const token = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
              expiresIn: process.env.JWT_ACCESS_TIME,
            });
            const refreshToken = jwt.sign(
              user,
              process.env.JWT_REFRESH_SECRET,
              {
                expiresIn: process.env.JWT_REFRESH_TIME,
              }
            );
            const response = {
              token: token,
              refreshToken: refreshToken,
            };
            redisClient.get(user.userID?.toString(), (err, data) => {
              if (err) console.log(err);
              redisClient.set(
                user.userID.toString(),
                response.refreshToken,
                (err, result) => {
                  if (err) console.log(err);
                }
              );
            });

            res.status(200).json(response);
          } else {
            return res.status(401).json("User does not exist");
          }
        } catch (e) {
          console.log(e);
          res.status(500).json("Could not access database");
        }
      } else res.status(500).json("Could not login");
    });
  });
});

router.post("/logout", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwtDecode(token);
    redisClient.del(decoded.userID.toString());
    res.sendStatus(200);
  } catch (e) {
    res.status(404);
  }
});

router.post("/checkToken", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    res.sendStatus(200);
  } catch (e) {
    return res.send({ error: "-1" });
  }
});

router.post("/refreshToken", verifyRefreshToken, (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const userInfo = jwtDecode(refreshToken);
    if (userInfo && refreshToken) {
      redisClient.get(userInfo.userID.toString(), function (err, val) {
        if (err) res.status(404);
        else {
          if (val) {
            const token = jwt.sign(
              { sub: userInfo.sub, userID: userInfo.userID },
              process.env.JWT_ACCESS_SECRET,
              {
                expiresIn: process.env.JWT_ACCESS_TIME,
              }
            );
            res.status(200).json(token);
          }
        }
      });
    } else {
      res.status(401);
    }
  } catch (e) {
    res.status(401);
  }
});

export default router;

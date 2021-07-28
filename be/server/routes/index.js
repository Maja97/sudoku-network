import { json, urlencoded } from "express";
import usersRouter from "../routes/users.js";
import authRouter from "../routes/auth.js";

const routesIndex = (app) => {
  app.use(json());
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Authorization");
    next();
  });
  app.use("/users", usersRouter);
  app.use("/auth", authRouter);
};

export default routesIndex;

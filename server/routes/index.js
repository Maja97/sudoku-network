import { json } from "express";
import usersRouter from "./users.js";
import authRouter from "./auth.js";
import gameRouter from "./game.js";

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
  app.use("/game", gameRouter);
};

export default routesIndex;

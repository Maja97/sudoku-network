import { Router } from "express";
import db from "../db/users.js";
import { verifyToken } from "../functions/auth.js";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/readUserById", async (req, res) => {
  try {
    const userId = req.body.userId;
    let results = await db.one(userId);
    res.json(results[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;

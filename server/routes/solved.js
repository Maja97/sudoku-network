import { Router } from "express";
import db from "../db/solved.js";

const router = Router();

router.post("/saveSolved", async (req, res) => {
  const { boardId, username, time } = req.body;
  try {
    const results = await db.saveSolved(boardId, username, time);
    res.json(results[0]);
  } catch (e) {
    res.status(500).json({ message: "Could not save solved status" });
  }
});

router.post("/checkUserSolved", async (req, res) => {
  const { boardId, username } = req.body;
  try {
    const results = await db.checkUserSolved(boardId, username);
    res.json(results[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Could not check if user has solved the Sudoku" });
  }
});

export default router;

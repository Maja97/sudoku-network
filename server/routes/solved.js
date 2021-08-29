import { Router } from "express";
import db from "../db/solved.js";

const router = Router();

router.post("/saveSolved", async (req, res) => {
  const { boardId, username, time, rating } = req.body;
  try {
    const results = await db.saveSolved(boardId, username, time, rating);
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

router.post("/getAllSolvedByUser", async (req, res) => {
  const { username } = req.body;
  try {
    const results = await db.getAllSolvedByUser(username);
    res.json(results);
  } catch (e) {
    res.status(500).json({ message: "Could not get Sudoku solved by user" });
  }
});
export default router;

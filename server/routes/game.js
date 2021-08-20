import { Router } from "express";
import { isUnique } from "../functions/game.js";
import db from "../db/game.js";
import { verifyToken } from "../functions/auth.js";

const router = Router();

router.post("/isUnique", (req, res) => {
  const { board, count, type, row, col } = req.body;
  try {
    const unique = isUnique(board, count, type, row, col) !== 1 ? false : true;
    res.json(unique);
  } catch (e) {
    res.sendStatus(513);
  }
});

router.post("/saveSudoku", verifyToken, (req, res) => {
  const { board, published } = req.body;
  try {
    let results = db.saveSudoku(board, published);
    res.json(results[0]);
  } catch (e) {
    res.status(500).json("Sudoku not saved");
  }
});

export default router;

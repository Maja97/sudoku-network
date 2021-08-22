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

router.post("/saveSudoku", verifyToken, async (req, res) => {
  const { board, published, board_name, board_image, username, type } =
    req.body;
  try {
    let results = await db.saveSudoku(
      board,
      published,
      board_name,
      board_image,
      username,
      type
    );
    res.json(results[0]);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Sudoku not saved" });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    let results = await db.getAll();
    res.json(results);
  } catch (e) {
    res.status(500).json("Could not get all Sudokus");
  }
});

export default router;

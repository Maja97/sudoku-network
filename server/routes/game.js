import { Router } from "express";
import { isUnique } from "../functions/game.js";
import db from "../db/game.js";
import userDb from "../db/users.js";
import { verifyToken } from "../functions/auth.js";
import solveWrapper from "../functions/solve.js";

const router = Router();

router.post("/isUnique", (req, res) => {
  const { board, type } = req.body;
  try {
    const unique = solveWrapper(board, type).length === 1;
    res.json(unique);
  } catch (e) {
    res.sendStatus(513);
  }
});

router.post("/getSolution", (req, res) => {
  const { board, type } = req.body;
  try {
    const solution = solveWrapper(board, type);
    const results = solution.length === 1 ? solution : undefined;
    res.json(results[0]);
  } catch (e) {
    res.sendStatus(404);
  }
});

router.post("/saveSudoku", verifyToken, async (req, res) => {
  const {
    board,
    published,
    board_name,
    board_image,
    username,
    type,
    date_published,
  } = req.body;
  try {
    let results = await db.saveSudoku(
      board,
      published,
      board_name,
      board_image,
      username,
      type,
      date_published
    );
    console.log(results[0], "results in nodejs");
    res.json(results[0]);
  } catch (e) {
    res.status(500).json({ message: "Sudoku not saved" });
  }
});

router.post("/getAll", async (req, res) => {
  try {
    const { filters } = req.body;
    let results = await db.getAll(filters);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.status(422).json({ message: "Could not get Sudokus" });
  }
});

router.post("/getUserSudokus", async (req, res) => {
  try {
    /*  const userId = res.locals.userId;
    const user = await userDb.one(userId); */
    const username = req.body.username;
    // const currentUser = user[0].username;

    /*  if (username !== currentUser) {
      throw Error("Could not get user page");
    } */
    const results = await db.getUserSudokus(username);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.status(500).json("Could not get user Sudokus");
  }
});

router.post("/publishSudoku", async (req, res) => {
  const { id, dateTime } = req.body;
  try {
    const results = await db.publishSudoku(id, dateTime);
    res.json(results[0]);
  } catch (e) {
    res.status(500).json({ message: "Sudoku not published" });
  }
});

router.post("/getSudokuById", async (req, res) => {
  const { id } = req.body;
  try {
    const results = await db.getSudoku(id);
    res.json(results[0]);
  } catch (e) {
    res.status(500).json({ message: "Sudoku not found" });
  }
});

router.post("/deleteSudoku", async (req, res) => {
  const { id, published } = req.body;
  let results;
  try {
    if (published) {
      results = await db.deleteUserFromSudoku(id);
    } else {
      results = await db.deleteSudoku(id);
    }
    res.json(results[0]);
  } catch (e) {
    res.status(500).json({ message: "Could not delete Sudoku" });
  }
});

export default router;

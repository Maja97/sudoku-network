import { Router } from "express";
import { isUnique } from "../functions/game.js";

const router = Router();

router.post("/isUnique", (req, res) => {
  const { board, count, type, row, col } = req.body;
  try {
    res.json(isUnique(board, count, type, row, col));
  } catch (e) {
    console.log(e);
    res.sendStatus(513);
  }
});

export default router;

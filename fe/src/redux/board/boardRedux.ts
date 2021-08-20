import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellData } from "../../components/SudokuBox";
import { SudokuTypeProps } from "../../constants/sudokuTypes";

interface BoardInterface {
  board: CellData[][];
  type: SudokuTypeProps;
}

interface BoardState {
  board: BoardInterface | undefined;
}

const initialState: BoardState = {
  board: undefined,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<BoardInterface | undefined>) => {
      state.board = action.payload;
    },
    clearBoard: (state) => {
      state.board = undefined;
    },
  },
});

export const { setBoard, clearBoard } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;

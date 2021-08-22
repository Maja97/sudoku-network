export interface Sudoku {
  board: number[][];
  type: string;
  boardId?: number;
  username: string | null;
  boardName?: string;
  boardImage: any;
}

export function sudokuFromJSON(maybe: any): Sudoku {
  if (!maybe) throw Error("Object must exist");
  if (typeof maybe.board_id !== "number")
    throw Error("board id must be a number");
  if (typeof maybe.board_type !== "string")
    throw Error("board type must be string");

  return {
    board: JSON.parse(maybe.board),
    type: maybe.board_type,
    boardId: maybe.board_id,
    username: maybe.username,
    boardImage: maybe.board_image,
    boardName: maybe.board_name,
  };
}

export function sudokuToJSON(sudoku: Sudoku) {
  return {
    board: JSON.stringify(sudoku.board),
    type: sudoku.type,
    username: sudoku.username,
    board_image: sudoku.boardImage,
    board_name: sudoku.boardName,
  };
}
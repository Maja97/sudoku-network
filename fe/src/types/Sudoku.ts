export interface Sudoku {
  board: number[][];
  type: string;
  boardId?: number;
  username: string | null;
  boardName?: string;
  dateTime?: string;
  boardImage: any;
  published: number | null;
  solved?: boolean;
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
    dateTime: maybe.date_published,
    boardName: maybe.board_name,
    published: maybe.published,
  };
}

export function sudokuToJSON(sudoku: Sudoku) {
  return {
    board: JSON.stringify(sudoku.board),
    type: sudoku.type,
    username: sudoku.username,
    board_image: sudoku.boardImage,
    date_published: sudoku.dateTime,
    board_name: sudoku.boardName,
    published: sudoku.published,
  };
}

type TBoard = TBoardRow[];

type TBoardRow = TBoardCell[];
interface TBoardCell {
  type: string;
  hit: boolean;
  id?: number;
}

const board: TBoard = [
  [
    { type: "large", id: 1, hit: false }, // Represents position A0
    { type: "small", id: 2, hit: false }, // Represents position A1
    { type: "small", id: 2, hit: false }, // Represents position A2
  ],
  [
    { type: "large", id: 1, hit: true }, // Represents position B0
    { type: "empty", hit: false }, // Represents position B1
    { type: "empty", hit: false }, // Represents position B2
  ],
  [
    { type: "large", id: 1, hit: false }, // Represents position C0
    { type: "empty", hit: false }, // Represents position C1
    { type: "empty", hit: false }, // Represents position C2
  ],
];

function printBoard(board: TBoard, debugMode: boolean) {
  const rows = ["A", "B", "C"];
  const displayBoard: { [key: string]: string[] } = {};

  board.forEach((row, index) => {
    displayBoard[rows[index]] = row.map((cell) => {
      if (cell.hit) {
        return "❗";
      } else if (debugMode) {
        if (cell.type === "large") return "🔵";
        if (cell.type === "small") return "🟠";
      }
      return "-";
    });
  });

  console.table(displayBoard);
}

import { TBoard } from "./types";

export function createBoard(boardSize: number) {
  // This is just a thing to check if it prints correctly
  const board = [
    [
      { type: "large", id: 1, hit: false }, // A0
      // Changed hit to true
      { type: "small", hit: false }, // A1 👈 Here we can see I changed "hit" to true
      { type: "small", hit: false }, // A2
      { type: "empty", hit: false },
    ],
    [
      { type: "large", id: 1, hit: false }, // B0
      { type: "empty", hit: false }, // B1
      { type: "empty", hit: false }, // B2
      { type: "empty", hit: false },
    ],
    [
      { type: "large", id: 1, hit: false }, // C0
      { type: "empty", hit: false }, // C1
      { type: "empty", hit: false }, // C2
      { type: "empty", hit: false },
    ],
    [
      { type: "empty", hit: false }, // D0
      { type: "empty", hit: false }, // D1
      { type: "empty", hit: false }, // D2
      { type: "empty", hit: false },
    ],
  ];

  return board;
}

export function printBoard(board: TBoard, debugMode: boolean) {
  const displayBoard: { [key: string]: string[] } = {};
  const rowLabels = generateRowLabels(board.length);

  board.forEach((row, index) => {
    displayBoard[rowLabels[index]] = row.map((cell) => {
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

function generateRowLabels(boardSize: number): string[] {
  console.log("generate Size", boardSize);
  const options = ["A", "B", "C", "D", "E", "F"];

  return options.slice(0, boardSize);
}

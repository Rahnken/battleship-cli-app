import { initialFleet } from "./config";
import { Board, BoardCell, CellType } from "./types";

export function generateRowLabels(boardSize: number): string[] {
  const options = ["A", "B", "C", "D", "E", "F"];
  return options.slice(0, boardSize + 1);
}
export function getCellSymbol(cell: BoardCell, debug: boolean): string {
  if (debug) {
    if (!cell.hit) {
      return cell.type !== "empty" ? initialFleet[cell.type].symbol : "-";
    } else {
      return cell.type !== "empty" ? "❗" : "x";
    }
  } else {
    return cell.hit ? (cell.type !== "empty" ? "❗" : "x") : "-";
  }
}

export function getCell(board: Board, row: string, col: number): BoardCell {
  return board.cells[row][col];
}

export function setCell(
  board: Board,
  row: string,
  col: number,
  type: CellType,
  id?: number
): void {
  board.cells[row][col] = { type, hit: false, id };
}

export function hitCell(board: Board, row: string, col: number): void {
  board.cells[row][col].hit = true;
}

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function printWin() {
  return console.log(`
========================================
 __     ______  _    _   __          _______ _   _ _ 
 \\ \\   / / __ \\| |  | |  \\ \\        / /_   _| \\ | | |
  \\ \\_/ / |  | | |  | |   \\ \\  /\\  / /  | | |  \\| | |
   \\   /| |  | | |  | |    \\ \\/  \\/ /   | | | . \` | |
    | | | |__| | |__| |     \\  /\\  /   _| |_| |\\  |_|
    |_|  \\____/ \\____/       \\/  \\/   |_____|_| \\_(_)
                                                     
========================================
`);
}

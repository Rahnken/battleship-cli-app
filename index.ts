import { Board } from "./types";
import * as rls from "readline-sync";
import { printWin } from "./utils";
import { createBoard, placeShipsOnBoard, printBoard } from "./board";
import { fleetForGridSize } from "./config";

function playGame() {
  console.log("Welcome to Battleship 🚢");

  const boardSize = ["4x4", "5x5", "6x6"];
  const index = rls.keyInSelect(boardSize, "Choose a board size");
  const boardLength = parseInt(boardSize[index][0]);

  if (index === -1) {
    console.log("Cancelled setup, please try again");
    return;
  }

  console.log(`You chose ${boardSize[index]}. Setting up board now!`);
  const newBoard = createBoard(boardLength);

  setupGame(newBoard);
  printBoard(newBoard, true);

  // printWin();
}

function setupGame(board: Board) {
  placeShipsOnBoard(board, fleetForGridSize[board.size]);
}

playGame();

import { TBoard } from "./types";
import * as rls from "readline-sync";
import { createBoard, printBoard } from "./utils";

let board: TBoard;

function playGame() {
  console.log("Welcome to Battleship 🚢");

  const boardSize = ["4x4", "5x5", "6x6"];
  const index = rls.keyInSelect(boardSize, "Choose a board size");

  if (index === -1) {
    console.log("Cancelled setup, please try again");
    return;
  }

  console.log(`You chose ${boardSize[index]}. Setting up board now!`);
  const newBoard = createBoard(parseInt(boardSize[index][0]));
  console.log(boardSize[index][0]);
  printBoard(newBoard, true);
}

playGame();

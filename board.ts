import {
  Board,
  BoardRow,
  CellType,
  PosX,
  PosY,
  Ship,
  ShipConfig,
} from "./types";
import { generateRowLabels, getCellSymbol, getRandomInt } from "./utils";

const gridColumns: PosX[] = ["1", "2", "3", "4", "5", "6"];
const gridRows: PosY[] = ["A", "B", "C", "D", "E", "F"];

export function createBoard(size: number): Board {
  const cells: { [key: string]: BoardRow } = {};
  const rowLabels = generateRowLabels(size);

  for (let i = 0; i < size; i++) {
    cells[rowLabels[i]] = Array(size)
      .fill(null)
      .map(() => ({
        type: "empty",
        hit: false,
      }));
  }

  return { cells, size };
}

const generateShip = (board: Board, shipConfig: ShipConfig): Ship | null => {
  const orientation: Ship["orientation"] =
    Math.random() < 0.5 ? "horizontal" : "vertical";
  console.log(`Trying to place ship, ${shipConfig.type} ,${orientation}`);
  const boardLength = board.size;
  const startPosX = gridColumns[getRandomInt(boardLength)];
  const startPosY = gridRows[getRandomInt(boardLength)];

  if (
    !checkIfShipFitsTheGrid(
      orientation,
      startPosX,
      startPosY,
      shipConfig.length,
      boardLength
    )
  ) {
    return generateShip(board, shipConfig);
  }

  const ship: Ship = {
    type: shipConfig.type,
    startPosX,
    startPosY,
    orientation,
    length: shipConfig.length,
  };
  const shipCoords = setShipCoordinates(ship, shipConfig.length);

  if (checkOverlap(board, shipCoords)) {
    return generateShip(board, shipConfig);
  }

  return ship;
};

export function formatBoard(
  board: Board,
  debug: boolean
): { [key: string]: string[] } {
  return Object.entries(board.cells).reduce((acc, [key, row]) => {
    acc[key] = row.map((cell) => getCellSymbol(cell, debug));
    return acc;
  }, {} as { [key: string]: string[] });
}

export function printBoard(board: Board, debugMode: boolean) {
  const boardToPrint = formatBoard(board, debugMode);
  console.table(boardToPrint);
}

const checkIfShipFitsTheGrid = (
  orientation: Ship["orientation"],
  startPosX: string,
  startPosY: string,
  shipLength: number,
  gridSize: number
): boolean => {
  if (orientation === "horizontal") {
    const startX = parseInt(startPosX) - 1;
    return startX + shipLength <= gridSize;
  } else {
    // vertical
    const startY = startPosY.charCodeAt(0) - "A".charCodeAt(0);
    return startY + shipLength <= gridSize;
  }
};

const setShipCoordinates = (ship: Ship, shipLength: number): string[] => {
  const coords: string[] = [];
  const [startX, startY] = [
    gridColumns.indexOf(ship.startPosX),
    gridRows.indexOf(ship.startPosY),
  ];

  for (let i = 0; i < shipLength; i++) {
    const [x, y] =
      ship.orientation === "horizontal"
        ? [gridColumns[startX + i], ship.startPosY]
        : [ship.startPosX, gridRows[startY + i]];
    coords.push(`${y}${x}`);
  }

  return coords;
};

const checkOverlap = (board: Board, coords: string[]): boolean => {
  return coords.some((coord) => {
    const [y, x] = coord.split("");
    return board.cells[y][Number(x) - 1].type !== "empty";
  });
};

export const placeShipsOnBoard = (
  board: Board,
  shipConfigs: ShipConfig[]
): Board => {
  const updatedBoard = { ...board };
  const ships: Ship[] = [];

  for (const config of shipConfigs) {
    for (let i = 0; i < config.count; i++) {
      const ship = generateShip(updatedBoard, config);
      if (ship) {
        ships.push(ship);
        updateBoardWithShip(updatedBoard, ship);
      }
    }
  }

  return updatedBoard;
};

const updateBoardWithShip = (board: Board, ship: Ship): void => {
  const coords = setShipCoordinates(ship, ship.length);
  coords.forEach((coord) => {
    const [y, x] = coord.split("");
    board.cells[y][Number(x) - 1].type = ship.type;
  });
};

export type CellType = "empty" | "large" | "small";
export type PosX = "1" | "2" | "3" | "4" | "5" | "6";
export type PosY = "A" | "B" | "C" | "D" | "E" | "F";

export interface BoardCell {
  type: CellType;
  hit: boolean;
  id?: number;
}
export interface ShipConfig {
  type: CellType;
  length: number;
  count: number;
}

export interface Ship {
  type: CellType;
  length: number;
  startPosX: PosX;
  startPosY: PosY;
  orientation: "vertical" | "horizontal";
}

export type BoardRow = BoardCell[];

export interface Board {
  cells: { [key: string]: BoardRow };
  size: number;
}

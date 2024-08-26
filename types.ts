type TBoard = TBoardRow[];

type TBoardRow = TBoardCell[];
type TBoardCell = {
  type: string;
  hit: boolean;
  id?: number;
};

export { TBoard };

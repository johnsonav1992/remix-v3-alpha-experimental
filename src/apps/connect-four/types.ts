export type Player = "red" | "yellow";

export type CellValue = Player | null;

export type Board = CellValue[][];

export interface Position {
	row: number;
	col: number;
}

export interface WinInfo {
	winner: Player;
	positions: Position[];
}

export interface FallingPiece {
	col: number;
	targetRow: number;
	player: Player;
}

export interface GameState {
	board: Board;
	currentPlayer: Player;
	winner: Player | null;
	winningPositions: Position[];
	isDraw: boolean;
	redWins: number;
	yellowWins: number;
	moveCount: number;
}

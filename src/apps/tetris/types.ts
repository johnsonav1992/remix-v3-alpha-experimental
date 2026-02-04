export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export interface Position {
	x: number;
	y: number;
}

export interface Tetromino {
	type: TetrominoType;
	shape: number[][];
	position: Position;
}

export type CellValue = TetrominoType | null;

export type Board = CellValue[][];

export interface GameState {
	board: Board;
	currentPiece: Tetromino | null;
	nextPiece: TetrominoType;
	score: number;
	level: number;
	lines: number;
	gameOver: boolean;
	paused: boolean;
}

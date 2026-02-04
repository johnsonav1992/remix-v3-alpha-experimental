import type { TetrominoType } from "./types";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const CELL_SIZE = 28;

export const COLORS: Record<TetrominoType, string> = {
	I: "#4ECDC4",
	O: "#FFD93D",
	T: "#A55EEA",
	S: "#6BCF7F",
	Z: "#FF5757",
	J: "#5F9DF7",
	L: "#FFA502",
} as const;

export const SHAPES: Record<TetrominoType, number[][]> = {
	I: [
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	O: [
		[1, 1],
		[1, 1],
	],
	T: [
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0],
	],
	S: [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0],
	],
	Z: [
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0],
	],
	J: [
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0],
	],
	L: [
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0],
	],
} as const;

export const TETROMINO_TYPES: TetrominoType[] = [
	"I",
	"O",
	"T",
	"S",
	"Z",
	"J",
	"L",
];

export const POINTS = {
	single: 100,
	double: 300,
	triple: 500,
	tetris: 800,
	softDrop: 1,
	hardDrop: 2,
} as const;

export const LEVEL_SPEEDS: Record<number, number> = {
	1: 800,
	2: 720,
	3: 630,
	4: 550,
	5: 470,
	6: 380,
	7: 300,
	8: 220,
	9: 130,
	10: 100,
} as const;

import type { Player } from "./types";

export const BOARD_COLS = 7;
export const BOARD_ROWS = 6;
export const CELL_SIZE = 60;
export const WIN_LENGTH = 4;

export const COLORS: Record<Player, string> = {
	red: "#E74C3C",
	yellow: "#F1C40F",
};

export const BOARD_COLOR = "#2980B9";
export const BOARD_SHADOW = "#1A5276";
export const EMPTY_CELL_COLOR = "#1a1a2e";
export const BACKGROUND_COLOR = "#16213E";

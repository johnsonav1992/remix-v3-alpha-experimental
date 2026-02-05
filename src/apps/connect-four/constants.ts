import type { Player } from "./types";

export const BOARD_COLS = 7;
export const BOARD_ROWS = 6;
export const CELL_SIZE = 70;
export const WIN_LENGTH = 4;

export const COLORS: Record<Player, string> = {
	red: "#FF5757",
	yellow: "#FFD93D",
};

export const THEME = {
	background: "#FFFBF0",
	panel: "#1a1a2e",
	border: "#2F3542",
	text: "#2F3542",
	textLight: "#FFFBF0",
	accent: "#2980B9",
	accentDark: "#1A5276",
};

export const DROP_ANIMATION_MS = 350;

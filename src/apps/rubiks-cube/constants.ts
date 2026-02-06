export const CUBIE_SIZE = 60;
export const CUBIE_GAP = 1;
export const BORDER_RADIUS = 6;
export const STICKER_INSET = 4;

export const ANIMATION_DURATION = 300;

export const COLORS = {
	white: "#FFFFFF",
	yellow: "#FFD500",
	red: "#C41E3A",
	orange: "#FF5800",
	blue: "#0051BA",
	green: "#009E60",
	black: "#1a1a1a",
} as const;

export const THEME = {
	background: "#FFFBF0",
	panel: "#1a1a2e",
	border: "#2F3542",
	text: "#FFFFFF",
	accent: "#2980B9",
};

export const FACE_COLORS = {
	U: COLORS.white,
	D: COLORS.yellow,
	F: COLORS.green,
	B: COLORS.blue,
	R: COLORS.red,
	L: COLORS.orange,
} as const;

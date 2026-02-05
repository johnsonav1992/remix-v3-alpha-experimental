import {
	BOARD_HEIGHT,
	BOARD_WIDTH,
	SHAPES,
	TETROMINO_TYPES,
} from "./constants";
import type {
	Board,
	CellValue,
	GameState,
	Tetromino,
	TetrominoType,
} from "./types";

export type { GameState } from "./types";

export const createEmptyBoard = (): Board => {
	return Array.from({ length: BOARD_HEIGHT }, () =>
		Array.from({ length: BOARD_WIDTH }, () => null),
	);
};

export const getRandomTetromino = (): TetrominoType => {
	return TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
};

export const createTetromino = (type: TetrominoType): Tetromino => {
	const shape = SHAPES[type].map((row) => [...row]);
	const startX = Math.floor((BOARD_WIDTH - shape[0].length) / 2);
	return { type, shape, position: { x: startX, y: 0 } };
};

export const rotatePiece = (piece: Tetromino): Tetromino => {
	const { shape } = piece;
	const n = shape.length;
	const rotated: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

	for (let y = 0; y < n; y++) {
		for (let x = 0; x < n; x++) {
			rotated[x][n - 1 - y] = shape[y][x];
		}
	}

	return { ...piece, shape: rotated };
};

export const isValidPosition = (
	board: Board,
	piece: Tetromino,
	offsetX = 0,
	offsetY = 0,
): boolean => {
	const { shape, position } = piece;

	for (let y = 0; y < shape.length; y++) {
		for (let x = 0; x < shape[y].length; x++) {
			if (shape[y][x]) {
				const newX = position.x + x + offsetX;
				const newY = position.y + y + offsetY;

				if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
					return false;
				}

				if (newY >= 0 && board[newY][newX] !== null) {
					return false;
				}
			}
		}
	}

	return true;
};

export const placePiece = (board: Board, piece: Tetromino): Board => {
	const newBoard = board.map((row) => [...row]);
	const { shape, position, type } = piece;

	for (let y = 0; y < shape.length; y++) {
		for (let x = 0; x < shape[y].length; x++) {
			if (shape[y][x]) {
				const boardY = position.y + y;
				const boardX = position.x + x;

				if (
					boardY >= 0 &&
					boardY < BOARD_HEIGHT &&
					boardX >= 0 &&
					boardX < BOARD_WIDTH
				) {
					newBoard[boardY][boardX] = type;
				}
			}
		}
	}

	return newBoard;
};

export const clearLines = (
	board: Board,
): { board: Board; linesCleared: number } => {
	const newBoard = board.filter((row) => row.some((cell) => cell === null));
	const linesCleared = BOARD_HEIGHT - newBoard.length;

	const emptyRows: CellValue[][] = Array.from({ length: linesCleared }, () =>
		Array.from({ length: BOARD_WIDTH }, () => null),
	);

	return { board: [...emptyRows, ...newBoard], linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
	const basePoints = [0, 100, 300, 500, 800];
	return basePoints[linesCleared] * level;
};

export const getDropPosition = (board: Board, piece: Tetromino): number => {
	let dropY = 0;

	while (isValidPosition(board, piece, 0, dropY + 1)) {
		dropY++;
	}

	return dropY;
};

export const getGhostPiece = (board: Board, piece: Tetromino): Tetromino => {
	const dropY = getDropPosition(board, piece);
	return {
		...piece,
		position: { ...piece.position, y: piece.position.y + dropY },
	};
};

export const tryMove = (
	board: Board,
	piece: Tetromino,
	dx: number,
	dy: number,
): Tetromino | null => {
	if (!isValidPosition(board, piece, dx, dy)) {
		return null;
	}

	return {
		...piece,
		position: { x: piece.position.x + dx, y: piece.position.y + dy },
	};
};

export const tryRotate = (board: Board, piece: Tetromino): Tetromino | null => {
	const rotated = rotatePiece(piece);
	const wallKicks = [0, -1, 1, -2, 2];

	for (const kick of wallKicks) {
		if (isValidPosition(board, rotated, kick, 0)) {
			return {
				...rotated,
				position: { ...rotated.position, x: rotated.position.x + kick },
			};
		}
	}

	return null;
};

export const getHardDropResult = (
	board: Board,
	piece: Tetromino,
): { piece: Tetromino; distance: number } => {
	const distance = getDropPosition(board, piece);

	return {
		piece: {
			...piece,
			position: { ...piece.position, y: piece.position.y + distance },
		},
		distance,
	};
};

export const createGameState = (startingLevel: number): GameState => {
	const nextPieceType = getRandomTetromino();
	const currentPiece = createTetromino(nextPieceType);

	return {
		board: createEmptyBoard(),
		currentPiece,
		nextPieceType: getRandomTetromino(),
		score: 0,
		level: startingLevel,
		lines: 0,
		gameOver: !isValidPosition(createEmptyBoard(), currentPiece),
	};
};

export const spawnNextPiece = (state: GameState): GameState => {
	const currentPiece = createTetromino(state.nextPieceType);
	const gameOver = !isValidPosition(state.board, currentPiece);

	return {
		...state,
		currentPiece,
		nextPieceType: getRandomTetromino(),
		gameOver,
	};
};

export const lockCurrentPiece = (
	state: GameState,
	startingLevel: number,
): GameState => {
	if (!state.currentPiece) {
		return state;
	}

	const boardAfterPlace = placePiece(state.board, state.currentPiece);
	const { board, linesCleared } = clearLines(boardAfterPlace);
	const newLines = state.lines + linesCleared;
	const newScore = state.score + calculateScore(linesCleared, state.level);
	const newLevel = Math.min(10, Math.floor(newLines / 10) + startingLevel);

	return spawnNextPiece({
		...state,
		board,
		score: newScore,
		level: newLevel,
		lines: newLines,
	});
};

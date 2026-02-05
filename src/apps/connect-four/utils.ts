import { BOARD_COLS, BOARD_ROWS, WIN_LENGTH } from "./constants";
import type { Board, GameState, Player, Position, WinInfo } from "./types";

export const createEmptyBoard = (): Board => {
	return Array.from({ length: BOARD_ROWS }, () =>
		Array.from({ length: BOARD_COLS }, () => null),
	);
};

export const createGameState = (): GameState => ({
	board: createEmptyBoard(),
	currentPlayer: "red",
	winner: null,
	winningPositions: [],
	isDraw: false,
	redWins: 0,
	yellowWins: 0,
	moveCount: 0,
});

export const getLowestEmptyRow = (board: Board, col: number): number => {
	for (let row = BOARD_ROWS - 1; row >= 0; row--) {
		if (board[row][col] === null) {
			return row;
		}
	}
	return -1;
};

export const isColumnFull = (board: Board, col: number): boolean => {
	return board[0][col] !== null;
};

export const dropPiece = (
	board: Board,
	col: number,
	player: Player,
): { newBoard: Board; row: number } | null => {
	const row = getLowestEmptyRow(board, col);

	if (row === -1) {
		return null;
	}

	const newBoard = board.map((r, rowIndex) =>
		r.map((cell, colIndex) => {
			if (rowIndex === row && colIndex === col) {
				return player;
			}
			return cell;
		}),
	);

	return { newBoard, row };
};

const checkDirection = (
	board: Board,
	startRow: number,
	startCol: number,
	deltaRow: number,
	deltaCol: number,
	player: Player,
): Position[] | null => {
	const positions: Position[] = [];

	for (let i = 0; i < WIN_LENGTH; i++) {
		const row = startRow + i * deltaRow;
		const col = startCol + i * deltaCol;

		if (row < 0 || row >= BOARD_ROWS || col < 0 || col >= BOARD_COLS) {
			return null;
		}

		if (board[row][col] !== player) {
			return null;
		}

		positions.push({ row, col });
	}

	return positions;
};

export const checkWin = (board: Board, player: Player): WinInfo | null => {
	for (let row = 0; row < BOARD_ROWS; row++) {
		for (let col = 0; col < BOARD_COLS; col++) {
			const directions = [
				{ deltaRow: 0, deltaCol: 1 },
				{ deltaRow: 1, deltaCol: 0 },
				{ deltaRow: 1, deltaCol: 1 },
				{ deltaRow: 1, deltaCol: -1 },
			];

			for (const { deltaRow, deltaCol } of directions) {
				const positions = checkDirection(
					board,
					row,
					col,
					deltaRow,
					deltaCol,
					player,
				);

				if (positions) {
					return { winner: player, positions };
				}
			}
		}
	}

	return null;
};

export const checkDraw = (board: Board): boolean => {
	return board[0].every((cell) => cell !== null);
};

export const switchPlayer = (player: Player): Player => {
	return player === "red" ? "yellow" : "red";
};

export const isWinningPosition = (
	winningPositions: Position[],
	row: number,
	col: number,
): boolean => {
	return winningPositions.some((pos) => pos.row === row && pos.col === col);
};

export const getPreviewRow = (board: Board, col: number): number => {
	return getLowestEmptyRow(board, col);
};

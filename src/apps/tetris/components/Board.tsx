import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE } from "../constants";
import type { Board as BoardType, CellValue, Tetromino } from "../types";
import { getGhostPiece } from "../utils";
import { Cell } from "./Cell";

interface RenderCell {
	value: CellValue;
	isGhost: boolean;
}

interface BoardProps {
	board: BoardType;
	currentPiece: Tetromino | null;
	showGhost?: boolean;
}

const createRenderBoard = (
	board: BoardType,
	currentPiece: Tetromino | null,
	showGhost: boolean,
): RenderCell[][] => {
	const renderBoard: RenderCell[][] = board.map((row) =>
		row.map((cell) => ({ value: cell, isGhost: false })),
	);

	if (showGhost && currentPiece) {
		const ghostPiece = getGhostPiece(board, currentPiece);

		for (let y = 0; y < ghostPiece.shape.length; y++) {
			for (let x = 0; x < ghostPiece.shape[y].length; x++) {
				if (ghostPiece.shape[y][x]) {
					const boardY = ghostPiece.position.y + y;
					const boardX = ghostPiece.position.x + x;

					if (
						boardY >= 0 &&
						boardY < BOARD_HEIGHT &&
						boardX >= 0 &&
						boardX < BOARD_WIDTH
					) {
						if (renderBoard[boardY][boardX].value === null) {
							renderBoard[boardY][boardX] = {
								value: ghostPiece.type,
								isGhost: true,
							};
						}
					}
				}
			}
		}
	}

	if (currentPiece) {
		for (let y = 0; y < currentPiece.shape.length; y++) {
			for (let x = 0; x < currentPiece.shape[y].length; x++) {
				if (currentPiece.shape[y][x]) {
					const boardY = currentPiece.position.y + y;
					const boardX = currentPiece.position.x + x;

					if (
						boardY >= 0 &&
						boardY < BOARD_HEIGHT &&
						boardX >= 0 &&
						boardX < BOARD_WIDTH
					) {
						renderBoard[boardY][boardX] = {
							value: currentPiece.type,
							isGhost: false,
						};
					}
				}
			}
		}
	}

	return renderBoard;
};

export const Board = () => {
	return ({ board, currentPiece, showGhost = true }: BoardProps) => {
		const renderBoard = createRenderBoard(board, currentPiece, showGhost);

		return (
			<div
				css={{
					display: "grid",
					gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE}px)`,
					border: "4px solid #2F3542",
					boxShadow: "6px 6px 0 #2F3542",
					backgroundColor: "#1a1a2e",
				}}
			>
				{renderBoard.map((row, y) =>
					row.map((cell, x) => (
						<Cell
							key={`${y}-${x}`}
							value={cell.value}
							ghost={cell.isGhost}
						/>
					)),
				)}
			</div>
		);
	};
};

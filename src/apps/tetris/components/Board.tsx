import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE } from "../constants";
import type { Board as BoardType, Tetromino } from "../types";
import { getGhostPiece } from "../utils";
import { Cell } from "./Cell";

interface BoardProps {
	board: BoardType;
	currentPiece: Tetromino | null;
}

export const Board = () => {
	return ({ board, currentPiece }: BoardProps) => {
		const ghostPiece = currentPiece ? getGhostPiece(board, currentPiece) : null;
		const renderBoard = board.map((row) => [...row]);
		if (ghostPiece) {
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
							if (renderBoard[boardY][boardX] === null) {
								renderBoard[boardY][boardX] = `ghost-${ghostPiece.type}` as any;
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
							renderBoard[boardY][boardX] = currentPiece.type;
						}
					}
				}
			}
		}
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
					row.map((cell, x) => {
						const isGhost =
							typeof cell === "string" && cell.startsWith("ghost-");
						const cellValue = isGhost
							? (cell.replace("ghost-", "") as any)
							: cell;
						return <Cell key={`${y}-${x}`} value={cellValue} ghost={isGhost} />;
					}),
				)}
			</div>
		);
	};
};

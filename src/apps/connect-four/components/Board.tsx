import {
	BOARD_COLOR,
	BOARD_COLS,
	BOARD_ROWS,
	BOARD_SHADOW,
	CELL_SIZE,
} from "../constants";
import type { Board as BoardType, Player, Position } from "../types";
import { getPreviewRow, isWinningPosition } from "../utils";
import { Cell } from "./Cell";

interface BoardProps {
	board: BoardType;
	currentPlayer: Player;
	winningPositions: Position[];
	hoveredCol: number | null;
	gameOver: boolean;
	onColumnClick: (col: number) => void;
	onColumnHover: (col: number | null) => void;
}

export const Board = () => {
	return ({
		board,
		currentPlayer,
		winningPositions,
		hoveredCol,
		gameOver,
		onColumnClick,
		onColumnHover,
	}: BoardProps) => {
		const previewRow =
			hoveredCol !== null ? getPreviewRow(board, hoveredCol) : -1;

		return (
			<div
				css={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div
					css={{
						display: "grid",
						gridTemplateColumns: `repeat(${BOARD_COLS}, ${CELL_SIZE}px)`,
						gridTemplateRows: `repeat(${BOARD_ROWS}, ${CELL_SIZE}px)`,
						backgroundColor: BOARD_COLOR,
						padding: 10,
						borderRadius: 12,
						boxShadow: `0 8px 0 ${BOARD_SHADOW}, 0 12px 20px rgba(0, 0, 0, 0.4)`,
					}}
				>
					{board.map((row, rowIndex) =>
						row.map((cell, colIndex) => (
							<div
								key={`${rowIndex}-${colIndex}`}
								css={{
									cursor: gameOver ? "default" : "pointer",
								}}
								on={{
									click: () => {
										if (!gameOver) onColumnClick(colIndex);
									},
									mouseenter: () => {
										if (!gameOver) onColumnHover(colIndex);
									},
									mouseleave: () => onColumnHover(null),
								}}
							>
								<Cell
									value={cell}
									isWinning={isWinningPosition(
										winningPositions,
										rowIndex,
										colIndex,
									)}
									isPreview={hoveredCol === colIndex && rowIndex === previewRow}
									previewPlayer={currentPlayer}
								/>
							</div>
						)),
					)}
				</div>
			</div>
		);
	};
};

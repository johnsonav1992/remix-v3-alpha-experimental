import {
	BOARD_COLS,
	BOARD_ROWS,
	CELL_SIZE,
	COLORS,
	DROP_ANIMATION_MS,
	THEME,
} from "../constants";
import type {
	Board as BoardType,
	FallingPiece,
	Player,
	Position,
} from "../types";
import { getPreviewRow, isWinningPosition } from "../utils";

interface BoardProps {
	board: BoardType;
	currentPlayer: Player;
	winningPositions: Position[];
	hoveredCol: number | null;
	fallingPiece: FallingPiece | null;
	gameOver: boolean;
	onColumnClick: (col: number) => void;
	onColumnHover: (col: number | null) => void;
}

const HOLE_SIZE = CELL_SIZE - 10;

interface PieceProps {
	player: Player;
	isWinning?: boolean;
	isPreview?: boolean;
}

const Piece = () => {
	return ({ player, isWinning = false, isPreview = false }: PieceProps) => {
		const baseColor = COLORS[player];
		const darkColor = player === "red" ? "#CC4545" : "#D4B02F";
		const lightColor = player === "red" ? "#FF7A7A" : "#FFE566";

		return (
			<div
				css={{
					width: HOLE_SIZE,
					height: HOLE_SIZE,
					borderRadius: "50%",
					position: "relative",
					transition: "all 0.15s ease-out",
				}}
				style={{
					opacity: isPreview ? 0.4 : 1,
					transform: isWinning ? "scale(1.05)" : "scale(1)",
					background: `
						radial-gradient(circle at 30% 30%, ${lightColor} 0%, transparent 50%),
						radial-gradient(circle at 70% 70%, ${darkColor} 0%, transparent 50%),
						${baseColor}
					`,
					boxShadow: isWinning
						? `
							0 0 20px ${baseColor},
							0 0 30px ${baseColor},
							inset 0 3px 6px rgba(255, 255, 255, 0.4),
							inset 0 -3px 6px rgba(0, 0, 0, 0.3)
						`
						: `
							inset 0 3px 6px rgba(255, 255, 255, 0.4),
							inset 0 -3px 6px rgba(0, 0, 0, 0.3),
							inset 0 0 0 4px ${darkColor},
							inset 0 0 0 7px ${baseColor},
							inset 0 0 0 9px ${darkColor}
						`,
				}}
			>
				<div
					css={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						fontSize: 20,
						fontWeight: 900,
						fontFamily: '"Space Grotesk", system-ui, sans-serif',
						userSelect: "none",
					}}
					style={{
						color: darkColor,
						textShadow: `0 1px 0 ${lightColor}`,
						opacity: isPreview ? 0 : 0.6,
					}}
				>
					4
				</div>
			</div>
		);
	};
};

const FallingPieceElement = () => {
	return ({ player, targetRow, col }: FallingPiece) => {
		const baseColor = COLORS[player];
		const darkColor = player === "red" ? "#CC4545" : "#D4B02F";
		const lightColor = player === "red" ? "#FF7A7A" : "#FFE566";

		return (
			<div
				css={{
					position: "absolute",
					width: HOLE_SIZE,
					height: HOLE_SIZE,
					borderRadius: "50%",
					zIndex: 1,
					animation: `fall ${DROP_ANIMATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
					"@keyframes fall": {
						"0%": {
							transform: "translateY(0)",
						},
						"100%": {
							transform: `translateY(${(targetRow + 1) * CELL_SIZE}px)`,
						},
					},
				}}
				style={{
					left: col * CELL_SIZE + 5,
					top: -CELL_SIZE + 5,
					background: `
						radial-gradient(circle at 30% 30%, ${lightColor} 0%, transparent 50%),
						radial-gradient(circle at 70% 70%, ${darkColor} 0%, transparent 50%),
						${baseColor}
					`,
					boxShadow: `
						inset 0 3px 6px rgba(255, 255, 255, 0.4),
						inset 0 -3px 6px rgba(0, 0, 0, 0.3),
						inset 0 0 0 4px ${darkColor},
						inset 0 0 0 7px ${baseColor},
						inset 0 0 0 9px ${darkColor}
					`,
				}}
			>
				<div
					css={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						fontSize: 20,
						fontWeight: 900,
						fontFamily: '"Space Grotesk", system-ui, sans-serif',
						userSelect: "none",
					}}
					style={{
						color: darkColor,
						textShadow: `0 1px 0 ${lightColor}`,
						opacity: 0.6,
					}}
				>
					4
				</div>
			</div>
		);
	};
};

export const Board = () => {
	return ({
		board,
		currentPlayer,
		winningPositions,
		hoveredCol,
		fallingPiece,
		gameOver,
		onColumnClick,
		onColumnHover,
	}: BoardProps) => {
		const previewRow =
			hoveredCol !== null ? getPreviewRow(board, hoveredCol) : -1;

		return (
			<div
				css={{
					position: "relative",
					border: `4px solid ${THEME.border}`,
					boxShadow: `6px 6px 0 ${THEME.border}`,
					overflow: "hidden",
				}}
			>
				<div
					css={{
						display: "grid",
						gridTemplateColumns: `repeat(${BOARD_COLS}, ${CELL_SIZE}px)`,
						gridTemplateRows: `repeat(${BOARD_ROWS}, ${CELL_SIZE}px)`,
						backgroundColor: THEME.panel,
					}}
				>
					{board.map((row, rowIndex) =>
						row.map((cell, colIndex) => {
							const isFallingCell =
								fallingPiece &&
								fallingPiece.col === colIndex &&
								fallingPiece.targetRow === rowIndex;
							const value = isFallingCell ? null : cell;
							const isWinning = isWinningPosition(
								winningPositions,
								rowIndex,
								colIndex,
							);
							const isPreview =
								!fallingPiece &&
								hoveredCol === colIndex &&
								rowIndex === previewRow;
							const showPreview = isPreview && !value && currentPlayer;

							return (
								<div
									key={`${rowIndex}-${colIndex}`}
									css={{
										width: CELL_SIZE,
										height: CELL_SIZE,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									{value && (
										<Piece
											player={value}
											isWinning={isWinning}
										/>
									)}
									{showPreview && (
										<Piece
											player={currentPlayer}
											isPreview
										/>
									)}
								</div>
							);
						}),
					)}
				</div>
				{fallingPiece && <FallingPieceElement {...fallingPiece} />}
				<div
					css={{
						position: "absolute",
						top: 0,
						left: 0,
						display: "grid",
						gridTemplateColumns: `repeat(${BOARD_COLS}, ${CELL_SIZE}px)`,
						gridTemplateRows: `repeat(${BOARD_ROWS}, ${CELL_SIZE}px)`,
						pointerEvents: "none",
						zIndex: 2,
					}}
				>
					{board.map((row, rowIndex) =>
						row.map((_, colIndex) => (
							<div
								key={`overlay-${rowIndex}-${colIndex}`}
								css={{
									width: CELL_SIZE,
									height: CELL_SIZE,
									background: `
										radial-gradient(circle at center, transparent ${HOLE_SIZE / 2}px, ${THEME.accent} ${HOLE_SIZE / 2}px),
										radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
										radial-gradient(circle at 70% 70%, rgba(0,0,0,0.1) 0%, transparent 50%)
									`,
									boxShadow: `inset 0 0 ${HOLE_SIZE / 2}px rgba(0,0,0,0.3)`,
								}}
							/>
						)),
					)}
				</div>
				<div
					css={{
						position: "absolute",
						top: 0,
						left: 0,
						display: "grid",
						gridTemplateColumns: `repeat(${BOARD_COLS}, ${CELL_SIZE}px)`,
						gridTemplateRows: `repeat(${BOARD_ROWS}, ${CELL_SIZE}px)`,
						zIndex: 3,
					}}
				>
					{board.map((row, rowIndex) =>
						row.map((_, colIndex) => (
							<div
								key={`click-${rowIndex}-${colIndex}`}
								css={{
									width: CELL_SIZE,
									height: CELL_SIZE,
									cursor: gameOver || fallingPiece ? "default" : "pointer",
								}}
								on={{
									click: () => {
										if (!gameOver && !fallingPiece) onColumnClick(colIndex);
									},
									mouseenter: () => {
										if (!gameOver) onColumnHover(colIndex);
									},
									mouseleave: () => onColumnHover(null),
								}}
							/>
						)),
					)}
				</div>
			</div>
		);
	};
};

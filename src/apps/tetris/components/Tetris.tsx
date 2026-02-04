import type { Handle } from "@remix-run/component";
import { LEVEL_SPEEDS } from "../constants";
import type { Board as BoardType, Tetromino } from "../types";
import {
	calculateScore,
	clearLines,
	createEmptyBoard,
	createTetromino,
	getDropPosition,
	getRandomTetromino,
	isValidPosition,
	placePiece,
	rotatePiece,
} from "../utils";
import { Board } from "./Board";
import { Controls } from "./Controls";
import { NextPiece } from "./NextPiece";
import { ScorePanel } from "./ScorePanel";

export const Tetris = (handle: Handle) => {
	let board: BoardType = createEmptyBoard();
	let currentPiece: Tetromino | null = null;
	let nextPieceType = getRandomTetromino();
	let score = 0;
	let level = 1;
	let lines = 0;
	let gameOver = false;
	let paused = false;
	let gameLoopId: number | null = null;
	let lastDropTime = 0;

	const spawnPiece = (): void => {
		currentPiece = createTetromino(nextPieceType);
		nextPieceType = getRandomTetromino();
		if (!isValidPosition(board, currentPiece)) {
			gameOver = true;
			stopGameLoop();
		}
	};

	const lockPiece = (): void => {
		if (!currentPiece) return;
		board = placePiece(board, currentPiece);
		const { board: clearedBoard, linesCleared } = clearLines(board);
		board = clearedBoard;
		if (linesCleared > 0) {
			lines += linesCleared;
			score += calculateScore(linesCleared, level);
			level = Math.min(10, Math.floor(lines / 10) + 1);
		}
		spawnPiece();
	};

	const movePiece = (dx: number, dy: number): boolean => {
		if (!currentPiece || gameOver || paused) return false;
		if (isValidPosition(board, currentPiece, dx, dy)) {
			currentPiece = {
				...currentPiece,
				position: {
					x: currentPiece.position.x + dx,
					y: currentPiece.position.y + dy,
				},
			};
			return true;
		}
		return false;
	};

	const rotate = (): void => {
		if (!currentPiece || gameOver || paused) return;
		const rotated = rotatePiece(currentPiece);
		if (isValidPosition(board, rotated)) {
			currentPiece = rotated;
		} else if (isValidPosition(board, rotated, -1, 0)) {
			currentPiece = { ...rotated, position: { ...rotated.position, x: rotated.position.x - 1 } };
		} else if (isValidPosition(board, rotated, 1, 0)) {
			currentPiece = { ...rotated, position: { ...rotated.position, x: rotated.position.x + 1 } };
		} else if (isValidPosition(board, rotated, -2, 0)) {
			currentPiece = { ...rotated, position: { ...rotated.position, x: rotated.position.x - 2 } };
		} else if (isValidPosition(board, rotated, 2, 0)) {
			currentPiece = { ...rotated, position: { ...rotated.position, x: rotated.position.x + 2 } };
		}
	};

	const hardDrop = (): void => {
		if (!currentPiece || gameOver || paused) return;
		const dropY = getDropPosition(board, currentPiece);
		score += dropY * 2;
		currentPiece = {
			...currentPiece,
			position: {
				...currentPiece.position,
				y: currentPiece.position.y + dropY,
			},
		};
		lockPiece();
	};

	const softDrop = (): void => {
		if (movePiece(0, 1)) {
			score += 1;
		}
	};

	const togglePause = (): void => {
		if (gameOver) return;
		paused = !paused;
	};

	const resetGame = (): void => {
		board = createEmptyBoard();
		currentPiece = null;
		nextPieceType = getRandomTetromino();
		score = 0;
		level = 1;
		lines = 0;
		gameOver = false;
		paused = false;
		spawnPiece();
		startGameLoop();
	};

	const gameLoop = (timestamp: number): void => {
		if (!paused && !gameOver) {
			const speed = LEVEL_SPEEDS[level] || 100;
			if (timestamp - lastDropTime > speed) {
				if (!movePiece(0, 1)) {
					lockPiece();
				}
				lastDropTime = timestamp;
				handle.update();
			}
		}
		gameLoopId = requestAnimationFrame(gameLoop);
	};

	const startGameLoop = (): void => {
		if (gameLoopId === null) {
			lastDropTime = performance.now();
			gameLoopId = requestAnimationFrame(gameLoop);
		}
	};

	const stopGameLoop = (): void => {
		if (gameLoopId !== null) {
			cancelAnimationFrame(gameLoopId);
			gameLoopId = null;
		}
	};

	handle.on(document, {
		keydown(event) {
			if (gameOver) {
				if (event.key === "Enter" || event.key === " ") {
					resetGame();
					handle.update();
				}
				return;
			}
			switch (event.key) {
				case "ArrowLeft":
					event.preventDefault();
					movePiece(-1, 0);
					handle.update();
					break;
				case "ArrowRight":
					event.preventDefault();
					movePiece(1, 0);
					handle.update();
					break;
				case "ArrowDown":
					event.preventDefault();
					softDrop();
					handle.update();
					break;
				case "ArrowUp":
					event.preventDefault();
					rotate();
					handle.update();
					break;
				case " ":
					event.preventDefault();
					hardDrop();
					handle.update();
					break;
				case "p":
				case "P":
					togglePause();
					handle.update();
					break;
			}
		},
	});

	handle.signal.addEventListener("abort", stopGameLoop);

	spawnPiece();
	startGameLoop();

	return () => (
		<div
			css={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				width: "100vw",
				overflow: "hidden",
				backgroundColor: "#FFFBF0",
				backgroundImage:
					"repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(165,94,234,.03) 35px, rgba(165,94,234,.03) 70px)",
				fontFamily: '"Space Grotesk", system-ui, sans-serif',
				padding: "20px",
				boxSizing: "border-box",
			}}
		>
			<h1
				css={{
					fontSize: "42px",
					fontWeight: "900",
					margin: 0,
					marginBottom: "24px",
					color: "#2F3542",
					textTransform: "uppercase",
					letterSpacing: "-2px",
				}}
			>
				Tetris
			</h1>
			<div css={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
				<div css={{ position: "relative" }}>
					<Board board={board} currentPiece={currentPiece} />
					{(gameOver || paused) && (
						<div
							css={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: "rgba(0,0,0,0.8)",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								gap: "16px",
							}}
						>
							<div
								css={{
									fontSize: "32px",
									fontWeight: "900",
									color: gameOver ? "#FF5757" : "#FFD93D",
									textTransform: "uppercase",
								}}
							>
								{gameOver ? "Game Over" : "Paused"}
							</div>
							<div css={{ fontSize: "16px", color: "#FFFBF0" }}>
								{gameOver ? "Press Enter or Space to restart" : "Press P to resume"}
							</div>
						</div>
					)}
				</div>
				<div css={{ display: "flex", flexDirection: "column", gap: "16px" }}>
					<NextPiece type={nextPieceType} />
					<ScorePanel score={score} level={level} lines={lines} />
					<Controls />
				</div>
			</div>
		</div>
	);
};

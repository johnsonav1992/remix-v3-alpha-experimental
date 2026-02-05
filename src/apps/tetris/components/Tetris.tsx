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
	let gameStarted = false;
	let startingLevel = 1;
	let showGhost = true;
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
			const newLevel = Math.floor(lines / 10) + startingLevel;
			level = Math.min(10, newLevel);
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
			currentPiece = {
				...rotated,
				position: { ...rotated.position, x: rotated.position.x - 1 },
			};
		} else if (isValidPosition(board, rotated, 1, 0)) {
			currentPiece = {
				...rotated,
				position: { ...rotated.position, x: rotated.position.x + 1 },
			};
		} else if (isValidPosition(board, rotated, -2, 0)) {
			currentPiece = {
				...rotated,
				position: { ...rotated.position, x: rotated.position.x - 2 },
			};
		} else if (isValidPosition(board, rotated, 2, 0)) {
			currentPiece = {
				...rotated,
				position: { ...rotated.position, x: rotated.position.x + 2 },
			};
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
		movePiece(0, 1);
	};

	const togglePause = (): void => {
		if (gameOver) return;
		paused = !paused;
	};

	const startGame = (): void => {
		board = createEmptyBoard();
		currentPiece = null;
		nextPieceType = getRandomTetromino();
		score = 0;
		level = startingLevel;
		lines = 0;
		gameOver = false;
		paused = false;
		gameStarted = true;
		spawnPiece();
		startGameLoop();
	};

	const resetGame = (): void => {
		gameStarted = false;
		stopGameLoop();
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
			if (!gameStarted) {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					startGame();
					handle.update();
				}
				return;
			}
			if (gameOver) {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
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

	return () => {
		if (!gameStarted) {
			return (
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
					}}
				>
					<h1
						css={{
							fontSize: "56px",
							fontWeight: "900",
							margin: 0,
							marginBottom: "40px",
							color: "#2F3542",
							textTransform: "uppercase",
							letterSpacing: "-3px",
						}}
					>
						Tetris
					</h1>
					<div
						css={{
							display: "flex",
							flexDirection: "column",
							gap: "24px",
							padding: "32px",
							backgroundColor: "#1a1a2e",
							border: "4px solid #2F3542",
							boxShadow: "8px 8px 0 #2F3542",
							minWidth: "280px",
						}}
					>
						<div>
							<div
								css={{
									fontSize: "14px",
									fontWeight: "700",
									color: "#FFFBF0",
									textTransform: "uppercase",
									letterSpacing: "1px",
									marginBottom: "12px",
								}}
							>
								Starting Level
							</div>
							<div css={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
								{[1, 3, 5, 7, 9].map((lvl) => (
									<button
										key={lvl}
										type="button"
										on={{
											click() {
												startingLevel = lvl;
												handle.update();
											},
										}}
										css={{
											width: "44px",
											height: "44px",
											fontSize: "18px",
											fontWeight: "700",
											border: "3px solid #2F3542",
											cursor: "pointer",
											transition: "all 0.1s ease",
											"&:hover": {
												transform: "translate(-2px, -2px)",
												boxShadow: "4px 4px 0 #2F3542",
											},
										}}
										style={{
											backgroundColor: startingLevel === lvl ? "#A55EEA" : "#FFFBF0",
											color: startingLevel === lvl ? "#FFFBF0" : "#2F3542",
										}}
									>
										{lvl}
									</button>
								))}
							</div>
						</div>
						<div>
							<div
								css={{
									fontSize: "14px",
									fontWeight: "700",
									color: "#FFFBF0",
									textTransform: "uppercase",
									letterSpacing: "1px",
									marginBottom: "12px",
								}}
							>
								Ghost Piece
							</div>
							<div css={{ display: "flex", gap: "8px" }}>
								<button
									type="button"
									on={{
										click() {
											showGhost = true;
											handle.update();
										},
									}}
									css={{
										padding: "12px 24px",
										fontSize: "14px",
										fontWeight: "700",
										border: "3px solid #2F3542",
										cursor: "pointer",
										transition: "all 0.1s ease",
										"&:hover": {
											transform: "translate(-2px, -2px)",
											boxShadow: "4px 4px 0 #2F3542",
										},
									}}
									style={{
										backgroundColor: showGhost ? "#6BCF7F" : "#FFFBF0",
										color: showGhost ? "#FFFBF0" : "#2F3542",
									}}
								>
									On
								</button>
								<button
									type="button"
									on={{
										click() {
											showGhost = false;
											handle.update();
										},
									}}
									css={{
										padding: "12px 24px",
										fontSize: "14px",
										fontWeight: "700",
										border: "3px solid #2F3542",
										cursor: "pointer",
										transition: "all 0.1s ease",
										"&:hover": {
											transform: "translate(-2px, -2px)",
											boxShadow: "4px 4px 0 #2F3542",
										},
									}}
									style={{
										backgroundColor: !showGhost ? "#FF5757" : "#FFFBF0",
										color: !showGhost ? "#FFFBF0" : "#2F3542",
									}}
								>
									Off
								</button>
							</div>
						</div>
						<button
							type="button"
							on={{
								click() {
									startGame();
									handle.update();
								},
							}}
							css={{
								padding: "16px 32px",
								fontSize: "18px",
								fontWeight: "700",
								textTransform: "uppercase",
								letterSpacing: "1px",
								backgroundColor: "#FFD93D",
								color: "#2F3542",
								border: "4px solid #2F3542",
								boxShadow: "4px 4px 0 #2F3542",
								cursor: "pointer",
								transition: "all 0.1s ease",
								marginTop: "8px",
								"&:hover": {
									transform: "translate(-2px, -2px)",
									boxShadow: "6px 6px 0 #2F3542",
								},
								"&:active": {
									transform: "translate(2px, 2px)",
									boxShadow: "2px 2px 0 #2F3542",
								},
							}}
						>
							Start Game
						</button>
						<div
							css={{
								fontSize: "12px",
								color: "#57606F",
								textAlign: "center",
							}}
						>
							Press Enter or Space to start
						</div>
					</div>
				</div>
			);
		}
		return (
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
				<div css={{ display: "flex", gap: "24px", alignItems: "stretch" }}>
					<div css={{ position: "relative" }}>
						<Board board={board} currentPiece={currentPiece} showGhost={showGhost} />
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
									{gameOver ? "Press Enter or Space for menu" : "Press P to resume"}
								</div>
							</div>
						)}
					</div>
					<div css={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
						<NextPiece type={nextPieceType} />
						<ScorePanel score={score} level={level} lines={lines} />
						<Controls />
					</div>
				</div>
			</div>
		);
	};
};

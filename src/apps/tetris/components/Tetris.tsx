import type { Handle } from "@remix-run/component";
import { LEVEL_SPEEDS } from "../constants";
import {
	createGameState,
	type GameState,
	getHardDropResult,
	lockCurrentPiece,
	tryMove,
	tryRotate,
} from "../utils";
import { GameScreen } from "./GameScreen";
import { StartMenu } from "./StartMenu";

export const Tetris = (handle: Handle) => {
	let gameStarted = false;
	let startingLevel = 1;
	let showGhost = true;
	let paused = false;
	let state: GameState = createGameState(startingLevel);
	let gameLoopId: number | null = null;
	let lastDropTime = 0;

	const startGame = (): void => {
		state = createGameState(startingLevel);
		paused = false;
		gameStarted = true;
		startGameLoop();
	};

	const resetToMenu = (): void => {
		gameStarted = false;
		stopGameLoop();
	};

	const move = (dx: number, dy: number): boolean => {
		if (!state.currentPiece || state.gameOver || paused) return false;

		const moved = tryMove(state.board, state.currentPiece, dx, dy);

		if (moved) {
			state = { ...state, currentPiece: moved };
			return true;
		}

		return false;
	};

	const rotate = (): void => {
		if (!state.currentPiece || state.gameOver || paused) return;

		const rotated = tryRotate(state.board, state.currentPiece);

		if (rotated) state = { ...state, currentPiece: rotated };
	};

	const hardDrop = (): void => {
		if (!state.currentPiece || state.gameOver || paused) return;

		const { piece, distance } = getHardDropResult(
			state.board,
			state.currentPiece,
		);

		state = {
			...state,
			currentPiece: piece,
			score: state.score + distance * 2,
		};
		state = lockCurrentPiece(state, startingLevel);
	};

	const lock = (): void => {
		state = lockCurrentPiece(state, startingLevel);

		if (state.gameOver) stopGameLoop();
	};

	const gameLoop: FrameRequestCallback = (timestamp) => {
		if (!paused && !state.gameOver) {
			const speed = LEVEL_SPEEDS[state.level] || 100;

			if (timestamp - lastDropTime > speed) {
				if (!move(0, 1)) lock();

				lastDropTime = timestamp;
				handle.update();
			}
		}

		gameLoopId = requestAnimationFrame(gameLoop);
	};

	const startGameLoop = (): void => {
		if (gameLoopId !== null) return;

		lastDropTime = performance.now();
		gameLoopId = requestAnimationFrame(gameLoop);
	};

	const stopGameLoop = (): void => {
		if (gameLoopId === null) return;

		cancelAnimationFrame(gameLoopId);
		gameLoopId = null;
	};

	handle.on(document, {
		keydown: (event) => {
			if (!gameStarted) {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					startGame();
					handle.update();
				}

				return;
			}

			if (state.gameOver) {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					resetToMenu();
					handle.update();
				}

				return;
			}

			event.preventDefault();

			switch (event.key) {
				case "ArrowLeft":
					move(-1, 0);
					break;
				case "ArrowRight":
					move(1, 0);
					break;
				case "ArrowDown":
					move(0, 1);
					break;
				case "ArrowUp":
					rotate();
					break;
				case " ":
					hardDrop();
					break;
				case "p":
				case "P":
					paused = !paused;
					break;
				default:
					return;
			}

			handle.update();
		},
	});

	handle.signal.addEventListener("abort", stopGameLoop);

	return () => {
		if (!gameStarted) {
			return (
				<StartMenu
					startingLevel={startingLevel}
					showGhost={showGhost}
					onLevelChange={(lvl) => {
						startingLevel = lvl;
						handle.update();
					}}
					onGhostChange={(show) => {
						showGhost = show;
						handle.update();
					}}
					onStart={() => {
						startGame();
						handle.update();
					}}
				/>
			);
		}

		return (
			<GameScreen
				state={state}
				showGhost={showGhost}
				paused={paused}
			/>
		);
	};
};

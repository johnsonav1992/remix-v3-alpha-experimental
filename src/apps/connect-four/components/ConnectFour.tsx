import type { Handle } from "@remix-run/component";
import { BOARD_COLS, DROP_ANIMATION_MS } from "../constants";
import type { FallingPiece, GameState } from "../types";
import {
	checkDraw,
	checkWin,
	createEmptyBoard,
	createGameState,
	dropPiece,
	getLowestEmptyRow,
	isColumnFull,
	switchPlayer,
} from "../utils";
import { GameScreen } from "./GameScreen";
import { StartMenu } from "./StartMenu";

export const ConnectFour = (handle: Handle) => {
	let gameStarted = false;
	let state: GameState = createGameState();
	let hoveredCol: number | null = null;
	let fallingPiece: FallingPiece | null = null;

	const startGame = (): void => {
		state = createGameState();
		gameStarted = true;
	};

	const applyMove = (col: number): void => {
		const result = dropPiece(state.board, col, state.currentPlayer);

		if (!result) return;

		const { newBoard } = result;
		const winInfo = checkWin(newBoard, state.currentPlayer);

		if (winInfo) {
			state = {
				...state,
				board: newBoard,
				winner: winInfo.winner,
				winningPositions: winInfo.positions,
				redWins: winInfo.winner === "red" ? state.redWins + 1 : state.redWins,
				yellowWins:
					winInfo.winner === "yellow" ? state.yellowWins + 1 : state.yellowWins,
				moveCount: state.moveCount + 1,
			};
			return;
		}

		if (checkDraw(newBoard)) {
			state = {
				...state,
				board: newBoard,
				isDraw: true,
				moveCount: state.moveCount + 1,
			};
			return;
		}

		state = {
			...state,
			board: newBoard,
			currentPlayer: switchPlayer(state.currentPlayer),
			moveCount: state.moveCount + 1,
		};
	};

	const makeMove = (col: number): void => {
		if (state.winner || state.isDraw) return;
		if (col < 0 || col >= BOARD_COLS) return;
		if (isColumnFull(state.board, col)) return;
		if (fallingPiece) return;

		const targetRow = getLowestEmptyRow(state.board, col);

		if (targetRow === -1) return;

		fallingPiece = {
			col,
			targetRow,
			player: state.currentPlayer,
		};
		handle.update();

		setTimeout(() => {
			applyMove(col);
			fallingPiece = null;
			handle.update();
		}, DROP_ANIMATION_MS);
	};

	const playAgain = (): void => {
		fallingPiece = null;
		state = {
			...state,
			board: createEmptyBoard(),
			currentPlayer: "red",
			winner: null,
			winningPositions: [],
			isDraw: false,
			moveCount: 0,
		};
	};

	const setHoveredCol = (col: number | null): void => {
		hoveredCol = col;
	};

	handle.on(document, {
		keydown: (event: KeyboardEvent) => {
			if (!gameStarted) {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					startGame();
					handle.update();
				}

				return;
			}

			if (state.winner || state.isDraw) {
				if (event.key === " " || event.key === "r" || event.key === "R") {
					event.preventDefault();
					playAgain();
					handle.update();
				}

				return;
			}

			if (event.key >= "1" && event.key <= "7") {
				event.preventDefault();
				const col = parseInt(event.key, 10) - 1;
				makeMove(col);
			}
		},
	});

	return () => {
		if (!gameStarted) {
			return (
				<StartMenu
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
				hoveredCol={hoveredCol}
				fallingPiece={fallingPiece}
				onColumnClick={(col) => {
					makeMove(col);
				}}
				onColumnHover={(col) => {
					setHoveredCol(col);
					handle.update();
				}}
				onPlayAgain={() => {
					playAgain();
					handle.update();
				}}
			/>
		);
	};
};

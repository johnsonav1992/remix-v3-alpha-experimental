import type { GameState } from "../types";
import { Board } from "./Board";
import { ScorePanel } from "./ScorePanel";

interface GameScreenProps {
	state: GameState;
	hoveredCol: number | null;
	onColumnClick: (col: number) => void;
	onColumnHover: (col: number | null) => void;
	onPlayAgain: () => void;
}

export const GameScreen = () => {
	return ({
		state,
		hoveredCol,
		onColumnClick,
		onColumnHover,
		onPlayAgain,
	}: GameScreenProps) => {
		const gameOver = state.winner !== null || state.isDraw;

		return (
			<div
				css={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 24,
				}}
			>
				<ScorePanel
					currentPlayer={state.currentPlayer}
					redWins={state.redWins}
					yellowWins={state.yellowWins}
					winner={state.winner}
					isDraw={state.isDraw}
				/>
				<Board
					board={state.board}
					currentPlayer={state.currentPlayer}
					winningPositions={state.winningPositions}
					hoveredCol={hoveredCol}
					gameOver={gameOver}
					onColumnClick={onColumnClick}
					onColumnHover={onColumnHover}
				/>
				{gameOver && (
					<div
						css={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 12,
						}}
					>
						<button
							type="button"
							css={{
								padding: "12px 32px",
								fontSize: 16,
								fontWeight: 600,
								color: "#FFFBF0",
								backgroundColor: "#2980B9",
								border: "none",
								borderRadius: 8,
								cursor: "pointer",
								transition: "all 0.2s ease",
								boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
								"&:hover": {
									transform: "translateY(-2px)",
									boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
								},
								"&:active": {
									transform: "translateY(0)",
								},
							}}
							on={{ click: onPlayAgain }}
						>
							Play Again
						</button>
						<div
							css={{
								fontSize: 14,
								color: "#FFFBF0",
								opacity: 0.6,
							}}
						>
							Press SPACE or R to play again
						</div>
					</div>
				)}
				<div
					css={{
						fontSize: 14,
						color: "#FFFBF0",
						opacity: 0.6,
						textAlign: "center",
					}}
				>
					Click a column or press 1-7 to drop
				</div>
			</div>
		);
	};
};

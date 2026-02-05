import { THEME } from "../constants";
import type { FallingPiece, GameState } from "../types";
import { Board } from "./Board";
import { ScorePanel } from "./ScorePanel";

interface GameScreenProps {
	state: GameState;
	hoveredCol: number | null;
	fallingPiece: FallingPiece | null;
	onColumnClick: (col: number) => void;
	onColumnHover: (col: number | null) => void;
	onPlayAgain: () => void;
}

export const GameScreen = () => {
	return ({
		state,
		hoveredCol,
		fallingPiece,
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
					justifyContent: "center",
					height: "100vh",
					width: "100vw",
					overflow: "hidden",
					backgroundColor: THEME.background,
					backgroundImage:
						"repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(41,128,185,.03) 35px, rgba(41,128,185,.03) 70px)",
					fontFamily: '"Space Grotesk", system-ui, sans-serif',
					padding: 20,
					boxSizing: "border-box",
				}}
			>
				<h1
					css={{
						fontSize: 42,
						fontWeight: 900,
						margin: 0,
						marginBottom: 24,
						color: THEME.text,
						textTransform: "uppercase",
						letterSpacing: -2,
					}}
				>
					Connect Four
				</h1>
				<div css={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
					<Board
						board={state.board}
						currentPlayer={state.currentPlayer}
						winningPositions={state.winningPositions}
						hoveredCol={hoveredCol}
						fallingPiece={fallingPiece}
						gameOver={gameOver}
						onColumnClick={onColumnClick}
						onColumnHover={onColumnHover}
					/>
					<div
						css={{
							display: "flex",
							flexDirection: "column",
							gap: 16,
						}}
					>
						<ScorePanel
							currentPlayer={state.currentPlayer}
							redWins={state.redWins}
							yellowWins={state.yellowWins}
							winner={state.winner}
							isDraw={state.isDraw}
						/>
						<div
							css={{
								padding: "12px 16px",
								backgroundColor: THEME.panel,
								border: `4px solid ${THEME.border}`,
								boxShadow: `4px 4px 0 ${THEME.border}`,
							}}
						>
							<div
								css={{
									fontSize: 12,
									fontWeight: 700,
									color: THEME.textLight,
									textTransform: "uppercase",
									letterSpacing: 1,
									marginBottom: 8,
								}}
							>
								Controls
							</div>
							<div css={{ fontSize: 12, color: "#57606F", lineHeight: 1.6 }}>
								Click column or 1-7
								<br />R to restart
							</div>
						</div>
					</div>
				</div>
				{gameOver && (
					<div
						css={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 12,
							marginTop: 24,
						}}
					>
						<button
							type="button"
							on={{ click: onPlayAgain }}
							css={{
								padding: "16px 32px",
								fontSize: 18,
								fontWeight: 700,
								textTransform: "uppercase",
								letterSpacing: 1,
								backgroundColor: THEME.accent,
								color: THEME.textLight,
								border: `4px solid ${THEME.border}`,
								boxShadow: `4px 4px 0 ${THEME.border}`,
								cursor: "pointer",
								transition: "all 0.1s ease",
								"&:hover": {
									transform: "translate(-2px, -2px)",
									boxShadow: `6px 6px 0 ${THEME.border}`,
								},
								"&:active": {
									transform: "translate(2px, 2px)",
									boxShadow: `2px 2px 0 ${THEME.border}`,
								},
							}}
						>
							Play Again
						</button>
						<div css={{ fontSize: 12, color: THEME.text }}>
							Press SPACE or R to play again
						</div>
					</div>
				)}
			</div>
		);
	};
};

import type { GameState } from "../utils";
import { Board } from "./Board";
import { Controls } from "./Controls";
import { NextPiece } from "./NextPiece";
import { ScorePanel } from "./ScorePanel";

interface GameScreenProps {
	state: GameState;
	showGhost: boolean;
	paused: boolean;
}

export const GameScreen = () => {
	return ({ state, showGhost, paused }: GameScreenProps) => (
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
					<Board
						board={state.board}
						currentPiece={state.currentPiece}
						showGhost={showGhost}
					/>
					{(state.gameOver || paused) && <Overlay gameOver={state.gameOver} />}
				</div>
				<div
					css={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<NextPiece type={state.nextPieceType} />
					<ScorePanel
						score={state.score}
						level={state.level}
						lines={state.lines}
					/>
					<Controls />
				</div>
			</div>
		</div>
	);
};

const Overlay = () => {
	return ({ gameOver }: { gameOver: boolean }) => (
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
					textTransform: "uppercase",
				}}
				style={{ color: gameOver ? "#FF5757" : "#FFD93D" }}
			>
				{gameOver ? "Game Over" : "Paused"}
			</div>
			<div css={{ fontSize: "16px", color: "#FFFBF0" }}>
				{gameOver ? "Press Enter or Space for menu" : "Press P to resume"}
			</div>
		</div>
	);
};

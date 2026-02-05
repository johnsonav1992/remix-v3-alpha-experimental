import { COLORS, THEME } from "../constants";
import type { Player } from "../types";

interface PlayerScoreProps {
	player: Player;
	wins: number;
	isCurrentTurn: boolean;
	isWinner: boolean;
}

const PlayerScore = () => {
	return ({ player, wins, isCurrentTurn, isWinner }: PlayerScoreProps) => {
		const label = player === "red" ? "Red" : "Yellow";

		return (
			<div
				css={{
					padding: "12px 16px",
					backgroundColor: THEME.panel,
					border: `4px solid ${THEME.border}`,
					textAlign: "center",
					transition: "all 0.15s ease",
					minWidth: 80,
				}}
				style={{
					boxShadow: isCurrentTurn
						? `4px 4px 0 ${COLORS[player]}`
						: `4px 4px 0 ${THEME.border}`,
					transform: isCurrentTurn ? "translate(-2px, -2px)" : "none",
				}}
			>
				<div
					css={{
						fontSize: 12,
						fontWeight: 700,
						textTransform: "uppercase",
						letterSpacing: 1,
						marginBottom: 4,
					}}
					style={{
						color: COLORS[player],
					}}
				>
					{label}
				</div>
				<div
					css={{
						fontSize: 24,
						fontWeight: 900,
					}}
					style={{
						color: isWinner ? COLORS[player] : THEME.textLight,
					}}
				>
					{wins}
				</div>
				{isCurrentTurn && !isWinner && (
					<div
						css={{
							fontSize: 10,
							fontWeight: 700,
							color: THEME.textLight,
							textTransform: "uppercase",
							marginTop: 4,
							opacity: 0.7,
						}}
					>
						Your turn
					</div>
				)}
			</div>
		);
	};
};

interface ScorePanelProps {
	currentPlayer: Player;
	redWins: number;
	yellowWins: number;
	winner: Player | null;
	isDraw: boolean;
}

export const ScorePanel = () => {
	return ({
		currentPlayer,
		redWins,
		yellowWins,
		winner,
		isDraw,
	}: ScorePanelProps) => (
		<div
			css={{
				display: "flex",
				flexDirection: "column",
				gap: 16,
			}}
		>
			<PlayerScore
				player="red"
				wins={redWins}
				isCurrentTurn={!winner && !isDraw && currentPlayer === "red"}
				isWinner={winner === "red"}
			/>
			<PlayerScore
				player="yellow"
				wins={yellowWins}
				isCurrentTurn={!winner && !isDraw && currentPlayer === "yellow"}
				isWinner={winner === "yellow"}
			/>
			{(winner || isDraw) && (
				<div
					css={{
						padding: "12px 16px",
						backgroundColor: winner ? COLORS[winner] : THEME.panel,
						border: `4px solid ${THEME.border}`,
						boxShadow: `4px 4px 0 ${THEME.border}`,
						textAlign: "center",
					}}
				>
					<div
						css={{
							fontSize: 14,
							fontWeight: 900,
							textTransform: "uppercase",
							letterSpacing: 1,
						}}
						style={{
							color: winner ? THEME.panel : THEME.textLight,
						}}
					>
						{isDraw ? "Draw!" : "Winner!"}
					</div>
				</div>
			)}
		</div>
	);
};

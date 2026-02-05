import { COLORS } from "../constants";
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
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: "12px 24px",
					borderRadius: 8,
					transition: "all 0.2s ease",
				}}
				style={{
					backgroundColor:
						isCurrentTurn || isWinner
							? COLORS[player]
							: "rgba(255, 255, 255, 0.1)",
					transform: isCurrentTurn ? "scale(1.05)" : "scale(1)",
					boxShadow: isWinner
						? `0 0 20px ${COLORS[player]}, 0 0 40px ${COLORS[player]}`
						: isCurrentTurn
							? `0 4px 12px rgba(0, 0, 0, 0.3)`
							: "none",
				}}
			>
				<div
					css={{
						fontSize: 14,
						fontWeight: 600,
						textTransform: "uppercase",
						letterSpacing: 1,
					}}
					style={{
						color: isCurrentTurn || isWinner ? "#1a1a2e" : "#FFFBF0",
					}}
				>
					{label}
				</div>
				<div
					css={{
						fontSize: 32,
						fontWeight: 700,
					}}
					style={{
						color: isCurrentTurn || isWinner ? "#1a1a2e" : COLORS[player],
					}}
				>
					{wins}
				</div>
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
				alignItems: "center",
				gap: 16,
			}}
		>
			<div
				css={{
					display: "flex",
					gap: 24,
					alignItems: "center",
				}}
			>
				<PlayerScore
					player="red"
					wins={redWins}
					isCurrentTurn={!winner && !isDraw && currentPlayer === "red"}
					isWinner={winner === "red"}
				/>
				<div
					css={{
						fontSize: 24,
						fontWeight: 700,
						color: "#FFFBF0",
					}}
				>
					vs
				</div>
				<PlayerScore
					player="yellow"
					wins={yellowWins}
					isCurrentTurn={!winner && !isDraw && currentPlayer === "yellow"}
					isWinner={winner === "yellow"}
				/>
			</div>
			{(winner || isDraw) && (
				<div
					css={{
						fontSize: 18,
						fontWeight: 600,
						color: "#FFFBF0",
						padding: "8px 16px",
						backgroundColor: "rgba(255, 255, 255, 0.1)",
						borderRadius: 8,
					}}
				>
					{isDraw
						? "It's a Draw!"
						: `${winner === "red" ? "Red" : "Yellow"} Wins!`}
				</div>
			)}
		</div>
	);
};

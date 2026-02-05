import { BOARD_COLOR, COLORS } from "../constants";

interface StartMenuProps {
	onStart: () => void;
}

export const StartMenu = () => {
	return ({ onStart }: StartMenuProps) => (
		<div
			css={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: 32,
				minHeight: 400,
			}}
		>
			<div
				css={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 8,
				}}
			>
				<h1
					css={{
						fontSize: 48,
						fontWeight: 700,
						color: "#FFFBF0",
						margin: 0,
						textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
					}}
				>
					Connect Four
				</h1>
				<div
					css={{
						display: "flex",
						gap: 8,
					}}
				>
					{[COLORS.red, COLORS.yellow, COLORS.red, COLORS.yellow].map(
						(color, i) => (
							<div
								key={i}
								css={{
									width: 20,
									height: 20,
									borderRadius: "50%",
									boxShadow: "inset 0 -2px 4px rgba(0, 0, 0, 0.3)",
								}}
								style={{ backgroundColor: color }}
							/>
						),
					)}
				</div>
			</div>
			<div
				css={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 16,
					padding: 24,
					backgroundColor: "rgba(255, 255, 255, 0.05)",
					borderRadius: 12,
				}}
			>
				<div
					css={{
						fontSize: 16,
						color: "#FFFBF0",
						opacity: 0.8,
						textAlign: "center",
						lineHeight: 1.6,
					}}
				>
					Drop your pieces to connect four in a row!
					<br />
					Click a column or press 1-7 to drop.
				</div>
				<button
					type="button"
					on={{ click: onStart }}
					css={{
						padding: "16px 48px",
						fontSize: 20,
						fontWeight: 700,
						color: "#FFFBF0",
						backgroundColor: BOARD_COLOR,
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
				>
					Start Game
				</button>
				<div
					css={{
						fontSize: 14,
						color: "#FFFBF0",
						opacity: 0.6,
					}}
				>
					Press SPACE or ENTER to start
				</div>
			</div>
		</div>
	);
};

import { COLORS, THEME } from "../constants";

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
				height: "100vh",
				width: "100vw",
				overflow: "hidden",
				backgroundColor: THEME.background,
				backgroundImage:
					"repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(41,128,185,.03) 35px, rgba(41,128,185,.03) 70px)",
				fontFamily: '"Space Grotesk", system-ui, sans-serif',
			}}
		>
			<h1
				css={{
					fontSize: 56,
					fontWeight: 900,
					margin: 0,
					marginBottom: 40,
					color: THEME.text,
					textTransform: "uppercase",
					letterSpacing: -3,
				}}
			>
				Connect Four
			</h1>
			<div
				css={{
					display: "flex",
					flexDirection: "column",
					gap: 24,
					padding: 32,
					backgroundColor: THEME.panel,
					border: `4px solid ${THEME.border}`,
					boxShadow: `8px 8px 0 ${THEME.border}`,
					minWidth: 280,
				}}
			>
				<div
					css={{
						display: "flex",
						justifyContent: "center",
						gap: 8,
					}}
				>
					{[COLORS.red, COLORS.yellow, COLORS.red, COLORS.yellow].map(
						(color, i) => (
							<div
								key={i}
								css={{
									width: 24,
									height: 24,
									borderRadius: "50%",
									border: `3px solid ${THEME.border}`,
								}}
								style={{ backgroundColor: color }}
							/>
						),
					)}
				</div>
				<div
					css={{
						fontSize: 14,
						color: "#57606F",
						textAlign: "center",
						lineHeight: 1.6,
					}}
				>
					Drop pieces to connect four in a row!
					<br />
					Click a column or press 1-7.
				</div>
				<button
					type="button"
					on={{ click: onStart }}
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
						marginTop: 8,
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
					Start Game
				</button>
				<div css={{ fontSize: 12, color: "#57606F", textAlign: "center" }}>
					Press Enter or Space to start
				</div>
			</div>
		</div>
	);
};

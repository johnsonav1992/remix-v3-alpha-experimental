interface ScorePanelProps {
	score: number;
	level: number;
	lines: number;
}

export const ScorePanel = () => {
	return ({ score, level, lines }: ScorePanelProps) => (
		<div
			css={{
				display: "flex",
				flexDirection: "column",
				gap: "16px",
			}}
		>
			<StatBox
				label="Score"
				value={score}
			/>
			<StatBox
				label="Level"
				value={level}
			/>
			<StatBox
				label="Lines"
				value={lines}
			/>
		</div>
	);
};

const StatBox = () => {
	return ({ label, value }: { label: string; value: number }) => (
		<div
			css={{
				padding: "12px 16px",
				backgroundColor: "#1a1a2e",
				border: "4px solid #2F3542",
				boxShadow: "4px 4px 0 #2F3542",
				textAlign: "center",
			}}
		>
			<div
				css={{
					fontSize: "12px",
					fontWeight: "700",
					color: "#FFFBF0",
					textTransform: "uppercase",
					letterSpacing: "1px",
					marginBottom: "4px",
				}}
			>
				{label}
			</div>
			<div
				css={{
					fontSize: "24px",
					fontWeight: "900",
					color: "#FFD93D",
				}}
			>
				{value}
			</div>
		</div>
	);
};

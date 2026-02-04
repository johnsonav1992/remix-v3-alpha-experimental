export const Controls = () => {
	return () => (
		<div
			css={{
				padding: "16px",
				backgroundColor: "#1a1a2e",
				border: "4px solid #2F3542",
				boxShadow: "4px 4px 0 #2F3542",
			}}
		>
			<div
				css={{
					fontSize: "14px",
					fontWeight: "700",
					color: "#FFFBF0",
					textTransform: "uppercase",
					letterSpacing: "1px",
					marginBottom: "12px",
				}}
			>
				Controls
			</div>
			<div css={{ display: "flex", flexDirection: "column", gap: "6px" }}>
				<ControlRow keys="← →" action="Move" />
				<ControlRow keys="↓" action="Soft Drop" />
				<ControlRow keys="↑" action="Rotate" />
				<ControlRow keys="Space" action="Hard Drop" />
				<ControlRow keys="P" action="Pause" />
			</div>
		</div>
	);
};

const ControlRow = () => {
	return ({ keys, action }: { keys: string; action: string }) => (
		<div
			css={{ display: "flex", justifyContent: "space-between", gap: "16px" }}
		>
			<span
				css={{
					fontSize: "12px",
					fontWeight: "700",
					color: "#4ECDC4",
					fontFamily: "monospace",
				}}
			>
				{keys}
			</span>
			<span css={{ fontSize: "12px", color: "#FFFBF0" }}>{action}</span>
		</div>
	);
};

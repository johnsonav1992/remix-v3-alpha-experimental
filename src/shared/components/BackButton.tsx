interface BackButtonProps {
	onClick: () => void;
}

export function BackButton() {
	return ({ onClick }: BackButtonProps) => (
		<button
			type="button"
			on={{
				click: onClick,
			}}
			css={{
				position: "fixed",
				top: "30px",
				left: "30px",
				zIndex: 1000,
				padding: "12px 24px",
				fontSize: "14px",
				fontWeight: "700",
				backgroundColor: "#2F3542",
				color: "#FFFBF0",
				border: "4px solid #2F3542",
				cursor: "pointer",
				textTransform: "uppercase",
				letterSpacing: "1px",
				boxShadow: "4px 4px 0 rgba(47, 53, 66, 0.3)",
				transition: "transform 0.1s ease, box-shadow 0.1s ease",
				"&:hover": {
					transform: "translate(-2px, -2px)",
					boxShadow: "6px 6px 0 rgba(47, 53, 66, 0.3)",
				},
				"&:active": {
					transform: "translate(1px, 1px)",
					boxShadow: "2px 2px 0 rgba(47, 53, 66, 0.3)",
				},
			}}
		>
			← Back
		</button>
	);
}

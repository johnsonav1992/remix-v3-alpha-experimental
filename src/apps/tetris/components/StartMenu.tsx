import type { Handle } from "@remix-run/component";

interface StartMenuProps {
	startingLevel: number;
	showGhost: boolean;
	onLevelChange: (level: number) => void;
	onGhostChange: (show: boolean) => void;
	onStart: () => void;
}

export const StartMenu = (handle: Handle) => {
	return ({
		startingLevel,
		showGhost,
		onLevelChange,
		onGhostChange,
		onStart,
	}: StartMenuProps) => (
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
			}}
		>
			<h1
				css={{
					fontSize: "56px",
					fontWeight: "900",
					margin: 0,
					marginBottom: "40px",
					color: "#2F3542",
					textTransform: "uppercase",
					letterSpacing: "-3px",
				}}
			>
				Tetris
			</h1>
			<div
				css={{
					display: "flex",
					flexDirection: "column",
					gap: "24px",
					padding: "32px",
					backgroundColor: "#1a1a2e",
					border: "4px solid #2F3542",
					boxShadow: "8px 8px 0 #2F3542",
					minWidth: "280px",
				}}
			>
				<LevelSelector
					level={startingLevel}
					onChange={onLevelChange}
				/>
				<GhostToggle
					showGhost={showGhost}
					onChange={onGhostChange}
				/>
				<button
					type="button"
					on={{ click: onStart }}
					css={{
						padding: "16px 32px",
						fontSize: "18px",
						fontWeight: "700",
						textTransform: "uppercase",
						letterSpacing: "1px",
						backgroundColor: "#FFD93D",
						color: "#2F3542",
						border: "4px solid #2F3542",
						boxShadow: "4px 4px 0 #2F3542",
						cursor: "pointer",
						transition: "all 0.1s ease",
						marginTop: "8px",
						"&:hover": {
							transform: "translate(-2px, -2px)",
							boxShadow: "6px 6px 0 #2F3542",
						},
						"&:active": {
							transform: "translate(2px, 2px)",
							boxShadow: "2px 2px 0 #2F3542",
						},
					}}
				>
					Start Game
				</button>
				<div css={{ fontSize: "12px", color: "#57606F", textAlign: "center" }}>
					Press Enter or Space to start
				</div>
			</div>
		</div>
	);
};

const LevelSelector = () => {
	return ({
		level,
		onChange,
	}: {
		level: number;
		onChange: (level: number) => void;
	}) => (
		<div>
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
				Starting Level
			</div>
			<div css={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
				{[1, 3, 5, 7, 9].map((lvl) => (
					<button
						key={lvl}
						type="button"
						on={{ click: () => onChange(lvl) }}
						css={{
							width: "44px",
							height: "44px",
							fontSize: "18px",
							fontWeight: "700",
							border: "3px solid #2F3542",
							cursor: "pointer",
							transition: "all 0.1s ease",
							"&:hover": {
								transform: "translate(-2px, -2px)",
								boxShadow: "4px 4px 0 #2F3542",
							},
						}}
						style={{
							backgroundColor: level === lvl ? "#A55EEA" : "#FFFBF0",
							color: level === lvl ? "#FFFBF0" : "#2F3542",
						}}
					>
						{lvl}
					</button>
				))}
			</div>
		</div>
	);
};

const GhostToggle = () => {
	return ({
		showGhost,
		onChange,
	}: {
		showGhost: boolean;
		onChange: (show: boolean) => void;
	}) => (
		<div>
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
				Ghost Piece
			</div>
			<div css={{ display: "flex", gap: "8px" }}>
				<ToggleButton
					active={showGhost}
					color="#6BCF7F"
					label="On"
					onClick={() => onChange(true)}
				/>
				<ToggleButton
					active={!showGhost}
					color="#FF5757"
					label="Off"
					onClick={() => onChange(false)}
				/>
			</div>
		</div>
	);
};

const ToggleButton = () => {
	return ({
		active,
		color,
		label,
		onClick,
	}: {
		active: boolean;
		color: string;
		label: string;
		onClick: () => void;
	}) => (
		<button
			type="button"
			on={{ click: onClick }}
			css={{
				padding: "12px 24px",
				fontSize: "14px",
				fontWeight: "700",
				border: "3px solid #2F3542",
				cursor: "pointer",
				transition: "all 0.1s ease",
				"&:hover": {
					transform: "translate(-2px, -2px)",
					boxShadow: "4px 4px 0 #2F3542",
				},
			}}
			style={{
				backgroundColor: active ? color : "#FFFBF0",
				color: active ? "#FFFBF0" : "#2F3542",
			}}
		>
			{label}
		</button>
	);
};

import { THEME } from "../constants";
import { formatTime } from "../utils";

interface ControlsProps {
	moves: number;
	elapsedTime: number;
	isSolved: boolean;
	onScramble: () => void;
	onSolve: () => void;
	onReset: () => void;
}

export const Controls = () => {
	return ({
		moves,
		elapsedTime,
		isSolved,
		onScramble,
		onSolve,
		onReset,
	}: ControlsProps) => {
		return (
			<div
				css={{
					display: "flex",
					flexDirection: "column",
					gap: 20,
					alignItems: "center",
					padding: 20,
				}}
			>
				<div
					css={{
						display: "flex",
						gap: 20,
						fontSize: 24,
						fontWeight: "bold",
						color: THEME.panel,
					}}
				>
					<div>Moves: {moves}</div>
					<div>Time: {formatTime(elapsedTime)}</div>
				</div>
				{isSolved && (
					<div
						css={{
							fontSize: 32,
							fontWeight: "bold",
							color: THEME.accent,
							animation: "pulse 1s infinite",
							"@keyframes pulse": {
								"0%, 100%": { opacity: 1 },
								"50%": { opacity: 0.5 },
							},
						}}
					>
						SOLVED!
					</div>
				)}
				<div css={{ display: "flex", gap: 10 }}>
					<button
						type="button"
						css={{
							padding: "12px 24px",
							fontSize: 16,
							fontWeight: "bold",
							background: THEME.panel,
							color: THEME.text,
							border: `3px solid ${THEME.border}`,
							borderRadius: 8,
							cursor: "pointer",
							transition: "transform 0.1s",
							":hover": {
								transform: "translateY(-2px)",
							},
							":active": {
								transform: "translateY(0)",
							},
						}}
						on={{
							click: onScramble,
						}}
					>
						Scramble
					</button>
					<button
						type="button"
						css={{
							padding: "12px 24px",
							fontSize: 16,
							fontWeight: "bold",
							background: THEME.accent,
							color: THEME.text,
							border: `3px solid ${THEME.border}`,
							borderRadius: 8,
							cursor: "pointer",
							transition: "transform 0.1s",
							":hover": {
								transform: "translateY(-2px)",
							},
							":active": {
								transform: "translateY(0)",
							},
						}}
						on={{
							click: onSolve,
						}}
					>
						Solve
					</button>
					<button
						type="button"
						css={{
							padding: "12px 24px",
							fontSize: 16,
							fontWeight: "bold",
							background: THEME.border,
							color: THEME.text,
							border: `3px solid ${THEME.panel}`,
							borderRadius: 8,
							cursor: "pointer",
							transition: "transform 0.1s",
							":hover": {
								transform: "translateY(-2px)",
							},
							":active": {
								transform: "translateY(0)",
							},
						}}
						on={{
							click: onReset,
						}}
					>
						Reset
					</button>
				</div>
				<div
					css={{
						fontSize: 14,
						color: THEME.panel,
						textAlign: "center",
						maxWidth: 400,
						opacity: 0.7,
					}}
				>
					Drag the cube to rotate it. Drag on a face to turn it.
				</div>
			</div>
		);
	};
};

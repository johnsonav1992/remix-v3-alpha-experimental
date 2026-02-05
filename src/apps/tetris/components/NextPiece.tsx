import { COLORS, SHAPES } from "../constants";
import type { TetrominoType } from "../types";

interface NextPieceProps {
	type: TetrominoType;
}

export const NextPiece = () => {
	return ({ type }: NextPieceProps) => {
		const shape = SHAPES[type];
		const color = COLORS[type];
		return (
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
						textAlign: "center",
					}}
				>
					Next
				</div>
				<div
					css={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "2px",
					}}
				>
					{shape.map((row, y) => (
						<div
							key={y}
							css={{ display: "flex", gap: "2px" }}
						>
							{row.map((cell, x) => (
								<div
									key={x}
									css={{
										width: "16px",
										height: "16px",
										border: cell ? "2px solid #2F3542" : "none",
									}}
									style={{
										backgroundColor: cell ? color : "transparent",
									}}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		);
	};
};

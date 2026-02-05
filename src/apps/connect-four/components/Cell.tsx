import { CELL_SIZE, COLORS, EMPTY_CELL_COLOR } from "../constants";
import type { CellValue } from "../types";

interface CellProps {
	value: CellValue;
	isWinning?: boolean;
	isPreview?: boolean;
	previewPlayer?: CellValue;
}

export const Cell = () => {
	return ({
		value,
		isWinning = false,
		isPreview = false,
		previewPlayer,
	}: CellProps) => {
		const showPreview = isPreview && !value && previewPlayer;

		return (
			<div
				css={{
					width: CELL_SIZE,
					height: CELL_SIZE,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					css={{
						width: CELL_SIZE - 10,
						height: CELL_SIZE - 10,
						borderRadius: "50%",
						transition: "all 0.15s ease-out",
						boxSizing: "border-box",
					}}
					style={{
						backgroundColor: value
							? COLORS[value]
							: showPreview
								? COLORS[previewPlayer]
								: EMPTY_CELL_COLOR,
						opacity: showPreview ? 0.4 : 1,
						boxShadow: value
							? isWinning
								? `0 0 20px ${COLORS[value]}, 0 0 30px ${COLORS[value]}`
								: `inset 0 -4px 8px rgba(0, 0, 0, 0.3), inset 0 4px 8px rgba(255, 255, 255, 0.2)`
							: `inset 0 4px 8px rgba(0, 0, 0, 0.5)`,
						transform: isWinning ? "scale(1.1)" : "scale(1)",
					}}
				/>
			</div>
		);
	};
};

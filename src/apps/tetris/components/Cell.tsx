import { CELL_SIZE, COLORS } from "../constants";
import type { CellValue } from "../types";

interface CellProps {
	value: CellValue;
	ghost?: boolean;
}

export const Cell = () => {
	return ({ value, ghost = false }: CellProps) => (
		<div
			css={{
				width: `${CELL_SIZE}px`,
				height: `${CELL_SIZE}px`,
				border: "2px solid #2F3542",
				boxSizing: "border-box",
			}}
			style={{
				backgroundColor: value ? COLORS[value] : "#1a1a2e",
				opacity: ghost ? 0.3 : 1,
			}}
		/>
	);
};

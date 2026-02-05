import { COLORS } from "../constants";

const Block = () => {
	return ({ color, x, y }: { color: string; x: number; y: number }) => (
		<div
			css={{
				position: "absolute",
				width: "18px",
				height: "18px",
				border: "2px solid #2F3542",
				boxSizing: "border-box",
			}}
			style={{
				backgroundColor: color,
				left: `${x * 18}px`,
				top: `${y * 18}px`,
			}}
		/>
	);
};

export const TetrisIcon = () => {
	return () => (
		<div css={{ position: "relative", width: "72px", height: "72px" }}>
			<Block
				color={COLORS.T}
				x={1}
				y={0}
			/>
			<Block
				color={COLORS.T}
				x={0}
				y={1}
			/>
			<Block
				color={COLORS.T}
				x={1}
				y={1}
			/>
			<Block
				color={COLORS.T}
				x={2}
				y={1}
			/>
			<Block
				color={COLORS.S}
				x={2}
				y={2}
			/>
			<Block
				color={COLORS.S}
				x={3}
				y={2}
			/>
			<Block
				color={COLORS.S}
				x={1}
				y={3}
			/>
			<Block
				color={COLORS.S}
				x={2}
				y={3}
			/>
			<Block
				color={COLORS.I}
				x={0}
				y={3}
			/>
			<Block
				color={COLORS.L}
				x={3}
				y={3}
			/>
		</div>
	);
};

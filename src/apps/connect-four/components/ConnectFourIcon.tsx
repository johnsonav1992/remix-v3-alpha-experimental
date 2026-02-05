import { COLORS } from "../constants";

const Piece = () => {
	return ({ color, x, y }: { color: string; x: number; y: number }) => (
		<div
			css={{
				position: "absolute",
				width: 22,
				height: 22,
				borderRadius: "50%",
				boxShadow: "inset 0 -2px 4px rgba(0, 0, 0, 0.3)",
			}}
			style={{
				backgroundColor: color,
				left: x * 25,
				top: y * 25,
			}}
		/>
	);
};

export const ConnectFourIcon = () => {
	return () => (
		<div
			css={{
				position: "relative",
				width: 100,
				height: 100,
				backgroundColor: "#2980B9",
				borderRadius: 8,
				padding: 2,
			}}
		>
			<Piece color={COLORS.red} x={0} y={3} />
			<Piece color={COLORS.yellow} x={1} y={3} />
			<Piece color={COLORS.red} x={2} y={3} />
			<Piece color={COLORS.yellow} x={3} y={3} />
			<Piece color={COLORS.red} x={1} y={2} />
			<Piece color={COLORS.yellow} x={2} y={2} />
			<Piece color={COLORS.red} x={2} y={1} />
		</div>
	);
};

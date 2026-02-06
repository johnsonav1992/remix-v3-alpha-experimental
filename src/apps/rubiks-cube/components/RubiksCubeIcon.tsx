import { COLORS } from "../constants";

export const RubiksCubeIcon = () => {
	return () => {
		const size = 100;
		const cubeSize = size * 0.8;
		const faceSize = cubeSize / 3;
		const gap = 2;

		return (
			<div
				css={{
					position: "relative",
					width: size,
					height: size,
					background: COLORS.black,
					borderRadius: 8,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					overflow: "hidden",
					perspective: "300px",
				}}
			>
				<div
					css={{
						position: "relative",
						width: cubeSize,
						height: cubeSize,
						transformStyle: "preserve-3d",
						transform: "rotateX(-25deg) rotateY(45deg)",
					}}
				>
					<div
						css={{
							position: "absolute",
							width: cubeSize,
							height: cubeSize,
							background: COLORS.black,
							transform: `translateZ(${cubeSize / 6}px)`,
						}}
					>
						{[0, 1, 2].map((row) =>
							[0, 1, 2].map((col) => (
								<div
									key={`f-${row}-${col}`}
									css={{
										position: "absolute",
										width: faceSize - gap,
										height: faceSize - gap,
										background: COLORS.green,
										border: `1px solid ${COLORS.black}`,
										borderRadius: 2,
										left: col * faceSize,
										top: row * faceSize,
									}}
								/>
							)),
						)}
					</div>
					<div
						css={{
							position: "absolute",
							width: cubeSize,
							height: cubeSize,
							background: COLORS.black,
							transform: `translateX(${cubeSize / 6}px) rotateY(90deg)`,
							transformOrigin: "right center",
						}}
					>
						{[0, 1, 2].map((row) =>
							[0, 1, 2].map((col) => (
								<div
									key={`r-${row}-${col}`}
									css={{
										position: "absolute",
										width: faceSize - gap,
										height: faceSize - gap,
										background: COLORS.red,
										border: `1px solid ${COLORS.black}`,
										borderRadius: 2,
										left: col * faceSize,
										top: row * faceSize,
									}}
								/>
							)),
						)}
					</div>
					<div
						css={{
							position: "absolute",
							width: cubeSize,
							height: cubeSize,
							background: COLORS.black,
							transform: `translateY(-${cubeSize / 6}px) rotateX(90deg)`,
							transformOrigin: "center top",
						}}
					>
						{[0, 1, 2].map((row) =>
							[0, 1, 2].map((col) => (
								<div
									key={`u-${row}-${col}`}
									css={{
										position: "absolute",
										width: faceSize - gap,
										height: faceSize - gap,
										background: COLORS.white,
										border: `1px solid ${COLORS.black}`,
										borderRadius: 2,
										left: col * faceSize,
										top: row * faceSize,
									}}
								/>
							)),
						)}
					</div>
				</div>
			</div>
		);
	};
};

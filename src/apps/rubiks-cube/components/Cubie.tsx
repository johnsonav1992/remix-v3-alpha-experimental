import {
	BORDER_RADIUS,
	COLORS,
	CUBIE_GAP,
	CUBIE_SIZE,
	STICKER_INSET,
} from "../constants";
import type { CubieData } from "../types";

interface CubieProps {
	cubie: CubieData;
}

export const Cubie = () => {
	return ({ cubie }: CubieProps) => {
		const { position, rotation, colors } = cubie;

		const totalSize = CUBIE_SIZE + CUBIE_GAP;
		const translateX = position.x * totalSize;
		const translateY = -position.y * totalSize;
		const translateZ = position.z * totalSize;

		const transform = `
      translate3d(${translateX}px, ${translateY}px, ${translateZ}px)
      rotateX(${rotation.x}deg)
      rotateY(${rotation.y}deg)
      rotateZ(${rotation.z}deg)
    `;

		const halfSize = CUBIE_SIZE / 2;

		return (
			<div
				css={{
					position: "absolute",
					width: CUBIE_SIZE,
					height: CUBIE_SIZE,
					transformStyle: "preserve-3d",
					transform,
				}}
			>
				{colors.F && (
					<div
						css={{
							position: "absolute",
							width: CUBIE_SIZE,
							height: CUBIE_SIZE,
							background: COLORS.black,
							transform: `translateZ(${halfSize}px)`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: `1px solid ${COLORS.black}`,
						}}
					>
						<div
							css={{
								width: CUBIE_SIZE - STICKER_INSET * 2,
								height: CUBIE_SIZE - STICKER_INSET * 2,
								background: COLORS[colors.F],
								borderRadius: BORDER_RADIUS,
								border: `2px solid ${COLORS.black}`,
							}}
						/>
					</div>
				)}
				{colors.B && (
					<div
						css={{
							position: "absolute",
							width: CUBIE_SIZE,
							height: CUBIE_SIZE,
							background: COLORS.black,
							transform: `translateZ(${-halfSize}px) rotateY(180deg)`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: `1px solid ${COLORS.black}`,
						}}
					>
						<div
							css={{
								width: CUBIE_SIZE - STICKER_INSET * 2,
								height: CUBIE_SIZE - STICKER_INSET * 2,
								background: COLORS[colors.B],
								borderRadius: BORDER_RADIUS,
								border: `2px solid ${COLORS.black}`,
							}}
						/>
					</div>
				)}
				{colors.U && (
					<div
						css={{
							position: "absolute",
							width: CUBIE_SIZE,
							height: CUBIE_SIZE,
							background: COLORS.black,
							transform: `translateY(${-halfSize}px) rotateX(90deg)`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: `1px solid ${COLORS.black}`,
						}}
					>
						<div
							css={{
								width: CUBIE_SIZE - STICKER_INSET * 2,
								height: CUBIE_SIZE - STICKER_INSET * 2,
								background: COLORS[colors.U],
								borderRadius: BORDER_RADIUS,
								border: `2px solid ${COLORS.black}`,
							}}
						/>
					</div>
				)}
				{colors.D && (
					<div
						css={{
							position: "absolute",
							width: CUBIE_SIZE,
							height: CUBIE_SIZE,
							background: COLORS.black,
							transform: `translateY(${halfSize}px) rotateX(-90deg)`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: `1px solid ${COLORS.black}`,
						}}
					>
						<div
							css={{
								width: CUBIE_SIZE - STICKER_INSET * 2,
								height: CUBIE_SIZE - STICKER_INSET * 2,
								background: COLORS[colors.D],
								borderRadius: BORDER_RADIUS,
								border: `2px solid ${COLORS.black}`,
							}}
						/>
					</div>
				)}
				{colors.R && (
					<div
						css={{
							position: "absolute",
							width: CUBIE_SIZE,
							height: CUBIE_SIZE,
							background: COLORS.black,
							transform: `translateX(${halfSize}px) rotateY(90deg)`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: `1px solid ${COLORS.black}`,
						}}
					>
						<div
							css={{
								width: CUBIE_SIZE - STICKER_INSET * 2,
								height: CUBIE_SIZE - STICKER_INSET * 2,
								background: COLORS[colors.R],
								borderRadius: BORDER_RADIUS,
								border: `2px solid ${COLORS.black}`,
							}}
						/>
					</div>
				)}
				{colors.L && (
					<div
						css={{
							position: "absolute",
							width: CUBIE_SIZE,
							height: CUBIE_SIZE,
							background: COLORS.black,
							transform: `translateX(${-halfSize}px) rotateY(-90deg)`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: `1px solid ${COLORS.black}`,
						}}
					>
						<div
							css={{
								width: CUBIE_SIZE - STICKER_INSET * 2,
								height: CUBIE_SIZE - STICKER_INSET * 2,
								background: COLORS[colors.L],
								borderRadius: BORDER_RADIUS,
								border: `2px solid ${COLORS.black}`,
							}}
						/>
					</div>
				)}
			</div>
		);
	};
};

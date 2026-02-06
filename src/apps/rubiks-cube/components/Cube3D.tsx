import { ANIMATION_DURATION } from "../constants";
import type { CubieData, Rotation } from "../types";
import { Cubie } from "./Cubie";

interface Cube3DProps {
	cubies: CubieData[];
	cubeRotation: Rotation;
	isAnimating: boolean;
	onMouseDown: (e: MouseEvent) => void;
}

export const Cube3D = () => {
	return ({ cubies, cubeRotation, isAnimating, onMouseDown }: Cube3DProps) => {
		const transform = `
      rotateX(${cubeRotation.x}deg)
      rotateY(${cubeRotation.y}deg)
      rotateZ(${cubeRotation.z}deg)
    `;

		return (
			<div
				css={{
					width: "100%",
					height: "500px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					perspective: "1000px",
					userSelect: "none",
					cursor: "grab",
					":active": {
						cursor: "grabbing",
					},
				}}
				on={{
					mousedown: onMouseDown,
				}}
			>
				<div
					css={{
						position: "relative",
						transformStyle: "preserve-3d",
						transform,
						transition: isAnimating
							? `transform ${ANIMATION_DURATION}ms ease-out`
							: "none",
					}}
				>
					{cubies.map((cubie) => (
						<Cubie
							key={cubie.id}
							cubie={cubie}
						/>
					))}
				</div>
			</div>
		);
	};
};

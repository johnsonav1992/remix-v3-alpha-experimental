import type { Color, CubieData, Face, Position } from "./types";

export const createSolvedCube = (): CubieData[] => {
	const cubies: CubieData[] = [];

	for (let x = -1; x <= 1; x++) {
		for (let y = -1; y <= 1; y++) {
			for (let z = -1; z <= 1; z++) {
				if (x === 0 && y === 0 && z === 0) continue;

				const colors: { [K in Face]?: Color } = {};

				if (x === 1) colors.R = "red";
				if (x === -1) colors.L = "orange";
				if (y === 1) colors.U = "white";
				if (y === -1) colors.D = "yellow";
				if (z === 1) colors.F = "green";
				if (z === -1) colors.B = "blue";

				cubies.push({
					id: `${x},${y},${z}`,
					position: { x, y, z },
					rotation: { x: 0, y: 0, z: 0 },
					colors,
				});
			}
		}
	}

	return cubies;
};

interface FaceRotationConfig {
	axis: "x" | "y" | "z";
	layer: number;
	direction: 1 | -1;
}

const FACE_CONFIGS: Record<Face, FaceRotationConfig> = {
	U: { axis: "y", layer: 1, direction: -1 },
	D: { axis: "y", layer: -1, direction: 1 },
	R: { axis: "x", layer: 1, direction: -1 },
	L: { axis: "x", layer: -1, direction: 1 },
	F: { axis: "z", layer: 1, direction: -1 },
	B: { axis: "z", layer: -1, direction: 1 },
};

const rotatePositionAroundAxis = (
	pos: Position,
	axis: "x" | "y" | "z",
	direction: 1 | -1,
): Position => {
	const d = direction;

	if (axis === "y") {
		return { x: -pos.z * d, y: pos.y, z: pos.x * d };
	} else if (axis === "x") {
		return { x: pos.x, y: -pos.z * d, z: pos.y * d };
	} else {
		return { x: pos.y * d, y: -pos.x * d, z: pos.z };
	}
};

const rotateColorsAroundAxis = (
	colors: { [K in Face]?: Color },
	axis: "x" | "y" | "z",
	direction: 1 | -1,
): { [K in Face]?: Color } => {
	const newColors: { [K in Face]?: Color } = {};

	if (axis === "y") {
		if (direction === -1) {
			if (colors.R) newColors.B = colors.R;
			if (colors.F) newColors.R = colors.F;
			if (colors.L) newColors.F = colors.L;
			if (colors.B) newColors.L = colors.B;
			if (colors.U) newColors.U = colors.U;
			if (colors.D) newColors.D = colors.D;
		} else {
			if (colors.R) newColors.F = colors.R;
			if (colors.F) newColors.L = colors.F;
			if (colors.L) newColors.B = colors.L;
			if (colors.B) newColors.R = colors.B;
			if (colors.U) newColors.U = colors.U;
			if (colors.D) newColors.D = colors.D;
		}
	} else if (axis === "x") {
		if (direction === -1) {
			if (colors.F) newColors.U = colors.F;
			if (colors.U) newColors.B = colors.U;
			if (colors.B) newColors.D = colors.B;
			if (colors.D) newColors.F = colors.D;
			if (colors.R) newColors.R = colors.R;
			if (colors.L) newColors.L = colors.L;
		} else {
			if (colors.F) newColors.D = colors.F;
			if (colors.D) newColors.B = colors.D;
			if (colors.B) newColors.U = colors.B;
			if (colors.U) newColors.F = colors.U;
			if (colors.R) newColors.R = colors.R;
			if (colors.L) newColors.L = colors.L;
		}
	} else {
		if (direction === -1) {
			if (colors.U) newColors.R = colors.U;
			if (colors.R) newColors.D = colors.R;
			if (colors.D) newColors.L = colors.D;
			if (colors.L) newColors.U = colors.L;
			if (colors.F) newColors.F = colors.F;
			if (colors.B) newColors.B = colors.B;
		} else {
			if (colors.U) newColors.L = colors.U;
			if (colors.L) newColors.D = colors.L;
			if (colors.D) newColors.R = colors.D;
			if (colors.R) newColors.U = colors.R;
			if (colors.F) newColors.F = colors.F;
			if (colors.B) newColors.B = colors.B;
		}
	}

	return newColors;
};

export const rotateFace = (cubies: CubieData[], face: Face): CubieData[] => {
	const config = FACE_CONFIGS[face];
	const { axis, layer, direction } = config;

	return cubies.map((cubie) => {
		if (cubie.position[axis] !== layer) {
			return cubie;
		}

		const newPosition = rotatePositionAroundAxis(
			cubie.position,
			axis,
			direction,
		);

		const newColors = rotateColorsAroundAxis(cubie.colors, axis, direction);

		return {
			...cubie,
			position: newPosition,
			rotation: { x: 0, y: 0, z: 0 },
			colors: newColors,
		};
	});
};

export const scrambleCube = (
	cubies: CubieData[],
	moves: number = 20,
): CubieData[] => {
	const faces: Face[] = ["U", "D", "R", "L", "F", "B"];
	let result = cubies;

	for (let i = 0; i < moves; i++) {
		const face = faces[Math.floor(Math.random() * faces.length)];
		result = rotateFace(result, face);
	}

	return result;
};

export const isSolved = (cubies: CubieData[]): boolean => {
	return cubies.every((cubie) => {
		const { rotation } = cubie;
		const normalized = {
			x: ((rotation.x % 360) + 360) % 360,
			y: ((rotation.y % 360) + 360) % 360,
			z: ((rotation.z % 360) + 360) % 360,
		};

		return (
			normalized.x % 90 === 0 &&
			normalized.y % 90 === 0 &&
			normalized.z % 90 === 0 &&
			Math.floor(normalized.x / 90) % 4 === 0 &&
			Math.floor(normalized.y / 90) % 4 === 0 &&
			Math.floor(normalized.z / 90) % 4 === 0
		);
	});
};

export const solveCube = (): CubieData[] => {
	return createSolvedCube();
};

export const formatTime = (milliseconds: number): string => {
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

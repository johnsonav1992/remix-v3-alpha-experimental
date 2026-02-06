export type Color = "white" | "yellow" | "red" | "orange" | "blue" | "green";
export type Face = "U" | "D" | "F" | "B" | "R" | "L";
export type Axis = "x" | "y" | "z";

export interface Position {
	x: number;
	y: number;
	z: number;
}

export interface Rotation {
	x: number;
	y: number;
	z: number;
}

export interface CubieData {
	id: string;
	position: Position;
	rotation: Rotation;
	colors: {
		[K in Face]?: Color;
	};
}

export interface DragState {
	isDragging: boolean;
	startX: number;
	startY: number;
	startRotation: Rotation;
	type: "cube" | "face" | null;
	face?: Face;
}

export interface GameState {
	cubies: CubieData[];
	cubeRotation: Rotation;
	dragState: DragState;
	isAnimating: boolean;
	moves: number;
	startTime: number | null;
	elapsedTime: number;
	isSolved: boolean;
}

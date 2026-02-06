import type { Handle } from "@remix-run/component";
import { ANIMATION_DURATION, THEME } from "../constants";
import type { Face, GameState } from "../types";
import {
	createSolvedCube,
	isSolved,
	rotateFace,
	scrambleCube,
	solveCube,
} from "../utils";
import { Controls } from "./Controls";
import { Cube3D } from "./Cube3D";

export const RubiksCube = (handle: Handle) => {
	const state: GameState = {
		cubies: createSolvedCube(),
		cubeRotation: { x: -25, y: 45, z: 0 },
		dragState: {
			isDragging: false,
			startX: 0,
			startY: 0,
			startRotation: { x: 0, y: 0, z: 0 },
			type: null,
		},
		isAnimating: false,
		moves: 0,
		startTime: null,
		elapsedTime: 0,
		isSolved: true,
	};

	let timerInterval: number | null = null;

	const startTimer = (): void => {
		if (state.startTime === null) {
			state.startTime = Date.now();
			timerInterval = window.setInterval(() => {
				if (state.startTime !== null) {
					state.elapsedTime = Date.now() - state.startTime;
					handle.update();
				}
			}, 100);
		}
	};

	const stopTimer = (): void => {
		if (timerInterval !== null) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
	};

	const resetTimer = (): void => {
		stopTimer();
		state.startTime = null;
		state.elapsedTime = 0;
	};

	const handleScramble = (): void => {
		if (state.isAnimating) {
			return;
		}

		state.isAnimating = true;
		state.cubies = scrambleCube(state.cubies, 20);
		state.moves = 0;
		resetTimer();
		state.isSolved = false;
		handle.update();

		setTimeout(() => {
			state.isAnimating = false;
			handle.update();
		}, ANIMATION_DURATION);
	};

	const handleSolve = (): void => {
		if (state.isAnimating) {
			return;
		}

		state.isAnimating = true;
		state.cubies = solveCube();
		state.isSolved = true;
		stopTimer();
		handle.update();

		setTimeout(() => {
			state.isAnimating = false;
			handle.update();
		}, ANIMATION_DURATION);
	};

	const handleReset = (): void => {
		if (state.isAnimating) {
			return;
		}

		state.cubies = createSolvedCube();
		state.cubeRotation = { x: -25, y: 45, z: 0 };
		state.moves = 0;
		resetTimer();
		state.isSolved = true;
		handle.update();
	};

	const detectFaceFromPosition = (
		clientX: number,
		clientY: number,
	): Face | null => {
		const threshold = 0.3;
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;

		const dx = (clientX - centerX) / centerX;
		const dy = (clientY - centerY) / centerY;

		const rotation = state.cubeRotation;
		const cosY = Math.cos((rotation.y * Math.PI) / 180);
		const sinY = Math.sin((rotation.y * Math.PI) / 180);

		if (Math.abs(dx) > Math.abs(dy)) {
			if (dx > threshold) {
				return cosY > 0 ? "R" : "L";
			} else if (dx < -threshold) {
				return cosY > 0 ? "L" : "R";
			}
		} else {
			if (dy > threshold) {
				return "D";
			} else if (dy < -threshold) {
				return "U";
			}
		}

		return Math.abs(sinY) > 0.5 ? (sinY > 0 ? "F" : "B") : "F";
	};

	const handleMouseDown = (e: MouseEvent): void => {
		if (state.isAnimating) {
			return;
		}

		const face = detectFaceFromPosition(e.clientX, e.clientY);

		state.dragState = {
			isDragging: true,
			startX: e.clientX,
			startY: e.clientY,
			startRotation: { ...state.cubeRotation },
			type: "cube",
			face: face || undefined,
		};

		handle.update();
	};

	const handleMouseMove = (e: MouseEvent): void => {
		if (!state.dragState.isDragging) {
			return;
		}

		const deltaX = e.clientX - state.dragState.startX;
		const deltaY = e.clientY - state.dragState.startY;

		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		if (distance > 10 && state.dragState.type === "cube") {
			state.cubeRotation = {
				x: state.dragState.startRotation.x + deltaY * 0.5,
				y: state.dragState.startRotation.y + deltaX * 0.5,
				z: state.dragState.startRotation.z,
			};
			handle.update();
		}
	};

	const handleMouseUp = (e: MouseEvent): void => {
		if (!state.dragState.isDragging) {
			return;
		}

		const deltaX = e.clientX - state.dragState.startX;
		const deltaY = e.clientY - state.dragState.startY;
		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		if (distance > 30 && state.dragState.face) {
			const absDeltaX = Math.abs(deltaX);
			const absDeltaY = Math.abs(deltaY);

			if (absDeltaX > 20 || absDeltaY > 20) {
				const face = state.dragState.face;

				startTimer();
				state.isAnimating = true;
				state.cubies = rotateFace(state.cubies, face);
				state.moves++;
				handle.update();

				setTimeout(() => {
					state.isAnimating = false;
					state.isSolved = isSolved(state.cubies);

					if (state.isSolved) {
						stopTimer();
					}

					handle.update();
				}, ANIMATION_DURATION);
			}
		}

		state.dragState = {
			isDragging: false,
			startX: 0,
			startY: 0,
			startRotation: { x: 0, y: 0, z: 0 },
			type: null,
		};

		handle.update();
	};

	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUp);

	handle.signal.addEventListener("abort", () => {
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
		if (timerInterval !== null) {
			clearInterval(timerInterval);
		}
	});

	return () => (
		<div
			css={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: THEME.background,
				overflow: "hidden",
			}}
		>
			<Cube3D
				cubies={state.cubies}
				cubeRotation={state.cubeRotation}
				isAnimating={state.isAnimating}
				onMouseDown={handleMouseDown}
			/>
			<Controls
				moves={state.moves}
				elapsedTime={state.elapsedTime}
				isSolved={state.isSolved}
				onScramble={handleScramble}
				onSolve={handleSolve}
				onReset={handleReset}
			/>
		</div>
	);
};

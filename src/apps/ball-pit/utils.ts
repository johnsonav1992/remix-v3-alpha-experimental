import { COLORS, PHYSICS } from "./constants";
import type { BallData } from "./types";

export const getRandomColor = (): string => {
	return COLORS[Math.floor(Math.random() * COLORS.length)];
};

export const handleBallCollision = (ball1: BallData, ball2: BallData): void => {
	if (ball1.sleeping && ball2.sleeping) return;

	const dx = ball2.x - ball1.x;
	const dy = ball2.y - ball1.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	const minDistance = ball1.radius + ball2.radius;

	if (distance < minDistance) {
		const ball1Speed = Math.sqrt(ball1.vx * ball1.vx + ball1.vy * ball1.vy);
		const ball2Speed = Math.sqrt(ball2.vx * ball2.vx + ball2.vy * ball2.vy);

		if (ball1.sleeping && ball2Speed > 1.0) {
			ball1.sleeping = false;
			ball1.sleepCounter = 0;
		}

		if (ball2.sleeping && ball1Speed > 1.0) {
			ball2.sleeping = false;
			ball2.sleepCounter = 0;
		}

		if (ball1.sleeping || ball2.sleeping) return;

		const angle = Math.atan2(dy, dx);
		const overlap = minDistance - distance;
		const separateX = (overlap / 2) * Math.cos(angle);
		const separateY = (overlap / 2) * Math.sin(angle);
		ball1.x -= separateX;
		ball1.y -= separateY;
		ball2.x += separateX;
		ball2.y += separateY;

		const relativeVelX = ball2.vx - ball1.vx;
		const relativeVelY = ball2.vy - ball1.vy;
		const dotProduct =
			relativeVelX * Math.cos(angle) + relativeVelY * Math.sin(angle);

		if (dotProduct < 0) {
			const impulse = (2 * dotProduct) / 2;
			const impulseX = impulse * Math.cos(angle);
			const impulseY = impulse * Math.sin(angle);
			ball1.vx += impulseX * PHYSICS.bounce;
			ball1.vy += impulseY * PHYSICS.bounce;
			ball2.vx -= impulseX * PHYSICS.bounce;
			ball2.vy -= impulseY * PHYSICS.bounce;
		}
	}
};

export const checkBallCollisions = (balls: BallData[]): void => {
	for (let i = 0; i < balls.length; i++) {
		for (let j = i + 1; j < balls.length; j++) {
			handleBallCollision(balls[i], balls[j]);
		}
	}
};

export const dampVelocity = (ball: BallData, threshold = 0.1): void => {
	if (Math.abs(ball.vx) < threshold) ball.vx = 0;
	if (Math.abs(ball.vy) < threshold) ball.vy = 0;
};

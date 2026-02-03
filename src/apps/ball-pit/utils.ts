import { COLORS, PHYSICS } from "./constants";
import type { BallData } from "./types";

export const getRandomColor = (): string => {
	return COLORS[Math.floor(Math.random() * COLORS.length)];
};

export const handleBallCollision = (ball1: BallData, ball2: BallData): void => {
	const dx = ball2.x - ball1.x;
	const dy = ball2.y - ball1.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	const minDistance = ball1.radius + ball2.radius;
	if (distance < minDistance) {
		const ball1AtRest = Math.abs(ball1.vx) < 0.1 && Math.abs(ball1.vy) < 0.1;
		const ball2AtRest = Math.abs(ball2.vx) < 0.1 && Math.abs(ball2.vy) < 0.1;
		if (ball1AtRest && ball2AtRest) {
			return;
		}
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
		const dotProduct = relativeVelX * Math.cos(angle) + relativeVelY * Math.sin(angle);
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

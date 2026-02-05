import { BallIcon } from "../apps/ball-pit/components/BallIcon";
import { ConnectFourIcon } from "../apps/connect-four/components/ConnectFourIcon";
import { TetrisIcon } from "../apps/tetris/components/TetrisIcon";
import type { Demo } from "../shared/types";

export const DEMOS: Demo[] = [
	{
		id: "ball-pit",
		name: "Ball Pit",
		description:
			"Click anywhere to throw balls into the pit. Watch them bounce around with realistic physics!",
		color: "#FFA502",
		icon: BallIcon,
	},
	{
		id: "tetris",
		name: "Tetris",
		description:
			"Classic block-stacking puzzle game. Use arrow keys to move and rotate, space to drop!",
		color: "#A55EEA",
		icon: TetrisIcon,
	},
	{
		id: "connect-four",
		name: "Connect Four",
		description:
			"Drop pieces to connect four in a row! Play against a friend using mouse clicks or keys 1-7.",
		color: "#2980B9",
		icon: ConnectFourIcon,
	},
];

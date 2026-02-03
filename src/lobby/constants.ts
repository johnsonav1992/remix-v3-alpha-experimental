import { BallIcon } from "../apps/ball-pit/components/BallIcon";
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
];

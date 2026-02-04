import type { Handle } from "@remix-run/component";
import { BallPit } from "./apps/ball-pit/components/BallPit";
import { Tetris } from "./apps/tetris/components/Tetris";
import { Lobby } from "./lobby/components/Lobby";
import { BackButton } from "./shared/components/BackButton";
import type { DemoId } from "./shared/types";

export function App(handle: Handle) {
	let currentDemo: DemoId | null = null;

	const selectDemo = (demoId: string): void => {
		currentDemo = demoId as DemoId;
		handle.update();
	};

	const backToLobby = (): void => {
		currentDemo = null;
		handle.update();
	};

	return () => {
		if (currentDemo === null) {
			return <Lobby onSelectDemo={selectDemo} />;
		}

		return (
			<div
				css={{
					position: "relative",
					width: "100vw",
					height: "100vh",
					overflow: "hidden",
				}}
			>
				<BackButton onClick={backToLobby} />
				{currentDemo === "ball-pit" && <BallPit />}
				{currentDemo === "tetris" && <Tetris />}
			</div>
		);
	};
}

export type DemoId = "ball-pit" | "tetris" | "connect-four";

export type IconComponent = () => () => JSX.Element;

export interface Demo {
	id: DemoId;
	name: string;
	description: string;
	color: string;
	icon: IconComponent | string;
}

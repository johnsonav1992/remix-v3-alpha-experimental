export type DemoId = "ball-pit" | "tetris";

export type IconComponent = () => () => JSX.Element;

export interface Demo {
	id: DemoId;
	name: string;
	description: string;
	color: string;
	icon: IconComponent | string;
}

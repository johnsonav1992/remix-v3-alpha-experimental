import { DEMOS } from "../constants";
import { DemoCard } from "./DemoCard";

interface LobbyProps {
	onSelectDemo: (demoId: string) => void;
}

export function Lobby() {
	return ({ onSelectDemo }: LobbyProps) => (
		<div
			css={{
				minHeight: "100vh",
				backgroundColor: "#FFFBF0",
				backgroundImage:
					"repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,87,87,.03) 35px, rgba(255,87,87,.03) 70px)",
				padding: "60px 20px",
				fontFamily: '"Space Grotesk", system-ui, sans-serif',
			}}
		>
			<div
				css={{
					maxWidth: "1100px",
					margin: "0 auto",
				}}
			>
				<header
					css={{
						marginBottom: "70px",
					}}
				>
					<div
						css={{
							display: "inline-block",
							backgroundColor: "#FF5757",
							color: "#FFFBF0",
							padding: "20px 40px",
							transform: "rotate(-2deg)",
							boxShadow: "8px 8px 0 #2F3542",
							border: "4px solid #2F3542",
							marginBottom: "20px",
						}}
					>
						<h1
							css={{
								fontSize: "56px",
								fontWeight: "900",
								margin: 0,
								letterSpacing: "-2px",
								textTransform: "uppercase",
							}}
						>
							Remix Arcade
						</h1>
					</div>
					<p
						css={{
							fontSize: "20px",
							color: "#2F3542",
							margin: 0,
							fontWeight: "600",
							maxWidth: "600px",
						}}
					>
						Pick your game and have a blast!
					</p>
				</header>
				<div
					css={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
						gap: "40px",
					}}
				>
					{DEMOS.map((demo) => (
						<DemoCard
							key={demo.id}
							id={demo.id}
							name={demo.name}
							description={demo.description}
							color={demo.color}
							icon={demo.icon}
							onSelect={onSelectDemo}
						/>
					))}
				</div>
				<footer
					css={{
						marginTop: "100px",
						textAlign: "center",
					}}
				>
					<div
						css={{
							display: "inline-block",
							backgroundColor: "#2F3542",
							color: "#FFFBF0",
							padding: "12px 24px",
							fontSize: "14px",
							fontWeight: "700",
							border: "3px solid #2F3542",
							textTransform: "uppercase",
							letterSpacing: "1px",
						}}
					>
						Powered by Remix v3
					</div>
				</footer>
			</div>
		</div>
	);
}

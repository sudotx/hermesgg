import {
	Bomb,
	Circle,
	CircleDollarSign,
	Dice5,
	Instagram,
	LayoutGrid,
	MessageSquare,
	Rocket,
	Triangle,
	Twitter,
	Youtube,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../utils";

const games = [
	{ name: "Home", href: "/", icon: LayoutGrid },
	{ name: "Crash", href: "/app/crash", icon: Rocket },
	{ name: "Plinko", href: "/app/plinko", icon: Triangle },
	{ name: "Roulette", href: "/app/roulette", icon: Circle },
	{ name: "Dice", href: "/app/dice", icon: Dice5 },
	{ name: "Coin Flip", href: "/app/coin-flip", icon: CircleDollarSign },
	{ name: "Mines", href: "/app/mines", icon: Bomb },
];

const socialLinks = [
	{ name: "Discord", icon: MessageSquare, href: "#", color: "text-gray-400" },
	{ name: "Twitter", icon: Twitter, href: "#", color: "text-gray-400" },
	{ name: "Instagram", icon: Instagram, href: "#", color: "text-gray-400" },
	{ name: "YouTube", icon: Youtube, href: "#", color: "text-gray-400" },
];

export default function Sidebar() {
	return (
		<div className="w-64 bg-neutral-800 text-white p-4 flex flex-col h-screen">

			{/* Game Navigation */}
			<nav className="flex flex-col space-y-1 flex-grow">
				{games.map((game) => (
					<NavLink
						key={game.name}
						to={game.href}
						className={({ isActive }) =>
							cn(
								"flex items-center space-x-3 px-4 py-2 rounded-md text-lg font-medium transition-colors group",
								isActive
									? "bg-neutral-700 text-white font-bold"
									: "text-gray-400 hover:bg-neutral-700 hover:text-white"
							)
						}
					>
						<game.icon
							className={cn(
								"h-5 w-5 transition-colors",
								"text-gray-400 group-hover:text-green-400"
							)}
						/>
						<span>{game.name}</span>
					</NavLink>
				))}

				{/* Divider */}
				<div className="border-t border-gray-600 my-2 "></div>

				{/* Legal Links */}
				<div className="pt-6 p-3">
					<a href="#" className="block text-gray-400 hover:text-white mb-2 transition-colors">
						Privacy Policy
					</a>
					<a href="#" className="block text-gray-400 hover:text-white transition-colors">
						Terms & Conditions
					</a>
				</div>
			</nav>

			{/* Social Media Icons */}
			<div className="flex space-x-6 justify-center">
				{socialLinks.map((social) => (
					<a
						key={social.name}
						href={social.href}
						className={cn(
							"hover:scale-110 transition-transform hover:text-green-400",
							social.color
						)}
						title={social.name}
					>
						<social.icon className="h-6 w-6" />
					</a>
				))}
			</div>
		</div>
	);
}

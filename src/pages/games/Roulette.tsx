
import { useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils";

// Mock data for players
const mockPlayers = [
	{ id: 1, username: "haargpooolnt", avatar: "��", multiplier: "2.2x", bet: "6.83241" },
	{ id: 2, username: "Kevin", avatar: "��", multiplier: "1.8x", bet: "4.12345" },
	{ id: 3, username: "badalasong", avatar: "��", multiplier: "3.1x", bet: "2.98765" },
	{ id: 4, username: "player4", avatar: "��", multiplier: "1.5x", bet: "1.23456" },
	{ id: 5, username: "player5", avatar: "��", multiplier: "2.8x", bet: "3.45678" },
];

// Mock data for bets history
const mockBets = [
	{ id: 1, game: "Roulette", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "9.1151432" },
	{ id: 2, game: "Roulette", username: "badalasong", avatar: "👤", bet: "0.5432109", multiplier: "2.1x", payout: "1.1407429" },
	{ id: 3, game: "Roulette", username: "haargpooolnt", avatar: "👤", bet: "2.1234567", multiplier: "1.5x", payout: "3.1851851" },
	{ id: 4, game: "Roulette", username: "player4", avatar: "👤", bet: "0.9876543", multiplier: "3.2x", payout: "3.1604938" },
];

// Mock game numbers with colors
// const gameNumbers = [
//   { number: 4, color: "green" },
//   { number: 0, color: "green" },
//   { number: 1, color: "black" },
//   { number: 10, color: "yellow" },
//   { number: 8, color: "green" },
//   { number: 5, color: "green" },
//   { number: 0, color: "yellow" },
//   { number: 1, color: "green" },
// ];

const Roulette = () => {
	const [betAmount, setBetAmount] = useState("6.83241");
	const [selectedMultiplier, setSelectedMultiplier] = useState("green");

	//   const getColorClasses = (color: string) => {
	//     switch (color) {
	//       case "green":
	//         return "bg-green-500 text-white";
	//       case "yellow":
	//         return "bg-yellow-500 text-black";
	//       case "black":
	//         return "bg-black text-white";
	//       default:
	//         return "bg-gray-500 text-white";
	//     }
	//   };

	return (
		<div className="flex flex-col h-screen bg-neutral-900 text-white">
			<GameNavbar />

			{/* Main Content */}
			<div className="flex flex-1 overflow-hidden">
				{/* Left Panel - Betting Controls & Player List */}
				<div className="w-80 bg-neutral-800 p-4 flex flex-col">
					{/* Betting Controls */}
					<div className="mb-6">
						<div className="flex mb-4">
							<button className="flex-1 bg-neutral-700 px-4 py-2 rounded-l text-sm font-medium">
								Manual
							</button>
							<button className="flex-1 bg-neutral-800 px-4 py-2 rounded-r text-sm text-gray-400">
								Auto
							</button>
						</div>

						{/* Bet Amount */}
						<div className="mb-4">
							<label className="block text-sm text-gray-400 mb-2">Bet amount</label>
							<div className="flex items-center space-x-2">
								<div className="flex-1 relative">
									<div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
									<input
										type="text"
										value={betAmount}
										onChange={(e) => setBetAmount(e.target.value)}
										className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded text-white"
									/>
								</div>
								<button className="px-3 py-2 bg-neutral-700 rounded text-sm">10k</button>
								<button className="px-3 py-2 bg-neutral-700 rounded text-sm">100k</button>
								<button className="px-3 py-2 bg-neutral-700 rounded text-sm">1/2</button>
								<button className="px-3 py-2 bg-green-600 rounded text-sm">x2</button>
							</div>
						</div>

						{/* Multiplier Selection */}
						<div className="mb-4">
							<label className="block text-sm text-gray-400 mb-2">Multiplier</label>
							<div className="grid grid-cols-3 gap-2">
								<button
									className={cn(
										"px-4 py-2 rounded text-sm font-medium",
										selectedMultiplier === "green" ? "bg-green-600 text-white" : "bg-neutral-700 text-gray-300"
									)}
									onClick={() => setSelectedMultiplier("green")}
								>
									Green x14
								</button>
								<button
									className={cn(
										"px-4 py-2 rounded text-sm font-medium",
										selectedMultiplier === "yellow" ? "bg-yellow-600 text-black" : "bg-neutral-700 text-gray-300"
									)}
									onClick={() => setSelectedMultiplier("yellow")}
								>
									Yellow x10
								</button>
								<button
									className={cn(
										"px-4 py-2 rounded text-sm font-medium",
										selectedMultiplier === "black" ? "bg-black text-white" : "bg-neutral-700 text-gray-300"
									)}
									onClick={() => setSelectedMultiplier("black")}
								>
									Black x2
								</button>
							</div>
						</div>

						<button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-full text-lg">
							Place Bet
						</button>
					</div>

					<PlayersList players={mockPlayers} />
				</div>

				{/* Right Panel - Game Visualization */}
				<div className="flex-1">
					{/* Game Area with overlaid elements */}
					<div className="h-full bg-gradient-to-b from-purple-900 via-blue-900 to-purple-800 rounded-lg relative overflow-hidden">
						{/* Abstract background shapes */}
						<div className="absolute inset-0">
							<div className="absolute top-20 right-20 w-32 h-32 bg-purple-600/20 rounded-full blur-xl"></div>
							<div className="absolute bottom-40 left-40 w-24 h-24 bg-blue-600/15 rounded-full blur-lg"></div>
							<div className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-500/10 rounded-full blur-md"></div>
						</div>

						{/* Top Section */}
						<div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
							{/* Game ID */}
							<div className="text-white text-sm font-mono">03498945</div>
							
							{/* Multiplier Buttons */}
							<div className="flex space-x-2">
								{[
									{ value: '2.2x', color: 'bg-green-600' },
									{ value: '2.8x', color: 'bg-gray-800' },
									{ value: '2.8x', color: 'bg-yellow-600' },
									{ value: '2.8x', color: 'bg-gray-800' },
									{ value: '2.2x', color: 'bg-green-600' }
								].map((multiplier, index) => (
									<button
										key={index}
										className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${multiplier.color} text-white`}
									>
										{multiplier.value}
									</button>
								))}
							</div>

							{/* Statistics Button */}
							<button className="flex items-center space-x-2 px-4 py-2 bg-transparent text-white text-sm">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
								</svg>
								<span>Statistics</span>
							</button>
						</div>

						{/* Central Game Area - Number Blocks */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="relative">
								{/* Top triangular marker */}
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
								</div>

								{/* Number blocks row */}
								<div className="flex space-x-1">
									{/* Faded left block */}
									<div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center text-white/50 text-lg font-bold"></div>
									
									{/* Main number blocks */}
									{[
										{ number: '4', color: 'bg-yellow-600' },
										{ number: '0', color: 'bg-green-600' },
										{ number: '1', color: 'bg-black' },
										{ number: '10', color: 'bg-yellow-600' },
										{ number: '8', color: 'bg-green-600' },
										{ number: '5', color: 'bg-green-600' },
										{ number: '0', color: 'bg-yellow-600' },
										{ number: '1', color: 'bg-black' }
									].map((block, index) => (
										<div
											key={index}
											className={`w-12 h-12 ${block.color} rounded-lg flex items-center justify-center text-lg font-bold ${
												block.color === 'bg-yellow-600' ? 'text-black' : 'text-white'
											}`}
										>
											{block.number}
										</div>
									))}
									
									{/* Faded right block */}
									<div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center text-white/50 text-lg font-bold"></div>
								</div>

								{/* Bottom triangular marker */}
								<div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
									<div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
								</div>
							</div>
						</div>

						{/* Bottom Section - Last 100 rolls */}
						<div className="absolute bottom-6 left-6">
							<div className="flex items-center space-x-4">
								<span className="text-white text-sm">Last 100 rolls:</span>
								<div className="flex items-center space-x-4">
									<div className="flex items-center space-x-1">
										<div className="w-3 h-3 bg-green-500 rounded-full"></div>
										<span className="text-white text-sm">6</span>
									</div>
									<div className="flex items-center space-x-1">
										<div className="w-3 h-3 bg-pink-500 rounded-full"></div>
										<span className="text-white text-sm">45</span>
									</div>
									<div className="flex items-center space-x-1">
										<div className="w-3 h-3 bg-blue-700 rounded-full"></div>
										<span className="text-white text-sm">49</span>
									</div>
								</div>
							</div>
						</div>

						{/* Bottom terrain/landscape */}
						<div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-purple-800 to-transparent"></div>
					</div>
				</div>

			</div>

			<BetsList bets={mockBets} />
		</div>
	);
};

export default Roulette;
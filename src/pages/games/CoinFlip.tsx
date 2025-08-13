import { useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils";

// Mock data for players
const mockPlayers = [
	{ id: 1, username: "haargpooolnt", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
	{ id: 2, username: "Kevin", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
	{ id: 3, username: "badalasong", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
];

// Mock data for bets history
const mockBets = [
	{ id: 1, game: "Coin Flip", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
	{ id: 2, game: "Coin Flip", username: "badalasong", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
	{ id: 3, game: "Coin Flip", username: "haargpooolnt", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
];

// Mock last 100 rolls
// const lastRolls = [
//   "gold", "gold", "silver", "silver", "gold"
// ];

const CoinFlip = () => {
	const [betAmount, setBetAmount] = useState("6.83241");
	const [totalProfit, setTotalProfit] = useState("6.83241");
	const [side, setSide] = useState("heads");

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
								<button className="px-3 py-2 bg-neutral-700 rounded text-sm">2.00x</button>
								<button className="px-3 py-2 bg-neutral-700 rounded text-sm">1/2</button>
								<button className="px-3 py-2 bg-green-600 rounded text-sm">x2</button>
							</div>
						</div>

						{/* Total Profit */}
						<div className="mb-4">
							<label className="block text-sm text-gray-400 mb-2">Total profit</label>
							<div className="flex items-center space-x-2">
								<div className="flex-1 relative">
									<div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
									<input
										type="text"
										value={totalProfit}
										onChange={(e) => setTotalProfit(e.target.value)}
										className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded text-white"
									/>
								</div>
								<button className="px-3 py-2 bg-neutral-700 rounded text-sm">2.00x</button>
								<button className="px-3 py-2 bg-neutral-700 rounded text-sm">1/2</button>
								<button className="px-3 py-2 bg-green-600 rounded text-sm">x2</button>
							</div>
						</div>

						{/* Side Selection */}
						<div className="mb-4">
							<label className="block text-sm text-gray-400 mb-2">Side</label>
							<div className="flex items-center space-x-4">
								<button
									className={cn(
										"flex-1 flex items-center justify-center px-4 py-2 rounded font-medium",
										side === "heads"
											? "bg-yellow-400 text-black"
											: "bg-neutral-700 text-gray-300"
									)}
									onClick={() => setSide("heads")}
								>
									Heads
									<span className="ml-2 w-4 h-4 bg-yellow-400 rounded-full inline-block"></span>
								</button>
								<button
									className={cn(
										"flex-1 flex items-center justify-center px-4 py-2 rounded font-medium",
										side === "tails"
											? "bg-gray-400 text-black"
											: "bg-neutral-700 text-gray-300"
									)}
									onClick={() => setSide("tails")}
								>
									Tails
									<span className="ml-2 w-4 h-4 bg-gray-400 rounded-full inline-block"></span>
								</button>
							</div>
						</div>

						<button className="w-full bg-yellow-400 text-black font-bold py-3 rounded text-lg mt-2">
							Cashout
						</button>
					</div>

					<PlayersList players={mockPlayers} />
				</div>

				{/* Right Panel - Coin Flip Visualization */}
				<div className="flex-1">
					{/* Game Area with overlaid elements */}
					<div className="h-full bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg relative overflow-hidden">
						{/* Top Section */}
						<div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
							{/* Game ID */}
							<div className="text-white text-sm font-mono">03498945</div>
							
							{/* Statistics Button */}
							<button className="flex items-center space-x-2 px-4 py-2 bg-transparent text-white text-sm">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
								</svg>
								<span>Statistics</span>
							</button>
						</div>

						{/* Main Game Area - Central Coin and Side Panels */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="flex items-center space-x-8">
								{/* Left Panel - Series */}
								<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center min-w-[120px]">
									<div className="text-white text-sm mb-4">Series</div>
									{/* Small golden coin */}
									<div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg relative">
										<div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
											<svg className="w-6 h-6 text-yellow-800" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
											</svg>
										</div>
									</div>
									<div className="text-white text-xl font-bold">x0.00</div>
								</div>

								{/* Central Large Coin */}
								<div className="w-48 h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl relative">
									<div className="w-40 h-40 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
										<svg className="w-20 h-20 text-yellow-800" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
										</svg>
									</div>
									{/* Coin shine effect */}
									<div className="absolute top-2 left-2 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
								</div>

								{/* Right Panel - Multiplier */}
								<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center min-w-[120px]">
									<div className="text-white text-sm mb-4">Multiplier</div>
									{/* Small golden coin */}
									<div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg relative">
										<div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
											<svg className="w-6 h-6 text-yellow-800" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
											</svg>
										</div>
									</div>
									<div className="text-white text-xl font-bold">x0.00</div>
								</div>
							</div>
						</div>

						{/* Bottom Section - Last 100 rolls */}
						<div className="absolute bottom-6 left-6">
							<div className="flex items-center space-x-4">
								<span className="text-white text-sm">Last 100 rolls:</span>
								<div className="flex items-center space-x-2">
									{/* Roll history coins */}
									{[
										{ color: 'gold', isGold: true },
										{ color: 'silver', isGold: false },
										{ color: 'silver', isGold: false },
										{ color: 'gold', isGold: true },
										{ color: 'silver', isGold: false }
									].map((coin, index) => (
										<div
											key={index}
											className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
												coin.isGold 
													? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
													: 'bg-gradient-to-br from-gray-400 to-gray-600'
											}`}
										>
											<div className={`w-6 h-6 rounded-full flex items-center justify-center ${
												coin.isGold 
													? 'bg-gradient-to-br from-yellow-300 to-yellow-500' 
													: 'bg-gradient-to-br from-gray-300 to-gray-500'
											}`}>
												<svg className={`w-3 h-3 ${coin.isGold ? 'text-yellow-800' : 'text-gray-700'}`} fill="currentColor" viewBox="0 0 24 24">
													<path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
												</svg>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<BetsList bets={mockBets} />
		</div>
	);
};

export default CoinFlip;
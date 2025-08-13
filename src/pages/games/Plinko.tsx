import { useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils";

// Mock data for players
const mockPlayers = [
	{ id: 1, username: "haargpooolnt", avatar: "", multiplier: "2.2x", bet: "6.83241" },
	{ id: 2, username: "Kevin", avatar: "", multiplier: "1.8x", bet: "4.12345" },
	{ id: 3, username: "badalasong", avatar: "", multiplier: "3.1x", bet: "2.98765" },
];

// Mock data for bets history
const mockBets = [
	{ id: 1, game: "Plinko", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
	{ id: 2, game: "Plinko", username: "badalasong", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
	{ id: 3, game: "Plinko", username: "haargpooolnt", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
];

type Difficulty = "easy" | "medium" | "hard";

const Plinko = () => {
	const [betAmount, setBetAmount] = useState("10.00");
	const [betMode, setBetMode] = useState<"manual" | "auto">("manual");
	const [difficulty, setDifficulty] = useState<Difficulty>("easy");
	const [rows, setRows] = useState(8);
	const [isBetting, setIsBetting] = useState(false);

	const handleHalfBet = () => setBetAmount((prev) => (parseFloat(prev) / 2).toFixed(2));
	const handleDoubleBet = () => setBetAmount((prev) => (parseFloat(prev) * 2).toFixed(2));

	const handlePlaceBet = () => {
		if (isBetting) return;
		console.log(`Placing a ${betAmount} bet on ${difficulty} with ${rows} rows.`);
		// Here you would trigger the ball drop animation and game logic
		setIsBetting(true);
		// Simulate game finishing after a few seconds
		setTimeout(() => setIsBetting(false), 3000);
	};

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
							<button
								onClick={() => setBetMode("manual")}
								className={cn("flex-1 px-4 py-2 rounded-l text-sm font-medium", betMode === "manual" ? "bg-neutral-700" : "bg-neutral-800 text-gray-400")}
							>
								Manual
							</button>
							<button
								onClick={() => setBetMode("auto")}
								className={cn("flex-1 px-4 py-2 rounded-r text-sm", betMode === "auto" ? "bg-neutral-700" : "bg-neutral-800 text-gray-400")}
							>
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
										disabled={isBetting}
										className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded text-white disabled:opacity-50"
									/>
								</div>
								<button onClick={handleHalfBet} disabled={isBetting} className="px-3 py-2 bg-neutral-700 rounded text-sm disabled:opacity-50">
									1/2
								</button>
								<button onClick={handleDoubleBet} disabled={isBetting} className="px-3 py-2 bg-green-600 rounded text-sm disabled:opacity-50">
									x2
								</button>
							</div>
						</div>

						{/* Difficulty */}
						<div className="mb-4">
							<label className="block text-sm text-gray-400 mb-2">Difficulty</label>
							<div className="grid grid-cols-3 gap-2">
								<button
									className={cn("px-4 py-2 rounded text-sm font-medium", difficulty === "easy" ? "bg-green-600 text-white" : "bg-neutral-700 text-gray-300")}
									onClick={() => setDifficulty("easy")}
									disabled={isBetting}
								>
									Easy
								</button>
								<button
									className={cn("px-4 py-2 rounded text-sm font-medium", difficulty === "medium" ? "bg-yellow-600 text-black" : "bg-neutral-700 text-gray-300")}
									onClick={() => setDifficulty("medium")}
									disabled={isBetting}
								>
									Medium
								</button>
								<button
									className={cn("px-4 py-2 rounded text-sm font-medium", difficulty === "hard" ? "bg-red-600 text-white" : "bg-neutral-700 text-gray-300")}
									onClick={() => setDifficulty("hard")}
									disabled={isBetting}
								>
									Hard
								</button>
							</div>
						</div>

						{/* Amount of Rows */}
						<div className="mb-4">
							<label className="block text-sm text-gray-400 mb-2">Amount of rows</label>
							<div className="flex items-center space-x-2">
								<div className="w-6 h-6 bg-neutral-600 rounded flex items-center justify-center">
									<div className="w-4 h-1 bg-white rounded"></div>
								</div>
								<div className="flex space-x-1">
									{[8, 10, 12, 14, 16].map((row) => (
										<button
											key={row}
											className={cn("px-2 py-1 rounded text-xs", rows === row ? "bg-blue-600 text-white" : "bg-neutral-700 text-gray-300")}
											onClick={() => setRows(row)}
											disabled={isBetting}
										>
											{row}
										</button>
									))}
								</div>
							</div>
						</div>

						<button
							onClick={handlePlaceBet}
							disabled={isBetting}
							className="w-full bg-yellow-500 text-black font-bold py-3 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isBetting ? "Betting..." : "Place Bet"}
						</button>
					</div>

					<PlayersList players={mockPlayers} />
				</div>

				{/* Right Panel - Plinko Game Visualization */}
				<div className="flex-1">
					{/* Game Area with overlaid elements */}
					<div className="h-full bg-gradient-to-r from-teal-900 to-purple-900 rounded-lg relative overflow-hidden">
						{/* Background organic shapes */}
						<div className="absolute inset-0">
							<div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
							<div className="absolute bottom-40 left-20 w-24 h-24 bg-green-400/10 rounded-full blur-lg"></div>
							<div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-400/10 rounded-full blur-md"></div>
						</div>

						{/* Top Section */}
						<div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
							{/* Game ID */}
							<div className="text-white text-sm font-mono">03498945</div>
							
							{/* Statistics Button */}
							<button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg text-white text-sm">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
								</svg>
								<span>Statistics</span>
							</button>
						</div>

						{/* Plinko Board - Central Area */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="relative">
								{/* Triangular grid of pegs */}
								<div className="flex flex-col items-center space-y-4">
									{/* Generate 10 rows of pegs */}
									{Array.from({ length: 10 }, (_, rowIndex) => (
										<div key={rowIndex} className="flex space-x-4">
											{Array.from({ length: rowIndex + 1 }, (_, pegIndex) => {
												// Define the glowing pegs path
												const glowingPegs = [
													{ row: 0, peg: 0 }, // Top apex
													{ row: 2, peg: 1 }, // 3rd row, 2nd peg
													{ row: 4, peg: 2 }, // 5th row, 3rd peg
													{ row: 6, peg: 4 }, // 7th row, 5th peg
													{ row: 8, peg: 6 }, // 9th row, 7th peg
												];
												
												const isGlowing = glowingPegs.some(
													glowPeg => glowPeg.row === rowIndex && glowPeg.peg === pegIndex
												);
												
												return (
													<div
														key={pegIndex}
														className={`w-3 h-3 rounded-full ${
															isGlowing 
																? 'bg-white shadow-lg shadow-white/50 animate-pulse' 
																: 'bg-gray-300'
														}`}
													></div>
												);
											})}
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Right Side Multipliers */}
						<div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
							{[
								{ value: '2.2x', color: 'bg-green-600' },
								{ value: '2.8x', color: 'bg-purple-800' },
								{ value: '2.2x', color: 'bg-green-600' },
								{ value: '2.8x', color: 'bg-purple-800' },
								{ value: '2.8x', color: 'bg-yellow-600' },
								{ value: '2.8x', color: 'bg-purple-800' },
								{ value: '1.8x', color: 'bg-purple-400' }
							].map((multiplier, index) => (
								<div
									key={index}
									className={`px-3 py-2 rounded text-sm font-medium text-white ${multiplier.color}`}
								>
									{multiplier.value}
								</div>
							))}
						</div>

						{/* Bottom Multipliers */}
						<div className="absolute bottom-6 left-6 right-6 flex justify-center space-x-2">
							{[
								{ value: '2.2x', color: 'bg-green-600' },
								{ value: '2.2x', color: 'bg-green-600' },
								{ value: '2.8x', color: 'bg-purple-800' },
								{ value: '2.8x', color: 'bg-purple-800' },
								{ value: '2.8x', color: 'bg-yellow-600' },
								{ value: '2.8x', color: 'bg-yellow-600' },
								{ value: '2.8x', color: 'bg-purple-800' },
								{ value: '1.8x', color: 'bg-purple-400' },
								{ value: '1.8x', color: 'bg-purple-400' },
								{ value: '2.8x', color: 'bg-purple-800' }
							].map((multiplier, index) => (
								<div
									key={index}
									className={`px-3 py-2 rounded text-sm font-medium text-white ${multiplier.color}`}
								>
									{multiplier.value}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<BetsList bets={mockBets} />
		</div>
	);
};

export default Plinko;

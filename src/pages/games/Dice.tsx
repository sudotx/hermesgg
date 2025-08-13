import { useEffect, useState } from "react";
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
	{ id: 1, game: "Dice", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
	{ id: 2, game: "Dice", username: "badalasong", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
	{ id: 3, game: "Dice", username: "haargpooolnt", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
];

// Mock last 100 rolls
// const lastRolls = [
//   { value: 1, dots: [1] },
//   { value: 4, dots: [1, 2, 3, 4] },
//   { value: 6, dots: [1, 2, 3, 4, 5, 6] },
//   { value: 2, dots: [1, 2] },
//   { value: 5, dots: [1, 2, 3, 4, 5] },
//   { value: 3, dots: [1, 2, 3] },
//   { value: 1, dots: [1] },
//   { value: 6, dots: [1, 2, 3, 4, 5, 6] },
//   { value: 4, dots: [1, 2, 3, 4] },
//   { value: 2, dots: [1, 2] },
// ];

const Dice = () => {
	const [betAmount, setBetAmount] = useState("6.83241");
	const [selectedDice, setSelectedDice] = useState(4);
	const [timeLeft, setTimeLeft] = useState(9);

	console.log(timeLeft)

	// Timer countdown
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 9));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const renderDiceFace = (value: number) => {
		const dots = [];
		for (let i = 1; i <= value; i++) {
			dots.push(<div key={i} className="w-1 h-1 bg-black rounded-full"></div>);
		}
		return dots;
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

						{/* Amount of Rows (Dice Selection) */}
						<div className="mb-4">
							<label className="block text-sm text-gray-400 mb-2">Amount of rows</label>
							<div className="grid grid-cols-6 gap-2">
								{[1, 2, 3, 4, 5, 6].map((dice) => (
									<button
										key={dice}
										className={cn(
											"w-8 h-8 bg-white rounded flex items-center justify-center p-1",
											selectedDice === dice ? "ring-2 ring-green-500" : ""
										)}
										onClick={() => setSelectedDice(dice)}
									>
										<div className="grid grid-cols-3 gap-0.5">
											{renderDiceFace(dice)}
										</div>
									</button>
								))}
							</div>
						</div>

						<button className="w-full bg-yellow-500 text-black font-bold py-3 rounded text-lg">
							Play
						</button>
					</div>

					<PlayersList players={mockPlayers} />
				</div>

				{/* Right Panel - Dice Game Visualization */}
				<div className="flex-1">
					{/* Game Area with overlaid elements */}
					<div className="h-full bg-gradient-to-b from-purple-900 to-purple-800 rounded-lg relative overflow-hidden">
						{/* Abstract background shapes - mountain/rock formations */}
						<div className="absolute bottom-0 left-0 right-0 h-32">
							<div className="absolute bottom-0 left-0 w-full h-full">
								{/* Mountain shapes */}
								<div className="absolute bottom-0 left-0 w-1/3 h-24 bg-purple-900 transform skew-x-12"></div>
								<div className="absolute bottom-0 left-1/4 w-1/4 h-20 bg-purple-800 transform skew-x-6"></div>
								<div className="absolute bottom-0 right-1/3 w-1/3 h-28 bg-purple-900 transform -skew-x-12"></div>
								<div className="absolute bottom-0 right-0 w-1/4 h-16 bg-purple-800 transform -skew-x-6"></div>
							</div>
						</div>

						{/* Large circular glow in upper right */}
						<div className="absolute top-10 right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-xl"></div>

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

						{/* Central Game Area - Countdown Timer and Dice */}
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							{/* Countdown Timer */}
							<div className="text-center mb-8">
								<div className="text-gray-300 text-lg mb-2">Until next spin</div>
								<div className="text-white text-6xl font-bold font-mono">00:09</div>
							</div>

							{/* Dice Display */}
							<div className="flex space-x-6">
								{/* Die 1 - showing 1 */}
								<div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center">
									<div className="w-3 h-3 bg-purple-800 rounded-full"></div>
								</div>

								{/* Die 2 - showing 3 */}
								<div className="w-20 h-20 bg-white rounded-lg shadow-lg relative">
									<div className="absolute top-2 left-2 w-3 h-3 bg-purple-800 rounded-full"></div>
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-800 rounded-full"></div>
									<div className="absolute bottom-2 right-2 w-3 h-3 bg-purple-800 rounded-full"></div>
								</div>

								{/* Die 3 - showing 5 */}
								<div className="w-20 h-20 bg-white rounded-lg shadow-lg relative">
									<div className="absolute top-2 left-2 w-3 h-3 bg-purple-800 rounded-full"></div>
									<div className="absolute top-2 right-2 w-3 h-3 bg-purple-800 rounded-full"></div>
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-800 rounded-full"></div>
									<div className="absolute bottom-2 left-2 w-3 h-3 bg-purple-800 rounded-full"></div>
									<div className="absolute bottom-2 right-2 w-3 h-3 bg-purple-800 rounded-full"></div>
								</div>
							</div>
						</div>

						{/* Bottom Section - Last 100 rolls */}
						<div className="absolute bottom-6 left-6 right-6">
							<div className="flex items-center space-x-4">
								<span className="text-white text-sm whitespace-nowrap">Last 100 rolls:</span>
								<div className="flex items-center space-x-1 overflow-x-auto">
									{/* Roll history dice - showing various combinations */}
									{[
										{ value: 1, pips: [[0.5, 0.5]] },
										{ value: 2, pips: [[0.2, 0.2], [0.8, 0.8]] },
										{ value: 3, pips: [[0.2, 0.2], [0.5, 0.5], [0.8, 0.8]] },
										{ value: 4, pips: [[0.2, 0.2], [0.8, 0.2], [0.2, 0.8], [0.8, 0.8]] },
										{ value: 5, pips: [[0.2, 0.2], [0.8, 0.2], [0.5, 0.5], [0.2, 0.8], [0.8, 0.8]] },
										{ value: 6, pips: [[0.2, 0.2], [0.8, 0.2], [0.2, 0.5], [0.8, 0.5], [0.2, 0.8], [0.8, 0.8]] },
										{ value: 1, pips: [[0.5, 0.5]] },
										{ value: 4, pips: [[0.2, 0.2], [0.8, 0.2], [0.2, 0.8], [0.8, 0.8]] },
										{ value: 2, pips: [[0.2, 0.2], [0.8, 0.8]] },
										{ value: 6, pips: [[0.2, 0.2], [0.8, 0.2], [0.2, 0.5], [0.8, 0.5], [0.2, 0.8], [0.8, 0.8]] },
										{ value: 3, pips: [[0.2, 0.2], [0.5, 0.5], [0.8, 0.8]] },
										{ value: 5, pips: [[0.2, 0.2], [0.8, 0.2], [0.5, 0.5], [0.2, 0.8], [0.8, 0.8]] },
										{ value: 1, pips: [[0.5, 0.5]] },
										{ value: 4, pips: [[0.2, 0.2], [0.8, 0.2], [0.2, 0.8], [0.8, 0.8]] },
										{ value: 2, pips: [[0.2, 0.2], [0.8, 0.8]] },
										{ value: 6, pips: [[0.2, 0.2], [0.8, 0.2], [0.2, 0.5], [0.8, 0.5], [0.2, 0.8], [0.8, 0.8]] },
										{ value: 3, pips: [[0.2, 0.2], [0.5, 0.5], [0.8, 0.8]] },
										{ value: 5, pips: [[0.2, 0.2], [0.8, 0.2], [0.5, 0.5], [0.2, 0.8], [0.8, 0.8]] },
										{ value: 1, pips: [[0.5, 0.5]] }
									].map((die, index) => (
										<div key={index} className="w-6 h-6 bg-white rounded flex-shrink-0 relative">
											{die.pips.map((pip, pipIndex) => (
												<div
													key={pipIndex}
													className="absolute w-1 h-1 bg-purple-800 rounded-full"
													style={{
														left: `${pip[0] * 100}%`,
														top: `${pip[1] * 100}%`,
														transform: 'translate(-50%, -50%)'
													}}
												></div>
											))}
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

export default Dice;
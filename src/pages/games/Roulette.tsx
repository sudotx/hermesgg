import { useRef, useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils";
import { GameCanvas } from "../../components/GameCanvas";
import { SceneManager } from "../../lib/three/SceneManager";
import { RouletteGame as RouletteThreeGame } from "../../lib/three/games/RouletteGame";

// Mock data
const mockPlayers = [
	{ id: 1, username: "haargpooolnt", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
	{ id: 2, username: "Kevin", avatar: "👤", multiplier: "1.8x", bet: "4.12345" },
	{ id: 3, username: "badalasong", avatar: "👤", multiplier: "3.1x", bet: "2.98765" },
];

const mockBets = [
	{ id: 1, game: "Roulette", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "9.1151432" },
	{ id: 2, game: "Roulette", username: "badalasong", avatar: "👤", bet: "0.5432109", multiplier: "2.1x", payout: "1.1407429" },
	{ id: 3, game: "Roulette", username: "haargpooolnt", avatar: "👤", bet: "2.1234567", multiplier: "1.5x", payout: "3.1851851" },
];

// Standard European roulette order
const ROULETTE_NUMBERS = [
	0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

// Red numbers for color determination
const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

const Roulette = () => {
	const [betAmount, setBetAmount] = useState("10.00");
	const [selectedColor, setSelectedColor] = useState<"green" | "black" | "red" | null>(null);
	const [isSpinning, setIsSpinning] = useState(false);
	const [lastNumbers, setLastNumbers] = useState<number[]>([]);

	const gameRef = useRef<RouletteThreeGame | null>(null);

	const handleSceneInit = (manager: SceneManager) => {
		const game = new RouletteThreeGame(manager);
		
		// Wire up spin end callback - UI syncs to actual animation completion
		game.onSpinEnd = (result) => {
			setIsSpinning(false);
			setLastNumbers(prev => [result.number, ...prev].slice(0, 10));

			// Determine color of outcome
			let outcomeColor: "green" | "black" | "red" = "black";
			if (result.number === 0) outcomeColor = "green";
			else if (RED_NUMBERS.includes(result.number)) outcomeColor = "red";

			if (outcomeColor === selectedColor) {
				console.log("Won! Bet color matched outcome.");
			} else {
				console.log("Lost! Outcome was", outcomeColor);
			}
		};
		
		gameRef.current = game;
	};

	const handlePlaceBet = () => {
		if (isSpinning || !selectedColor) return;
		setIsSpinning(true);

		// Generate random target index (in production, this comes from smart contract)
		const targetIndex = Math.floor(Math.random() * 37);
		const targetNumber = ROULETTE_NUMBERS[targetIndex];

		// Pass index to game (not number) for consistent mapping
		gameRef.current?.spin(targetIndex);

		console.log(`Spinning... target: ${targetNumber} (index: ${targetIndex})`);
	};

	const getColorStyles = (num: number) => {
		if (num === 0) return 'bg-green-600';
		return RED_NUMBERS.includes(num) ? 'bg-red-600' : 'bg-gray-800';
	};

	return (
		<div className="flex flex-col min-h-screen bg-[#0F1115] text-white">
			<GameNavbar />

			{/* Main Content Area */}
			<div className="w-full max-w-[1500px] mx-auto p-4 md:p-6 flex flex-col gap-6 flex-1">
				{/* Top Section: Controls (Left) & Canvas (Right) */}
				<div className="flex flex-col lg:flex-row gap-6 min-h-[500px] lg:h-[600px]">
					{/* Left Panel - Betting Controls & Player List */}
					<div className="w-full lg:w-[360px] bg-[#1A1D24] p-5 flex flex-col rounded-2xl border border-gray-800/50 shadow-xl overflow-y-auto custom-scrollbar">
						{/* Betting Controls */}
						<div className="flex-none mb-6">
							{/* Manual/Auto Tabs */}
							<div className="flex p-1 bg-[#101217] rounded-lg mb-6">
								<button className="flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 bg-[#252A36] text-white shadow-sm">
									Manual
								</button>
								<button className="flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 text-gray-500 hover:text-gray-300">
									Auto
								</button>
							</div>

							{/* Bet Amount Input */}
							<div className="mb-4">
								<div className="flex justify-between items-center mb-2">
									<label className="text-sm font-medium text-gray-400">Bet amount</label>
								</div>
								<div className="flex items-center space-x-2 bg-[#252A36] rounded-lg p-1.5 border border-gray-700/50 focus-within:border-gray-500 transition-colors">
									<div className="flex-1 relative flex items-center pl-3">
										<div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center mr-2">
											<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										</div>
										<input
											type="text"
											value={betAmount}
											onChange={(e) => setBetAmount(e.target.value)}
											disabled={isSpinning}
											className="w-full bg-transparent text-white font-medium disabled:opacity-50 outline-none"
										/>
									</div>
									<div className="flex space-x-1 pr-1">
										<button disabled={isSpinning} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">1/2</button>
										<button disabled={isSpinning} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">2x</button>
										<button disabled={isSpinning} className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-md text-xs font-semibold hover:bg-green-500/30 transition-colors disabled:opacity-50">Max</button>
									</div>
								</div>
							</div>

							{/* Color Selection */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-400 mb-2">Choose Color</label>
								<div className="grid grid-cols-3 gap-2">
									<button
										disabled={isSpinning}
										className={cn("px-2 py-4 rounded-xl text-sm font-bold transition-all border disabled:opacity-50 flex flex-col items-center",
											selectedColor === "red" ? "bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]" : "bg-[#252A36] border-transparent text-gray-400 hover:bg-[#2A303C]"
										)}
										onClick={() => setSelectedColor("red")}
									>
										<span className="w-5 h-5 rounded-full bg-red-500 mb-1 shadow-[0_0_10px_rgba(239,68,68,0.5)] border border-red-400"></span>
										Red x2
									</button>
									<button
										disabled={isSpinning}
										className={cn("px-2 py-4 rounded-xl text-sm font-bold transition-all border disabled:opacity-50 flex flex-col items-center",
											selectedColor === "green" ? "bg-green-500/10 border-green-500/50 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]" : "bg-[#252A36] border-transparent text-gray-400 hover:bg-[#2A303C]"
										)}
										onClick={() => setSelectedColor("green")}
									>
										<span className="w-5 h-5 rounded-full bg-green-500 mb-1 shadow-[0_0_10px_rgba(34,197,94,0.5)] border border-green-400"></span>
										Green x14
									</button>
									<button
										disabled={isSpinning}
										className={cn("px-2 py-4 rounded-xl text-sm font-bold transition-all border disabled:opacity-50 flex flex-col items-center",
											selectedColor === "black" ? "bg-gray-400/10 border-gray-400/50 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-[#252A36] border-transparent text-gray-400 hover:bg-[#2A303C]"
										)}
										onClick={() => setSelectedColor("black")}
									>
										<span className="w-5 h-5 rounded-full bg-gray-900 mb-1 shadow-[0_0_5px_rgba(0,0,0,0.5)] border border-gray-600"></span>
										Black x2
									</button>
								</div>
							</div>

							<button
								onClick={handlePlaceBet}
								disabled={isSpinning || !selectedColor}
								className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#101217] font-black py-4 rounded-xl text-lg transition-all shadow-yellow-400/20 hover:shadow-yellow-400/40 shadow-lg active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSpinning ? "Spinning..." : "Place Bet"}
							</button>
						</div>

						{/* Divider */}
						<div className="h-px bg-gray-800/50 my-2 flex-none"></div>

						{/* Players List */}
						<div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
							<PlayersList players={mockPlayers} />
						</div>
					</div>

					{/* Right Panel - ThreeJS Game Visualization */}
					<div className="flex-1 flex flex-col relative">
						<div className="w-full h-full bg-[#1A1D24] rounded-2xl relative overflow-hidden border border-gray-800/50 shadow-2xl bg-gradient-to-br from-[#1A1D24] to-[#12141A]">

						{/* Top Section overlays */}
						<div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
							<div className="text-white text-sm font-mono tracking-widest bg-black/50 px-3 py-1 rounded">03498945</div>

							<div className="flex space-x-2">
								{['Red 2x', 'Black 2x', 'Green 14x'].map((multiplier, index) => (
									<button key={index} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors text-white ${multiplier.includes('Red') ? 'bg-red-600' : multiplier.includes('Green') ? 'bg-green-600' : 'bg-gray-800'}`}>
										{multiplier}
									</button>
								))}
							</div>
						</div>

						{/* ThreeJS Container - Perspective camera for depth */}
						<GameCanvas onSceneInit={handleSceneInit} cameraType="perspective" className="absolute inset-0" />

						{/* Bottom Section - Last Rolls */}
						{lastNumbers.length > 0 && (
							<div className="absolute bottom-6 left-6 right-6 flex items-center justify-center space-x-2 z-10 pointer-events-none bg-black/40 py-3 rounded-xl backdrop-blur-sm border border-white/5 mx-10">
								<span className="text-white/70 text-sm font-medium mr-2">Last Outcomes:</span>
								{lastNumbers.map((num, index) => (
									<div
										key={index}
										className={cn(`w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-sm border-2 border-white/20`, getColorStyles(num))}
									>
										{num}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Bottom Section: Bets List */}
			<div className="w-full max-w-[1500px] mx-auto px-4 md:px-6 pb-6 mt-4">
				<BetsList bets={mockBets} />
			</div>
		</div>
		</div>
	);
};

export default Roulette;

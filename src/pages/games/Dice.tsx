import { useRef, useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils";
import { GameCanvas } from "../../components/GameCanvas";
import { SceneManager } from "../../lib/three/SceneManager";
import { DiceGame as DiceThreeGame } from "../../lib/three/games/DiceGame";

// Mock data
const mockPlayers = [
	{ id: 1, username: "haargpooolnt", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
	{ id: 2, username: "Kevin", avatar: "👤", multiplier: "1.8x", bet: "4.12345" },
	{ id: 3, username: "badalasong", avatar: "👤", multiplier: "3.1x", bet: "2.98765" },
];

const mockBets = [
	{ id: 1, game: "Dice", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
	{ id: 2, game: "Dice", username: "badalasong", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
	{ id: 3, game: "Dice", username: "haargpooolnt", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
];

const Dice = () => {
	const [betAmount, setBetAmount] = useState("10.00");
	const [selectedDice, setSelectedDice] = useState(4);
	const [isRolling, setIsRolling] = useState(false);
	const [rollHistory, setRollHistory] = useState<number[]>([1, 4, 2, 6, 3, 5, 1, 4, 2, 6]);

	const gameRef = useRef<DiceThreeGame | null>(null);

	const handleSceneInit = (manager: SceneManager) => {
		const game = new DiceThreeGame(manager);
		gameRef.current = game;
	};

	const handlePlay = () => {
		if (isRolling) return;
		setIsRolling(true);

		// Backend generates outcome
		const outcome = Math.floor(Math.random() * 6) + 1;
		
		gameRef.current?.roll(outcome);

		// Roll animation takes 2.0s in DiceGame class
		setTimeout(() => {
			setIsRolling(false);
			setRollHistory((prev) => [...prev, outcome].slice(-20)); // Keep last 20

			if (outcome === selectedDice) {
				console.log(`Won! You rolled a ${outcome}.`);
			} else {
				console.log(`Lost! You rolled a ${outcome}.`);
			}
		}, 2100);
	};

	const renderDiceFace = (value: number) => {
		const dots = [];
		for (let i = 1; i <= value; i++) {
			dots.push(<div key={i} className="w-1.5 h-1.5 bg-black rounded-full"></div>);
		}
		return dots;
	};

	// Helper to render mini dice for history
	const renderMiniHistoryDice = (val: number) => {
		// Just a visual representation based on value
		const pips: number[][] = [];
		if ([1, 3, 5].includes(val)) pips.push([0.5, 0.5]);
		if ([2, 3, 4, 5, 6].includes(val)) { pips.push([0.2, 0.2], [0.8, 0.8]); }
		if ([4, 5, 6].includes(val)) { pips.push([0.8, 0.2], [0.2, 0.8]); }
		if (val === 6) { pips.push([0.2, 0.5], [0.8, 0.5]); }

		return pips.map((pip, idx) => (
			<div
				key={idx}
				className="absolute w-1.5 h-1.5 bg-blue-900 rounded-full"
				style={{ left: `${pip[0] * 100}%`, top: `${pip[1] * 100}%`, transform: 'translate(-50%, -50%)' }}
			/>
		));
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
											disabled={isRolling}
											className="w-full bg-transparent text-white font-medium disabled:opacity-50 outline-none"
										/>
									</div>
									<div className="flex space-x-1 pr-1">
										<button disabled={isRolling} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">1/2</button>
										<button disabled={isRolling} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">2x</button>
										<button disabled={isRolling} className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-md text-xs font-semibold hover:bg-green-500/30 transition-colors disabled:opacity-50">Max</button>
									</div>
								</div>
							</div>

							{/* Face Selection */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-400 mb-2">Target Face</label>
								<div className="grid grid-cols-3 gap-2">
									{[1, 2, 3, 4, 5, 6].map((dice) => (
										<button
											key={dice}
											disabled={isRolling}
											className={cn(
												"h-12 rounded-xl flex items-center justify-center p-1 transition-all border",
												selectedDice === dice 
													? "bg-green-500/10 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.15)]" 
													: "bg-[#252A36] border-transparent hover:bg-[#2A303C]",
												isRolling && "opacity-50 cursor-not-allowed transform-none"
											)}
											onClick={() => setSelectedDice(dice)}
										>
											<div className="flex flex-wrap items-center justify-center w-6 h-6 gap-0.5">
												{renderDiceFace(dice).map((_, i) => (
													<div key={i} className={cn("w-1.5 h-1.5 rounded-full", selectedDice === dice ? "bg-green-400" : "bg-gray-400")}></div>
												))}
											</div>
										</button>
									))}
								</div>
							</div>

							<button 
								className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#101217] font-black py-4 rounded-xl text-lg transition-all shadow-yellow-400/20 hover:shadow-yellow-400/40 shadow-lg active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
								onClick={handlePlay}
								disabled={isRolling}
							>
								{isRolling ? "Rolling..." : "Roll Dice"}
							</button>
						</div>

						{/* Divider */}
						<div className="h-px bg-gray-800/50 my-2 flex-none"></div>

						{/* Players List */}
						<div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
							<PlayersList players={mockPlayers} />
						</div>
					</div>

					{/* Right Panel - 3D Dice Visualization */}
					<div className="flex-1 flex flex-col relative">
						<div className="w-full h-full bg-[#1A1D24] rounded-2xl relative overflow-hidden border border-gray-800/50 shadow-2xl bg-gradient-to-br from-[#1A1D24] to-[#12141A]">
						
						{/* Top Section */}
						<div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
							<div className="text-white text-sm font-mono tracking-widest bg-black/40 px-3 py-1 rounded">03498945</div>
							<button className="flex items-center space-x-2 px-4 py-2 bg-black/30 rounded-md text-white text-sm pointer-events-auto hover:bg-black/50 transition">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
								</svg>
								<span>Statistics</span>
							</button>
						</div>

						{/* 3D Canvas */}
						<GameCanvas onSceneInit={handleSceneInit} cameraType="perspective" className="absolute inset-0" />

						{/* Center Decor text on top of canvas if needed */}
						<div className="absolute inset-0 flex items-start justify-center pt-24 pointer-events-none z-10">
							<div className="text-center opacity-30">
								<div className="text-white text-7xl font-black tracking-widest uppercase">Roll</div>
							</div>
						</div>

						{/* Bottom Section - Last Rolls */}
						<div className="absolute bottom-6 left-6 right-6 px-4">
							<div className="flex items-center bg-black/40 p-3 rounded-xl backdrop-blur-md border border-white/5 space-x-4">
								<span className="text-white/70 text-sm font-semibold whitespace-nowrap uppercase tracking-wider">History:</span>
								<div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
									{rollHistory.map((val, index) => (
										<div 
											key={index} 
											className={cn(
												"w-8 h-8 rounded bg-white relative flex-shrink-0 shadow-lg transition-all",
												index === rollHistory.length - 1 ? "ring-2 ring-green-500 scale-110 ml-2" : "opacity-80"
											)}
										>
											{renderMiniHistoryDice(val)}
										</div>
									))}
								</div>
							</div>
						</div>
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

export default Dice;
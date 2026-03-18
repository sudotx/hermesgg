import { useEffect, useRef, useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils";
import { GameCanvas } from "../../components/GameCanvas";
import { SceneManager } from "../../lib/three/SceneManager";
import { PhysicsManager } from "../../lib/three/PhysicsManager";
import { PlinkoGame } from "../../lib/three/games/PlinkoGame";

// Mock data for players
const mockPlayers = [
	{ id: 1, username: "haargpooolnt", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
	{ id: 2, username: "Kevin", avatar: "👤", multiplier: "1.8x", bet: "4.12345" },
	{ id: 3, username: "badalasong", avatar: "👤", multiplier: "3.1x", bet: "2.98765" },
];

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
	const [lastResult, setLastResult] = useState<{ multiplier: string; payout: number } | null>(null);

	const physicsManagerRef = useRef<PhysicsManager>(new PhysicsManager());
	const gameRef = useRef<PlinkoGame | null>(null);

	const handleSceneInit = async (manager: SceneManager) => {
		const pm = physicsManagerRef.current;
		await pm.init();

		const game = new PlinkoGame(manager, pm);
		
		// Wire up ball land callback
		game.onBallLand = (result) => {
			setLastResult({ multiplier: result.multiplier, payout: result.payout });
			setIsBetting(false);
			console.log(`Ball landed! Multiplier: ${result.multiplier}, Payout: ${result.payout}x`);
		};
		
		gameRef.current = game;

		await game.buildBoard(rows);
	};

	useEffect(() => {
		if (gameRef.current) {
			gameRef.current.buildBoard(rows);
		}
	}, [rows]);

	const handleHalfBet = () => setBetAmount((prev) => (parseFloat(prev) / 2).toFixed(2));
	const handleDoubleBet = () => setBetAmount((prev) => (parseFloat(prev) * 2).toFixed(2));

	const handlePlaceBet = () => {
		if (isBetting) return;
		setIsBetting(true);
		setLastResult(null); // Clear previous result

		// Backend simulates outcome (0 = left, 1 = right bounce)
		const path: number[] = [];
		for(let i=0; i<rows; i++) {
			path.push(Math.random() > 0.5 ? 1 : 0);
		}

		gameRef.current?.dropBall(path);
	};

	const multipliersMap: Record<number, {value: string, color: string}[]> = {
		8: [
			{ value: '5.6x', color: 'bg-red-600' }, { value: '2.1x', color: 'bg-orange-600' }, { value: '1.1x', color: 'bg-yellow-600' },
			{ value: '1x', color: 'bg-green-600' }, { value: '0.5x', color: 'bg-gray-600' }, { value: '1x', color: 'bg-green-600' },
			{ value: '1.1x', color: 'bg-yellow-600' }, { value: '2.1x', color: 'bg-orange-600' }, { value: '5.6x', color: 'bg-red-600' }
		]
	};

	const currentMultipliers = multipliersMap[8] || multipliersMap[8]; // Fallback purely for visuals

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
								<button
									onClick={() => setBetMode("manual")}
									className={cn("flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-200", betMode === "manual" ? "bg-[#252A36] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
								>
									Manual
								</button>
								<button
									onClick={() => setBetMode("auto")}
									className={cn("flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-200", betMode === "auto" ? "bg-[#252A36] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
								>
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
											disabled={isBetting}
											className="w-full bg-transparent text-white font-medium disabled:opacity-50 outline-none"
										/>
									</div>
									<div className="flex space-x-1 pr-1">
										<button onClick={handleHalfBet} disabled={isBetting} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">1/2</button>
										<button onClick={handleDoubleBet} disabled={isBetting} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">2x</button>
									</div>
								</div>
							</div>

							{/* Difficulty */}
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-400 mb-2">Difficulty</label>
								<div className="flex bg-[#252A36] rounded-xl p-1 border border-gray-700/50 relative">
									<button
										className={cn("flex-1 py-2 rounded-lg text-sm font-bold transition-all relative z-10", difficulty === "easy" ? "text-green-500" : "text-gray-400 hover:text-gray-300")}
										onClick={() => setDifficulty("easy")}
										disabled={isBetting}
									>
										Easy
										{difficulty === "easy" && <div className="absolute inset-0 bg-green-500/10 rounded-lg -z-10 border border-green-500/30"></div>}
									</button>
									<button
										className={cn("flex-1 py-2 rounded-lg text-sm font-bold transition-all relative z-10", difficulty === "medium" ? "text-yellow-500" : "text-gray-400 hover:text-gray-300")}
										onClick={() => setDifficulty("medium")}
										disabled={isBetting}
									>
										Medium
										{difficulty === "medium" && <div className="absolute inset-0 bg-yellow-500/10 rounded-lg -z-10 border border-yellow-500/30"></div>}
									</button>
									<button
										className={cn("flex-1 py-2 rounded-lg text-sm font-bold transition-all relative z-10", difficulty === "hard" ? "text-red-500" : "text-gray-400 hover:text-gray-300")}
										onClick={() => setDifficulty("hard")}
										disabled={isBetting}
									>
										Hard
										{difficulty === "hard" && <div className="absolute inset-0 bg-red-500/10 rounded-lg -z-10 border border-red-500/30"></div>}
									</button>
								</div>
							</div>

							{/* Amount of Rows */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-400 mb-2">Amount of rows</label>
								<div className="flex space-x-2">
									{[8, 10, 12, 14, 16].map((row) => (
										<button
											key={row}
											className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all border disabled:opacity-50", rows === row ? "bg-blue-500/10 border-blue-500/50 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "bg-[#252A36] border-transparent text-gray-400 hover:bg-[#2A303C]")}
											onClick={() => setRows(row)}
											disabled={isBetting}
										>
											{row}
										</button>
									))}
								</div>
							</div>

							<button
								onClick={handlePlaceBet}
								disabled={isBetting}
								className="w-full bg-green-500 hover:bg-green-400 text-[#101217] font-black py-4 rounded-xl text-lg transition-all shadow-green-500/20 hover:shadow-green-500/40 shadow-lg active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isBetting ? "Dropping..." : "Place Bet"}
							</button>
						</div>

						{/* Divider */}
						<div className="h-px bg-gray-800/50 my-2 flex-none"></div>

						{/* Players List */}
						<div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
							<PlayersList players={mockPlayers} />
						</div>
					</div>

					{/* Right Panel - Plinko Game Visualization */}
					<div className="flex-1 flex flex-col relative">
						<div className="w-full h-full bg-[#1A1D24] rounded-2xl relative overflow-hidden border border-gray-800/50 shadow-2xl bg-gradient-to-br from-[#1A1D24] to-[#12141A]">
						
						{/* Top Section */}
						<div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
							<div className="text-white text-sm font-mono">03498945</div>
							{lastResult && (
								<div className="px-4 py-2 bg-green-500/90 rounded-lg text-white text-sm font-bold animate-pulse">
									Landed: {lastResult.multiplier}
								</div>
							)}
							<button className="flex items-center space-x-2 px-4 py-2 bg-neutral-800/80 rounded-md text-white text-sm pointer-events-auto hover:bg-neutral-700 transition">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
								</svg>
								<span>Statistics</span>
							</button>
						</div>

						{/* Plinko Board - Central Area */}
						<GameCanvas onSceneInit={handleSceneInit} cameraType="orthographic" className="absolute inset-0" />

						{/* Bottom Multipliers Overlay */}
						<div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1 px-10 pointer-events-none z-10">
							{currentMultipliers.map((multiplier, index) => (
								<div
									key={index}
									className={`flex-1 flex items-center justify-center py-2 rounded text-xs font-bold text-black border border-black/20 shadow-lg ${multiplier.color}`}
								>
									{multiplier.value}
								</div>
							))}
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

export default Plinko;

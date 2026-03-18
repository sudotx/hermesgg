import { useEffect, useRef, useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils/cn";
import { GameCanvas } from "../../components/GameCanvas";
import { SceneManager } from "../../lib/three/SceneManager";
import { CrashGame } from "../../lib/three/games/CrashGame";

// Mock data for players
const mockPlayers = [
	{ id: 1, username: "haargpooolnt", avatar: "", multiplier: "2.2x", bet: "6.83241" },
	{ id: 2, username: "Kevin", avatar: "", multiplier: "1.8x", bet: "4.12345" },
	{ id: 3, username: "badalasong", avatar: "", multiplier: "3.1x", bet: "2.98765" },
];

// Mock data for bets history
const mockBets = [
	{ id: 1, game: "Crash", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "9.1151432" },
	{ id: 2, game: "Crash", username: "badalasong", avatar: "👤", bet: "0.5432109", multiplier: "2.1x", payout: "1.1407429" },
	{ id: 3, game: "Crash", username: "haargpooolnt", avatar: "👤", bet: "2.1234567", multiplier: "1.5x", payout: "3.1851851" },
];

const Crash = () => {
	const [betMode, setBetMode] = useState<"manual" | "auto">("manual");
	const [betAmount, setBetAmount] = useState("10.00");
	const [autoCashout, setAutoCashout] = useState("2.00");

	const [gameStatus, setGameStatus] = useState<"idle" | "starting" | "running" | "crashed">("idle");
	const [countdown, setCountdown] = useState(5.0);

	// Throttled multiplier for UI (not every frame)
	const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
	const [hasCashedOut, setHasCashedOut] = useState(false);

	const gameRef = useRef<CrashGame | null>(null);
	const roundStartedRef = useRef(false);

	// Refs for throttling and persistence
	const currentMultiplierRef = useRef(1.0);
	const lastMultiplierUpdateRef = useRef(0);
	const countdownRef = useRef(5.0);

	const handleHalfBet = () => setBetAmount((prev) => (parseFloat(prev || "0") / 2).toFixed(2));
	const handleDoubleBet = () => setBetAmount((prev) => (parseFloat(prev || "0") * 2).toFixed(2));
	const handleMaxBet = () => setBetAmount("1000.00");
	const handleSetAutoCashout = (value: string) => setAutoCashout(value);

	const handleSceneInit = (manager: SceneManager) => {
		const game = new CrashGame(manager);
		
		// Wire up game callbacks
		game.onStateChange = (state) => {
			if (state === 'crashed') {
				setGameStatus('crashed');
			}
		};
		
		game.onMultiplier = (mult) => {
			currentMultiplierRef.current = mult;
			const now = performance.now();
			// Throttle: update React state only if delta > 0.02 or 100ms elapsed
			if (Math.abs(mult - currentMultiplier) > 0.02 || (now - lastMultiplierUpdateRef.current) > 100) {
				setCurrentMultiplier(mult);
				lastMultiplierUpdateRef.current = now;
			}
		};
		
		game.onCrash = () => {
			setCurrentMultiplier(game.getCrashPoint());
		};
		
		gameRef.current = game;
	};

	const handlePlaceBet = () => {
		if (gameStatus === "idle" && !hasPlacedBet) {
			setHasPlacedBet(true);
			console.log(`Placed bet of ${betAmount}`);
		}
	};

	const handleCashout = () => {
		if (gameStatus === "running" && !hasCashedOut && hasPlacedBet) {
			setHasCashedOut(true);
			console.log(`Cashed out at ${currentMultiplier.toFixed(2)}x. Payout: ${(parseFloat(betAmount) * currentMultiplier).toFixed(2)}`);
		}
	};

	// Game State Machine - simplified, no RAF loop
	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (gameStatus === "idle") {
			// Phase 1: Betting Window
			countdownRef.current = 5.0;
			setCountdown(5.0);
			roundStartedRef.current = false;

			const tick = () => {
				countdownRef.current -= 0.1;
				setCountdown(countdownRef.current);

				if (countdownRef.current <= 0.1) {
					setGameStatus("starting");
					return;
				}
				timer = setTimeout(tick, 100);
			};
			timer = setTimeout(tick, 100);

		} else if (gameStatus === "starting") {
			// Phase 2: Round Start - game logic handles crash point internally
			setCurrentMultiplier(1.0);
			currentMultiplierRef.current = 1.0;
			setHasCashedOut(false);
			gameRef.current?.reset();

			timer = setTimeout(() => {
				setGameStatus("running");
			}, 1000);

		} else if (gameStatus === "running") {
			// Phase 3: Let CrashGame drive everything - only start once per round
			if (!roundStartedRef.current) {
				roundStartedRef.current = true;
				gameRef.current?.start();
			}
		}

		return () => {
			clearTimeout(timer);
		};
	}, [gameStatus]);

	// Effect for auto-cashout
	useEffect(() => {
		if (gameStatus === "running" && betMode === "auto" && !hasCashedOut && autoCashout) {
			const target = parseFloat(autoCashout);
			if (currentMultiplier >= target) {
				handleCashout();
			}
		}
	}, [currentMultiplier, gameStatus, autoCashout, hasCashedOut, betMode]);

	// Effect for resetting the game after a crash
	useEffect(() => {
		if (gameStatus === "crashed") {
			const timeout = setTimeout(() => {
				setGameStatus("idle");
				setHasPlacedBet(false);
				roundStartedRef.current = false;
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [gameStatus]);

	// Betting locked during starting and running (NOT during crashed - allow early bet)
	const isBettingLocked = gameStatus !== "idle";
	const [hasPlacedBet, setHasPlacedBet] = useState(false);

	const mainButtonText = () => {
		if (gameStatus === "idle" || gameStatus === "starting" || gameStatus === "crashed") {
			if (hasPlacedBet && gameStatus !== "crashed") return "Bet Placed";
			return "Place Bet";
		}
		if (gameStatus === "running") {
			if (hasCashedOut) return `Cashed Out @ ${currentMultiplier.toFixed(2)}x`;
			if (!hasPlacedBet) return "Waiting for next round";
			return `Cashout @ ${currentMultiplier.toFixed(2)}x`;
		}
	};

	const mainButtonAction = gameStatus === "running" && hasPlacedBet ? handleCashout : handlePlaceBet;
	const isMainButtonDisabled = (gameStatus === "idle" && hasPlacedBet) || gameStatus === "starting" || (gameStatus === "running" && (hasCashedOut || !hasPlacedBet)) || gameStatus === "crashed";

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
										{/* Crypto Icon (ETH style) */}
										<div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center mr-2">
											<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										</div>
										<input
											type="text"
											value={betAmount}
											onChange={(e) => setBetAmount(e.target.value)}
											disabled={isBettingLocked}
											className="w-full bg-transparent text-white font-medium disabled:opacity-50 outline-none"
										/>
									</div>
									<div className="flex space-x-1 pr-1">
										<button onClick={handleHalfBet} disabled={isBettingLocked} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">1/2</button>
										<button onClick={handleDoubleBet} disabled={isBettingLocked} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">2x</button>
										<button onClick={handleMaxBet} disabled={isBettingLocked} className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-md text-xs font-semibold hover:bg-green-500/30 transition-colors disabled:opacity-50">Max</button>
									</div>
								</div>
							</div>

							{/* Auto Cashout Input */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-400 mb-2">Auto cashout</label>
								<div className="flex items-center space-x-2 bg-[#252A36] rounded-lg p-1.5 border border-gray-700/50 focus-within:border-gray-500 transition-colors">
									<div className="flex-1 relative flex items-center pl-3">
										<div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center mr-2">
											<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										</div>
										<input
											type="text"
											value={autoCashout}
											onChange={(e) => setAutoCashout(e.target.value)}
											disabled={isBettingLocked}
											className="w-full bg-transparent text-white font-medium disabled:opacity-50 outline-none"
										/>
									</div>
									<div className="flex space-x-1 pr-1">
										<button onClick={() => handleSetAutoCashout("2.00")} disabled={isBettingLocked} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">2.00x</button>
										<button onClick={() => handleSetAutoCashout("10.00")} disabled={isBettingLocked} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">10.00x</button>
									</div>
								</div>
							</div>

							<button
								onClick={mainButtonAction}
								disabled={isMainButtonDisabled}
								className={cn("w-full text-[#101217] font-black py-4 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]", {
									"bg-yellow-400 hover:bg-yellow-300 shadow-yellow-400/20 hover:shadow-yellow-400/40": gameStatus === "idle",
									"bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/20": gameStatus === "running" && !hasCashedOut,
									"bg-[#2A303C] text-gray-400": gameStatus === "running" && hasCashedOut,
									"bg-red-500 text-white shadow-red-500/20": gameStatus === "crashed",
									"opacity-50 cursor-not-allowed transform-none": isMainButtonDisabled,
								})}
							>
								{mainButtonText()}
							</button>
						</div>

						{/* Divider */}
						<div className="h-px bg-gray-800/50 my-2 flex-none"></div>

						{/* Players List */}
						<div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
							<PlayersList players={mockPlayers} />
						</div>
					</div>

					{/* Center Panel - ThreeJS Game Visualization */}
					<div className="flex-1 flex flex-col relative">
						<div className="w-full h-full bg-[#1A1D24] rounded-2xl relative overflow-hidden border border-gray-800/50 shadow-2xl">

						{/* 3D Canvas */}
						<GameCanvas onSceneInit={handleSceneInit} cameraType="orthographic" className="absolute inset-0" />

						{/* Y-Axis Chart Overlay (Right Side) */}
						<div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none flex flex-col justify-between py-10 opacity-40">
							{[5, 4, 3, 2, 1].map((val, i) => {
								const highestScale = Math.max(5, Math.ceil(currentMultiplier + 1));
								const step = highestScale / 5;
								const labelValue = (step * val).toFixed(2);

								return (
								<div key={i} className="flex relative items-center justify-end pr-2 text-xs font-mono text-gray-500">
									<div className="absolute left-0 right-8 border-t border-dashed border-gray-600"></div>
									{labelValue}x
								</div>
							)})}
						</div>

						{/* Header Overlay */}
						<div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
								<span className="text-sm font-mono text-gray-400">03498945</span>
							</div>
							<div className="flex space-x-2">
								{['2.2x', '2.8x', '1.8x'].map((multiplier, index) => (
									<button key={index} className="px-3 py-1 rounded bg-neutral-800 text-gray-300 text-xs font-mono border border-neutral-700">{multiplier}</button>
								))}
							</div>
						</div>

						{/* Center Display: Multiplier / Preparing Round */}
						<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
							{gameStatus === "idle" || gameStatus === "starting" ? (
								<div className="text-center flex flex-col items-center">
									{/* Keep multiplier visible but dimmed during prep */}
									<div className="text-5xl md:text-6xl font-black text-white/30 tracking-tight mb-4">
										{currentMultiplier.toFixed(2)}x
									</div>
									<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
										Preparing Round
									</h1>
									<p className="text-xl font-bold text-yellow-400 mt-2">
										{gameStatus === "idle" ? `Starting in ${countdown.toFixed(2)}s` : "Starting..."}
									</p>
								</div>
							) : (
								<div className="text-center">
									<h1
										className={cn("text-7xl md:text-8xl font-black tracking-tighter transition-all duration-300", {
											"text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]": gameStatus !== "crashed",
											"text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]": gameStatus === "crashed",
										})}
									>
										{currentMultiplier.toFixed(2)}x
									</h1>
									<p className="text-lg md:text-xl font-bold text-[#A294C6] mt-1">Current Payout</p>
									{gameStatus === "crashed" && <p className="text-2xl font-bold text-red-500 tracking-widest mt-2 uppercase">Crashed!</p>}
								</div>
							)}
						</div>

					</div>
				</div>
			</div>

			{/* Bottom Section: Bets List */}
			<div className="w-full max-w-[1500px] mx-auto px-4 md:px-6 pb-6">
				<BetsList bets={mockBets} />
			</div>
		</div>
		</div>
	);
};

export default Crash;

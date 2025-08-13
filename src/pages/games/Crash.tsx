import { useEffect, useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils/cn";

// Mock data for players
const mockPlayers = [
	{ id: 1, username: "haargpooolnt", avatar: "", multiplier: "2.2x", bet: "6.83241" },
	{ id: 2, username: "Kevin", avatar: "", multiplier: "1.8x", bet: "4.12345" },
	{ id: 3, username: "badalasong", avatar: "", multiplier: "3.1x", bet: "2.98765" },
	{ id: 4, username: "player4", avatar: "", multiplier: "1.5x", bet: "1.23456" },
	{ id: 5, username: "player5", avatar: "", multiplier: "2.8x", bet: "3.45678" },
];

// Mock data for bets history
const mockBets = [
	{ id: 1, game: "Crash", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "9.1151432" },
	{ id: 2, game: "Crash", username: "badalasong", avatar: "👤", bet: "0.5432109", multiplier: "2.1x", payout: "1.1407429" },
	{ id: 3, game: "Crash", username: "haargpooolnt", avatar: "👤", bet: "2.1234567", multiplier: "1.5x", payout: "3.1851851" },
	{ id: 4, game: "Crash", username: "player4", avatar: "👤", bet: "0.9876543", multiplier: "3.2x", payout: "3.1604938" },
];

const Crash = () => {
	const [betMode, setBetMode] = useState<"manual" | "auto">("manual");
	const [betAmount, setBetAmount] = useState("10.00");
	const [autoCashout, setAutoCashout] = useState("2.00");
	const [gameStatus, setGameStatus] = useState<"idle" | "running" | "crashed">("idle");
	const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
	const [crashPoint, setCrashPoint] = useState<number | null>(null);
	const [hasCashedOut, setHasCashedOut] = useState(false);

	const handleHalfBet = () => {
		setBetAmount((prev) => (parseFloat(prev || "0") / 2).toFixed(2));
	};

	const handleDoubleBet = () => {
		setBetAmount((prev) => (parseFloat(prev || "0") * 2).toFixed(2));
	};

	const handleMaxBet = () => {
		// Assuming a mock balance of 1000 for demonstration
		setBetAmount("1000.00");
	};

	const handleSetAutoCashout = (value: string) => {
		setAutoCashout(value);
	};

	const handlePlaceBet = () => {
		if (gameStatus === "idle") {
			setGameStatus("running");
			setCurrentMultiplier(1.0);
			setHasCashedOut(false);
			// Set a random crash point, e.g., between 1.1 and 10
			const randomCrashPoint = Math.random() * 8.9 + 1.1;
			setCrashPoint(randomCrashPoint);
		}
	};

	const handleCashout = () => {
		if (gameStatus === "running" && !hasCashedOut) {
			setHasCashedOut(true);
			console.log(`Cashed out at ${currentMultiplier.toFixed(2)}x. Payout: ${(parseFloat(betAmount) * currentMultiplier).toFixed(2)}`);
		}
	};

	// Game loop for multiplier increase
	useEffect(() => {
		if (gameStatus !== "running") return;

		const interval = setInterval(() => {
			setCurrentMultiplier((prev) => {
				const newMultiplier = prev + 0.01;
				if (crashPoint && newMultiplier >= crashPoint) {
					setGameStatus("crashed");
					clearInterval(interval);
					return crashPoint;
				}
				return newMultiplier;
			});
		}, 50); // Faster update for smoother visuals

		return () => clearInterval(interval);
	}, [gameStatus, crashPoint]);

	// Effect for auto-cashout
	useEffect(() => {
		if (gameStatus === "running" && betMode === "auto" && !hasCashedOut && autoCashout && currentMultiplier >= parseFloat(autoCashout)) {
			handleCashout();
		}
	}, [currentMultiplier, gameStatus, autoCashout, hasCashedOut, betMode]);

	// Effect for resetting the game after a crash
	useEffect(() => {
		if (gameStatus === "crashed") {
			const timeout = setTimeout(() => {
				setGameStatus("idle");
				setCurrentMultiplier(1.0);
				setCrashPoint(null);
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [gameStatus]);

	const isBettingLocked = gameStatus !== "idle";

	const mainButtonText = () => {
		if (gameStatus === "idle") return "Place Bet";
		if (gameStatus === "running") {
			if (hasCashedOut) return `Cashed Out @ ${currentMultiplier.toFixed(2)}x`;
			return `Cashout @ ${currentMultiplier.toFixed(2)}x`;
		}
		if (gameStatus === "crashed") return `Crashed @ ${crashPoint?.toFixed(2)}x`;
	};

	const mainButtonAction = gameStatus === "running" ? handleCashout : handlePlaceBet;
	const isMainButtonDisabled = gameStatus === "crashed" || (gameStatus === "running" && hasCashedOut);

	return (
		<div className="flex flex-col h-screen bg-neutral-900 text-white">
			<GameNavbar />

			{/* Main Content */}
			<div className="flex flex-1 gap-4 overflow-hidden">
				{/* Left Panel - Betting Controls & Player List */}
				<div className="w-80 bg-neutral-800 p-4 flex flex-col">
					{/* Betting Controls */}
					<div className="mb-6">
						<div className="flex mb-4">
							<button
								onClick={() => setBetMode("manual")}
								className={cn("flex-1 px-4 py-2 rounded-l text-sm font-medium", betMode === "manual" ? "bg-neutral-700 text-white" : "bg-neutral-800 text-gray-400")}
							>
								Manual
							</button>
							<button
								onClick={() => setBetMode("auto")}
								className={cn("flex-1 px-4 py-2 rounded-r text-sm", betMode === "auto" ? "bg-neutral-700 text-white" : "bg-neutral-800 text-gray-400")}
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
										disabled={isBettingLocked}
										className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded text-white disabled:opacity-50"
									/>
								</div>
								<button onClick={handleHalfBet} disabled={isBettingLocked} className="px-3 py-2 bg-neutral-700 rounded text-sm disabled:opacity-50">
									1/2
								</button>
								<button onClick={handleDoubleBet} disabled={isBettingLocked} className="px-3 py-2 bg-neutral-700 rounded text-sm disabled:opacity-50">
									2x
								</button>
								<button onClick={handleMaxBet} disabled={isBettingLocked} className="px-3 py-2 bg-green-600 rounded text-sm disabled:opacity-50">
									Max
								</button>
							</div>
						</div>

						{/* Auto Cashout */}
						<div className="mb-4">
							<label className="block text-sm text-gray-400 mb-2">Auto cashout</label>
							<div className="flex items-center space-x-2">
								<div className="flex-1 relative">
									<div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
									<input
										type="text"
										value={autoCashout}
										onChange={(e) => setAutoCashout(e.target.value)}
										disabled={isBettingLocked}
										className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded text-white disabled:opacity-50"
									/>
								</div>
								<button onClick={() => handleSetAutoCashout("2.00")} disabled={isBettingLocked} className="px-3 py-2 bg-neutral-700 rounded text-sm disabled:opacity-50">
									2.00x
								</button>
								<button onClick={() => handleSetAutoCashout("10.00")} disabled={isBettingLocked} className="px-3 py-2 bg-neutral-700 rounded text-sm disabled:opacity-50">
									10.00x
								</button>
							</div>
						</div>

						<button
							onClick={mainButtonAction}
							disabled={isMainButtonDisabled}
							className={cn("w-full text-black font-bold py-3 rounded-full text-lg transition-colors", {
								"bg-yellow-500 hover:bg-yellow-600": gameStatus === "idle",
								"bg-red-500 hover:bg-red-600": gameStatus === "running" && !hasCashedOut,
								"bg-green-500": gameStatus === "running" && hasCashedOut,
								"bg-neutral-600 text-white": gameStatus === "crashed",
								"opacity-50 cursor-not-allowed": isMainButtonDisabled,
							})}
						>
							{mainButtonText()}
						</button>

						{/* Player count */}
						<div className="mt-6 text-center">
							<span className="text-gray-400 text-sm">60 players</span>
						</div>
					</div>

					<PlayersList players={mockPlayers} />
				</div>

				{/* Center Panel - Game Visualization */}
				<div className="flex-1">
					{/* Game Area with overlaid elements */}
					<div className="h-full bg-gradient-to-br from-teal-900 via-blue-900 to-purple-900 rounded-lg relative overflow-hidden">
						{/* Grid background */}
						<div className="absolute inset-0 opacity-20">
							<div className="w-full h-full" style={{
								backgroundImage: `
									linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
									linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
								`,
								backgroundSize: '40px 40px'
							}}></div>
						</div>

						{/* Network Status & Multiplier Buttons - Overlaid at top */}
						<div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-sm text-gray-300">Network Status</span>
							</div>
							<div className="flex space-x-2">
								{['2.2x', '2.8x', '2.8x', '2.8x', '1.8x'].map((multiplier, index) => (
									<button
										key={index}
										className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors",
											multiplier === '2.2x' ? "bg-green-600 text-white" :
											multiplier === '2.8x' ? "bg-yellow-600 text-white" :
											"bg-purple-600 text-white"
										)}
									>
										{multiplier}
									</button>
								))}
							</div>
						</div>

						{/* Y-axis labels */}
						<div className="absolute left-4 top-0 bottom-0 flex flex-col justify-between py-8 text-sm text-gray-300 font-medium">
							<span>3x</span>
							<span>2.8x</span>
							<span>2.4x</span>
							<span>2x</span>
							<span>1.8x</span>
							<span>1.4x</span>
							<span>1x</span>
						</div>

						{/* Rocket trajectory */}
						<svg className="absolute inset-0 w-full h-full">
							<defs>
								<linearGradient id="trajectoryGradient" x1="0%" y1="100%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
									<stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
									<stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
								</linearGradient>
							</defs>
							<path
								d="M 50 400 Q 200 300 400 100 Q 600 50 800 20"
								stroke="url(#trajectoryGradient)"
								strokeWidth="4"
								fill="none"
								className="drop-shadow-lg"
							/>
						</svg>

						{/* Rocket */}
						<div className="absolute" style={{ right: '15%', top: '15%' }}>
							<div className="relative">
								<div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
							</div>
						</div>

						{/* Current Multiplier Display */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-center">
								<h1
									className={cn("text-8xl font-bold transition-all duration-300", {
										"text-white drop-shadow-2xl": gameStatus !== "crashed",
										"text-red-500": gameStatus === "crashed",
									})}
								>
									{gameStatus === "crashed" ? "Crashed!" : `${currentMultiplier.toFixed(1)}x`}
								</h1>
								<p className="text-xl text-gray-300 mt-2">Current Payout</p>
								{gameStatus === "crashed" && crashPoint && <p className="text-2xl text-red-400">@{crashPoint.toFixed(2)}x</p>}
							</div>
						</div>

						{/* Time indicators */}
						<div className="absolute bottom-4 left-4 right-4">
							<div className="flex justify-between text-sm text-gray-400">
								{['2s', '4s', '6s', '8s', '10s'].map((time) => (
									<span key={time}>{time}</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<BetsList bets={mockBets} />
		</div>
	);
};

export default Crash;
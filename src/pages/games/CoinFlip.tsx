import { useRef, useState } from "react";
import * as THREE from "three";
import BetsList from "../../components/BetsList";
import { GameCanvas } from "../../components/GameCanvas";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { SceneManager } from "../../lib/three/SceneManager";
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

const CoinFlip = () => {
	const [betAmount, setBetAmount] = useState("6.83241");
	const [side, setSide] = useState("heads");
	const [isFlipping, setIsFlipping] = useState(false);
	
	const coinRef = useRef<THREE.Mesh | null>(null);

	const handleSceneInit = (manager: SceneManager) => {
		// A cylinder to represent the coin
		const geometry = new THREE.CylinderGeometry(4, 4, 0.5, 64);
		
		// Materials for side, top (heads), bottom (tails)
		const materials = [
			new THREE.MeshStandardMaterial({ color: 0xffaa00, metalness: 0.9, roughness: 0.1 }), // edge
			new THREE.MeshStandardMaterial({ color: 0xffcc00, metalness: 1, roughness: 0.2 }),   // heads
			new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 1, roughness: 0.2 })    // tails (silver)
		];

		const coin = new THREE.Mesh(geometry, materials);
		
		// Default orientation: Heads facing camera (+Z axis)
		coin.rotation.x = Math.PI / 2;
		manager.scene.add(coin);
		coinRef.current = coin;

		// Add some nice glowing lights focused on the coin
		const frontLight = new THREE.PointLight(0xffddaa, 3, 50);
		frontLight.position.set(0, 5, 10);
		manager.scene.add(frontLight);

		const backLight = new THREE.PointLight(0xaaddff, 2, 50);
		backLight.position.set(0, -5, -10);
		manager.scene.add(backLight);
	};

	const handleFlip = () => {
		if (isFlipping || !coinRef.current) return;
		setIsFlipping(true);
		
		const coin = coinRef.current;
		
		// Target rotation: Heads = PI/2, Tails = -PI/2
		const targetFace = side === "heads" ? Math.PI / 2 : -Math.PI / 2;
		// Add 5 full rotations (10*PI) to create the spinning effect
		const extraSpins = Math.PI * 10; 
		const targetRotation = targetFace + extraSpins;
		
		const startRotation = coin.rotation.x;
		let progress = 0;
		
		const animateFlip = () => {
			progress += 0.015; // adjust speed here
			if (progress < 1) {
				// easeOutQuart
				const ease = 1 - Math.pow(1 - progress, 4);
				coin.rotation.x = startRotation + (targetRotation - startRotation) * ease;
				// Add a bit of Y axis wobble for realism
				coin.rotation.y = Math.sin(progress * Math.PI * 4) * 0.2;
				requestAnimationFrame(animateFlip);
			} else {
				// Done animating, snap to precise target
				coin.rotation.x = targetFace;
				coin.rotation.y = 0;
				// Normalize rotation
				coin.rotation.x = coin.rotation.x % (Math.PI * 2);
				if (coin.rotation.x < 0) coin.rotation.x += Math.PI * 2;
				
				setIsFlipping(false);
			}
		};
		
		requestAnimationFrame(animateFlip);
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
								<button
									className={cn("flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-200", "bg-[#252A36] text-white shadow-sm")} // Always manual for coinflip currently
								>
									Manual
								</button>
								<button
									className={cn("flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-200", "text-gray-500 hover:text-gray-300")}
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
											disabled={isFlipping}
											className="w-full bg-transparent text-white font-medium disabled:opacity-50 outline-none"
										/>
									</div>
									<div className="flex space-x-1 pr-1">
										<button disabled={isFlipping} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">1/2</button>
										<button disabled={isFlipping} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">2x</button>
										<button disabled={isFlipping} className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-md text-xs font-semibold hover:bg-green-500/30 transition-colors disabled:opacity-50">Max</button>
									</div>
								</div>
							</div>

							{/* Side Selection */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-400 mb-2">Side</label>
								<div className="flex items-center space-x-3">
									<button
										className={cn(
											"flex-1 flex flex-col items-center justify-center py-3 rounded-xl font-bold transition-all border",
											side === "heads"
												? "bg-yellow-400/10 border-yellow-400/50 text-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.15)]"
												: "bg-[#252A36] border-transparent text-gray-400 hover:bg-[#2A303C]"
										)}
										onClick={() => setSide("heads")}
										disabled={isFlipping}
									>
										<span className="w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full mb-1 shadow-sm border border-yellow-200"></span>
										Heads
									</button>
									<button
										className={cn(
											"flex-1 flex flex-col items-center justify-center py-3 rounded-xl font-bold transition-all border",
											side === "tails"
												? "bg-gray-400/10 border-gray-400/50 text-gray-300 shadow-[0_0_15px_rgba(156,163,175,0.15)]"
												: "bg-[#252A36] border-transparent text-gray-400 hover:bg-[#2A303C]"
										)}
										onClick={() => setSide("tails")}
										disabled={isFlipping}
									>
										<span className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full mb-1 shadow-sm border border-gray-200"></span>
										Tails
									</button>
								</div>
							</div>

							<button 
								onClick={handleFlip}
								disabled={isFlipping}
								className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#101217] font-black py-4 rounded-xl text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-yellow-400/20 hover:shadow-yellow-400/40 shadow-lg active:scale-[0.98]"
							>
								{isFlipping ? "Flipping..." : "Cashout / Flip"}
							</button>
						</div>

						{/* Divider */}
						<div className="h-px bg-gray-800/50 my-2 flex-none"></div>

						{/* Players List */}
						<div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
							<PlayersList players={mockPlayers} />
						</div>
					</div>

					{/* Right Panel - Coin Flip Visualization */}
					<div className="flex-1 flex flex-col relative">
						{/* Game Area with ThreeJS Canvas */}
						<div className="w-full h-full bg-[#1A1D24] rounded-2xl relative overflow-hidden border border-gray-800/50 shadow-2xl bg-gradient-to-br from-[#1A1D24] to-[#12141A]">
						
						{/* Top Overlay */}
						<div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
							<div className="text-white text-sm font-mono">03498945</div>
							<button className="flex items-center space-x-2 px-4 py-2 bg-black/30 rounded-full text-white text-sm pointer-events-auto hover:bg-black/50 transition">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
								</svg>
								<span>Statistics</span>
							</button>
						</div>

						{/* ThreeJS Container */}
						<div className="flex-1 relative w-full h-full">
							<GameCanvas onSceneInit={handleSceneInit} cameraType="orthographic" className="absolute inset-0 z-0" />
							
							{/* UI Overlay over the canvas */}
							<div className="absolute inset-0 flex items-center justify-between px-24 pointer-events-none z-10">
								{/* Left Panel - Series */}
								<div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 text-center min-w-[120px] shadow-2xl border border-gray-700/50">
									<div className="text-gray-300 text-sm mb-4 uppercase tracking-wider font-semibold">Series</div>
									<div className="text-white text-2xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">x1.98</div>
								</div>

								{/* Right Panel - Multiplier */}
								<div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 text-center min-w-[120px] shadow-2xl border border-gray-700/50">
									<div className="text-gray-300 text-sm mb-4 uppercase tracking-wider font-semibold">Multiplier</div>
									<div className="text-white text-2xl font-bold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">x2.00</div>
								</div>
							</div>
						</div>

						{/* Bottom Section - Last 100 rolls */}
						<div className="absolute bottom-6 left-6 z-10 pointer-events-none">
							<div className="flex items-center space-x-4">
								<span className="text-white/60 text-sm font-medium">Last 100 rolls:</span>
								<div className="flex items-center space-x-2">
									{[
										{ color: 'gold', isGold: true },
										{ color: 'silver', isGold: false },
										{ color: 'silver', isGold: false },
										{ color: 'gold', isGold: true },
										{ color: 'silver', isGold: false }
									].map((coin, index) => (
										<div
											key={index}
											className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${coin.isGold
													? 'bg-gradient-to-br from-yellow-400 to-yellow-600 border border-yellow-300'
													: 'bg-gradient-to-br from-gray-300 to-gray-500 border border-gray-200'
												}`}
										></div>
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

export default CoinFlip;
import { ChevronDown } from "lucide-react";

interface Bet {
	id: number;
	game: string;
	username: string;
	avatar: string;
	bet: string;
	multiplier: string;
	payout: string;
}

interface BetsListProps {
	bets: Bet[];
}

const BetsList: React.FC<BetsListProps> = ({ bets }) => {
	return (
		<div className="bg-[#1A1D24] p-5 sm:p-6 rounded-2xl border border-gray-800/50 shadow-xl overflow-hidden">
			{/* Header Section */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl sm:text-2xl font-bold text-white">Bets</h2>
				<button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm font-medium px-4 py-2 bg-[#252A36] rounded-lg">
					<span>All Bets</span>
					<ChevronDown className="w-4 h-4" />
				</button>
			</div>

			<div className="overflow-x-auto custom-scrollbar">
				<div className="min-w-[800px]">
					{/* Column Headers */}
					<div className="grid grid-cols-5 gap-4 mb-3 text-gray-500 text-sm font-semibold uppercase tracking-wider px-4">
						<div className="col-span-1">Game</div>
						<div className="col-span-1">Username</div>
						<div className="col-span-1">Bet</div>
						<div className="col-span-1 text-right sm:text-left">Multiplier</div>
						<div className="col-span-1 text-right sm:text-left">Payout</div>
					</div>

					{/* Bet Entries */}
					<div className="space-y-2 relative">
						{/* Subtle gradient line before list */}
						<div className="absolute -top-1 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-gray-700/50 to-transparent flex-none z-10 pointer-events-none"></div>
						
						{bets.map((bet) => (
							<div
								key={bet.id}
								className="group grid grid-cols-5 gap-4 items-center bg-[#101217]/50 hover:bg-[#252A36] rounded-xl p-3 px-4 transition-colors duration-200 border border-transparent hover:border-gray-700/50"
							>
								{/* Game Column */}
								<div className="col-span-1 flex items-center space-x-3">
									<div className="w-8 h-8 bg-black/40 rounded-lg flex items-center justify-center border border-gray-800 shadow-sm group-hover:border-gray-600 transition-colors">
										{/* Abstract icon based on game name */}
										{bet.game === "Crash" && <span className="text-blue-400 text-lg group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">🚀</span>}
										{bet.game === "Coin Flip" && <span className="text-yellow-400 text-lg group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]">🪙</span>}
										{bet.game === "Plinko" && <span className="text-purple-400 text-lg group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]">🔻</span>}
										{bet.game === "Mines" && <span className="text-red-400 text-lg group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]">💣</span>}
										{bet.game === "Roulette" && <span className="text-green-400 text-lg group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]">🎡</span>}
										{bet.game === "Dice" && <span className="text-indigo-400 text-lg group-hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]">🎲</span>}
									</div>
									<span className="text-gray-300 font-medium whitespace-nowrap group-hover:text-white transition-colors">{bet.game}</span>
								</div>

								{/* Username Column */}
								<div className="col-span-1 flex items-center space-x-3">
									<div className="w-8 h-8 rounded-full overflow-hidden shadow-sm border border-gray-700">
										{bet.username === "Kevin" && (
											<div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
												<span className="text-xs text-white/50 relative overflow-hidden flex items-center justify-center w-full h-full">🤖</span>
											</div>
										)}
										{bet.username === "badalasong" && (
											<div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
												<span className="text-xs text-white/50 relative overflow-hidden flex items-center justify-center w-full h-full">👾</span>
											</div>
										)}
										{bet.username === "haargpooolnt" && (
											<div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mt-[-2px]">
												<span className="text-xs text-white/50 relative overflow-hidden flex items-center justify-center w-full h-full">👽</span>
											</div>
										)}
										{!["Kevin", "badalasong", "haargpooolnt"].includes(bet.username) && (
											<div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-xs text-white opacity-80">
												{bet.avatar}
											</div>
										)}
									</div>
									<span className="text-gray-300 font-medium truncate group-hover:text-white transition-colors">{bet.username}</span>
								</div>

								{/* Bet Column */}
								<div className="col-span-1 flex items-center space-x-2">
									<div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center shrink-0">
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
									</div>
									<span className="text-gray-300 font-mono text-sm tracking-tight group-hover:text-white transition-colors">{bet.bet}</span>
								</div>

								{/* Multiplier Column */}
								<div className="col-span-1 text-gray-400 font-medium text-right sm:text-left group-hover:text-gray-200 transition-colors">
									{bet.multiplier}
								</div>

								{/* Payout Column */}
								<div className="col-span-1 flex items-center justify-end sm:justify-start space-x-2 text-right sm:text-left">
									<div className="hidden sm:flex w-5 h-5 bg-blue-500/20 rounded-full items-center justify-center shrink-0">
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
									</div>
									<span className="text-green-500 font-mono font-medium tracking-tight group-hover:text-green-400 transition-colors drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">{bet.payout}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BetsList;

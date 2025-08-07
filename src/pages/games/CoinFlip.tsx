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
        <div className="flex-1 bg-gradient-to-br from-purple-900 to-neutral-900 relative overflow-hidden">
		<img src="../../../public/game.png" alt="" />
        </div>
      </div>

      <BetsList bets={mockBets} />
    </div>
  );
};

export default CoinFlip;
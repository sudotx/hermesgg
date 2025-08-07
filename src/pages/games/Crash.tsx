
import GameNavbar from "../../components/GameNavbar";
import BetsList from "../../components/BetsList";
import PlayersList from "../../components/PlayersList";

import { useEffect, useState } from "react";

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
  const [currentMultiplier, setCurrentMultiplier] = useState(2.8);
  const [betAmount, setBetAmount] = useState("6.83241");
  const [autoCashout, setAutoCashout] = useState("6.83241");
  const [isGameActive, setIsGameActive] = useState(true);

  console.log(currentMultiplier)

  // Simulate multiplier animation
  useEffect(() => {
    if (isGameActive) {
      const interval = setInterval(() => {
        setCurrentMultiplier(prev => prev + 0.1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isGameActive]);

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
                <button className="px-3 py-2 bg-neutral-700 rounded text-sm">1/2</button>
                <button className="px-3 py-2 bg-neutral-700 rounded text-sm">2x</button>
                <button className="px-3 py-2 bg-green-600 rounded text-sm">Max</button>
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
                    className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded text-white"
                  />
                </div>
                <button className="px-3 py-2 bg-neutral-700 rounded text-sm">2.00x</button>
                <button className="px-3 py-2 bg-neutral-700 rounded text-sm">10.00x</button>
              </div>
            </div>

            <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-full text-lg" onClick={()=>{setIsGameActive(true)}}>
              Place Bet
            </button>
          </div>

          <PlayersList players={mockPlayers} />
        </div>

        {/* Right Panel - Game Visualization */}
        <div className="flex-1 bg-gradient-to-br relative overflow-hidden w-[910px]">
          <img src="../../../public/game.png" alt=""/>
        </div>
      </div>

      <BetsList bets={mockBets} />
    </div>
  );
};

export default Crash;
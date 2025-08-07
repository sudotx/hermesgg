
import { useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils";

// Mock data for players
const mockPlayers = [
  { id: 1, username: "haargpooolnt", avatar: "��", multiplier: "2.2x", bet: "6.83241" },
  { id: 2, username: "Kevin", avatar: "��", multiplier: "1.8x", bet: "4.12345" },
  { id: 3, username: "badalasong", avatar: "��", multiplier: "3.1x", bet: "2.98765" },
  { id: 4, username: "player4", avatar: "��", multiplier: "1.5x", bet: "1.23456" },
  { id: 5, username: "player5", avatar: "��", multiplier: "2.8x", bet: "3.45678" },
];

// Mock data for bets history
const mockBets = [
  { id: 1, game: "Roulette", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "9.1151432" },
  { id: 2, game: "Roulette", username: "badalasong", avatar: "👤", bet: "0.5432109", multiplier: "2.1x", payout: "1.1407429" },
  { id: 3, game: "Roulette", username: "haargpooolnt", avatar: "👤", bet: "2.1234567", multiplier: "1.5x", payout: "3.1851851" },
  { id: 4, game: "Roulette", username: "player4", avatar: "👤", bet: "0.9876543", multiplier: "3.2x", payout: "3.1604938" },
];

// Mock game numbers with colors
// const gameNumbers = [
//   { number: 4, color: "green" },
//   { number: 0, color: "green" },
//   { number: 1, color: "black" },
//   { number: 10, color: "yellow" },
//   { number: 8, color: "green" },
//   { number: 5, color: "green" },
//   { number: 0, color: "yellow" },
//   { number: 1, color: "green" },
// ];

const Roulette = () => {
  const [betAmount, setBetAmount] = useState("6.83241");
  const [selectedMultiplier, setSelectedMultiplier] = useState("green");

//   const getColorClasses = (color: string) => {
//     switch (color) {
//       case "green":
//         return "bg-green-500 text-white";
//       case "yellow":
//         return "bg-yellow-500 text-black";
//       case "black":
//         return "bg-black text-white";
//       default:
//         return "bg-gray-500 text-white";
//     }
//   };

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

            {/* Multiplier Selection */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Multiplier</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium",
                    selectedMultiplier === "green" ? "bg-green-600 text-white" : "bg-neutral-700 text-gray-300"
                  )}
                  onClick={() => setSelectedMultiplier("green")}
                >
                  Green x14
                </button>
                <button 
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium",
                    selectedMultiplier === "yellow" ? "bg-yellow-600 text-black" : "bg-neutral-700 text-gray-300"
                  )}
                  onClick={() => setSelectedMultiplier("yellow")}
                >
                  Yellow x10
                </button>
                <button 
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium",
                    selectedMultiplier === "black" ? "bg-black text-white" : "bg-neutral-700 text-gray-300"
                  )}
                  onClick={() => setSelectedMultiplier("black")}
                >
                  Black x2
                </button>
              </div>
            </div>

            <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-full text-lg">
              Place Bet
            </button>
          </div>

          <PlayersList players={mockPlayers} />
        </div>

        {/* Right Panel - Game Visualization */}
        <div className="flex-1 bg-gradient-to-br relative overflow-hidden">
          <img src="../../../public/game.png" alt="" />
        </div>
   
      </div>

      <BetsList bets={mockBets} />
    </div>
  );
};

export default Roulette;
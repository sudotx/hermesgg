import { useState } from "react";
import BetsList from "../../components/BetsList";
import GameNavbar from "../../components/GameNavbar";
import PlayersList from "../../components/PlayersList";
import { cn } from "../../utils";

// Mock data for players
const mockPlayers = [
  { id: 1, username: "haargpooolnt", avatar: "", multiplier: "2.2x", bet: "6.83241" },
  { id: 2, username: "Kevin", avatar: "", multiplier: "1.8x", bet: "4.12345" },
  { id: 3, username: "badalasong", avatar: "", multiplier: "3.1x", bet: "2.98765" },
];

// Mock data for bets history
const mockBets = [
  { id: 1, game: "Plinko", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
  { id: 2, game: "Plinko", username: "badalasong", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
  { id: 3, game: "Plinko", username: "haargpooolnt", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
];

// Mock multiplier results
// const multiplierResults = [
//   { value: "2.2x", color: "green" },
//   { value: "2.2x", color: "green" },
//   { value: "2.8x", color: "blue" },
//   { value: "2.8x", color: "blue" },
//   { value: "2.8x", color: "yellow" },
//   { value: "2.8x", color: "yellow" },
//   { value: "1.8x", color: "purple" },
//   { value: "1.8x", color: "purple" },
// ];

const Plinko = () => {
  const [betAmount, setBetAmount] = useState("6.83241");
  const [difficulty, setDifficulty] = useState("easy");
  const [rows, setRows] = useState(2);

//   const getColorClasses = (color: string) => {
//     switch (color) {
//       case "green":
//         return "bg-green-500 text-white";
//       case "blue":
//         return "bg-blue-500 text-white";
//       case "yellow":
//         return "bg-yellow-500 text-black";
//       case "purple":
//         return "bg-purple-500 text-white";
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

            {/* Difficulty */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium",
                    difficulty === "easy" ? "bg-green-600 text-white" : "bg-neutral-700 text-gray-300"
                  )}
                  onClick={() => setDifficulty("easy")}
                >
                  Easy
                </button>
                <button 
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium",
                    difficulty === "medium" ? "bg-yellow-600 text-black" : "bg-neutral-700 text-gray-300"
                  )}
                  onClick={() => setDifficulty("medium")}
                >
                  Medium
                </button>
                <button 
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium",
                    difficulty === "hard" ? "bg-red-600 text-white" : "bg-neutral-700 text-gray-300"
                  )}
                  onClick={() => setDifficulty("hard")}
                >
                  Hard
                </button>
              </div>
            </div>

            {/* Amount of Rows */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Amount of rows</label>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-neutral-600 rounded flex items-center justify-center">
                  <div className="w-4 h-1 bg-white rounded"></div>
                </div>
                <div className="flex space-x-1">
                  {[2, 8, 10, 12, 14, 16, 18].map((row) => (
                    <button
                      key={row}
                      className={cn(
                        "px-2 py-1 rounded text-xs",
                        rows === row ? "bg-blue-600 text-white" : "bg-neutral-700 text-gray-300"
                      )}
                      onClick={() => setRows(row)}
                    >
                      {row}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-full text-lg">
              Place Bet
            </button>
          </div>

          <PlayersList players={mockPlayers} />
        </div>

        {/* Right Panel - Plinko Game Visualization */}
        <div className="flex-1 bg-gradient-to-br relative overflow-hidden">
          <img src="../../../public/game.png" alt="" />
        </div>
      </div>

      <BetsList bets={mockBets} />
    </div>
  );
};

export default Plinko;
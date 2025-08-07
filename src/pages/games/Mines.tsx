import GameNavbar from "../../components/GameNavbar";
import BetsList from "../../components/BetsList";
import PlayersList from "../../components/PlayersList";
import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { cn } from "../../utils";

// Mock data for players
const mockPlayers = [
  { id: 1, username: "haargpooolnt", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
  { id: 2, username: "Kevin", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
  { id: 3, username: "badalasong", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
];

// Mock data for bets history
const mockBets = [
  { id: 1, game: "Mines", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
  { id: 2, game: "Mines", username: "badalasong", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
  { id: 3, game: "Mines", username: "haargpooolnt", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
];

// Mock grid for mines game
const grid = [
  ["?", "?", "?", "💣", "?"],
  ["💎", "?", "?", "💣", "?"],
  ["?", "?", "💎", "?", "?"],
  ["?", "💣", "?", "?", "?"],
  ["?", "?", "💎", "?", "?"],
];

// Mock multipliers
const multipliers = [
  { value: "x1.1", label: "1 Hit 1", color: "green" },
  { value: "x1.25", label: "1 Hit 2", color: "gray" },
  { value: "x1.4", label: "1 Hit 3", color: "gray" },
  { value: "x1.45", label: "1 Hit 4", color: "gray" },
  { value: "x1.62", label: "1 Hit 5", color: "gray" },
];

const Mines = () => {
  const [betAmount, setBetAmount] = useState("6.83241");
  const [rows, setRows] = useState(2);

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

            {/* Amount of Rows */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Amount of rows</label>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold">🍀</span>
                </div>
                {[2, 1, 5, 10].map((row) => (
                  <button
                    key={row}
                    className={cn(
                      "w-8 h-8 bg-neutral-700 rounded text-sm font-medium",
                      rows === row ? "bg-green-600 text-white" : "text-gray-300"
                    )}
                    onClick={() => setRows(row)}
                  >
                    {row}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-full text-lg">
              Place Bet
            </button>
          </div>

          <PlayersList players={mockPlayers} />
        </div>

        {/* Right Panel - Mines Game Visualization */}
        <div className="flex-1 bg-gradient-to-br from-purple-900 to-neutral-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-500 rounded-full opacity-10 blur-xl"></div>
            <div className="absolute left-1/4 bottom-10 w-40 h-40 bg-purple-400 rounded-full opacity-10 blur-2xl"></div>
          </div>

          {/* Top Game Info */}
          <div className="absolute top-4 left-4">
            <span className="text-sm text-gray-300">03498945</span>
          </div>

          {/* Statistics Button */}
          <div className="absolute top-4 right-4">
            <button className="flex items-center space-x-2 bg-neutral-800 px-3 py-2 rounded text-sm">
              <BarChart3 className="w-4 h-4" />
              <span>Statistics</span>
            </button>
          </div>

          {/* Mines Grid */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center">
              {/* Grid */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {grid.flat().map((cell, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg",
                      cell === "?" && "bg-neutral-800 text-green-400",
                      cell === "💎" && "bg-purple-500 text-white",
                      cell === "💣" && "bg-red-500 text-white relative"
                    )}
                  >
                    {cell === "?" && "?"}
                    {cell === "💎" && <span className="animate-pulse">◆</span>}
                    {cell === "💣" && (
                      <>
                        <span>💣</span>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-80 animate-ping"></span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {/* Multipliers */}
              <div className="flex space-x-2 mt-2">
                {multipliers.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "px-3 py-1 rounded text-xs font-bold",
                      m.color === "green" ? "bg-green-400 text-black" : "bg-neutral-800 text-white"
                    )}
                  >
                    {m.value}
                    <span className="ml-1 text-gray-300 font-normal">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Left/Right Gem/Bomb Counters */}
            <div className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
              <span className="text-purple-400 text-3xl">◆</span>
              <span className="text-white text-xl font-bold">02</span>
            </div>
            <div className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
              <span className="text-red-400 text-3xl">💣</span>
              <span className="text-white text-xl font-bold">03</span>
            </div>
          </div>
        </div>
      </div>

      <BetsList bets={mockBets} />
    </div>
  );
};

export default Mines;
import { useEffect, useState } from "react";
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
  { id: 1, game: "Dice", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
  { id: 2, game: "Dice", username: "badalasong", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
  { id: 3, game: "Dice", username: "haargpooolnt", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
];

// Mock last 100 rolls
// const lastRolls = [
//   { value: 1, dots: [1] },
//   { value: 4, dots: [1, 2, 3, 4] },
//   { value: 6, dots: [1, 2, 3, 4, 5, 6] },
//   { value: 2, dots: [1, 2] },
//   { value: 5, dots: [1, 2, 3, 4, 5] },
//   { value: 3, dots: [1, 2, 3] },
//   { value: 1, dots: [1] },
//   { value: 6, dots: [1, 2, 3, 4, 5, 6] },
//   { value: 4, dots: [1, 2, 3, 4] },
//   { value: 2, dots: [1, 2] },
// ];

const Dice = () => {
  const [betAmount, setBetAmount] = useState("6.83241");
  const [selectedDice, setSelectedDice] = useState(4);
  const [timeLeft, setTimeLeft] = useState(9);

  console.log(timeLeft)

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 9));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderDiceFace = (value: number) => {
    const dots = [];
    for (let i = 1; i <= value; i++) {
      dots.push(<div key={i} className="w-1 h-1 bg-black rounded-full"></div>);
    }
    return dots;
  };

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

            {/* Amount of Rows (Dice Selection) */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Amount of rows</label>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((dice) => (
                  <button
                    key={dice}
                    className={cn(
                      "w-8 h-8 bg-white rounded flex items-center justify-center p-1",
                      selectedDice === dice ? "ring-2 ring-green-500" : ""
                    )}
                    onClick={() => setSelectedDice(dice)}
                  >
                    <div className="grid grid-cols-3 gap-0.5">
                      {renderDiceFace(dice)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded text-lg">
              Play
            </button>
          </div>

          <PlayersList players={mockPlayers} />
        </div>

        {/* Right Panel - Dice Game Visualization */}
        <div className="flex-1 bg-gradient-to-br relative overflow-hidden">
		<img src="../../../public/game.png" alt="" />
        </div>
      </div>

      <BetsList bets={mockBets} />
    </div>
  );
};

export default Dice;
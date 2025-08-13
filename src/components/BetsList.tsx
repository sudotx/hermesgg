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
    <div className="bg-gradient-to-b from-gray-900 to-black p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Bets</h2>
        <div className="flex items-center space-x-2 text-white text-sm cursor-pointer">
          <span>All Bets</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-5 gap-4 mb-4 text-gray-400 text-sm font-medium">
        <div>Game</div>
        <div>Username</div>
        <div>Bet</div>
        <div>Multiplier</div>
        <div>Payout</div>
      </div>

      {/* Bet Entries */}
      <div className="space-y-3">
        {bets.map((bet) => (
          <div 
            key={bet.id} 
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-700/30"
          >
            <div className="grid grid-cols-5 gap-4 items-center">
              {/* Game Column */}
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                  {/* Dice icon - 2x2 grid of dots */}
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-white font-medium">{bet.game}</span>
              </div>

              {/* Username Column */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  {/* Robot avatar - different styles for each user */}
                  {bet.username === "Kevin" && (
                    <div className="w-full h-full bg-purple-500 flex items-center justify-center">
                      <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
                    </div>
                  )}
                  {bet.username === "badalasong" && (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                  {bet.username === "haargpooolnt" && (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    </div>
                  )}
                  {!["Kevin", "badalasong", "haargpooolnt"].includes(bet.username) && (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center text-xs text-white">
                      {bet.avatar}
                    </div>
                  )}
                </div>
                <span className="text-white font-medium">{bet.username}</span>
              </div>

              {/* Bet Column */}
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-yellow-900 text-xs font-bold">W</span>
                </div>
                <span className="text-white">{bet.bet}</span>
              </div>

              {/* Multiplier Column */}
              <div className="text-white">
                {bet.multiplier}
              </div>

              {/* Payout Column */}
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-yellow-900 text-xs font-bold">W</span>
                </div>
                <span className="text-green-400 font-medium">{bet.payout}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetsList;

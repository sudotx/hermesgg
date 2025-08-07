import { ChevronDown, TrendingUp } from "lucide-react";

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
    <div className="bg-neutral-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Bets</h2>
        <div className="flex items-center space-x-2 text-gray-400">
          <span>All Bets</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-neutral-700">
              <th className="pb-2">Game</th>
              <th className="pb-2">Username</th>
              <th className="pb-2">Bet</th>
              <th className="pb-2">Multiplier</th>
              <th className="pb-2">Payout</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet) => (
              <tr key={bet.id} className="border-b border-neutral-700">
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm">{bet.game}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-neutral-600 rounded-full flex items-center justify-center text-xs">
                      {bet.avatar}
                    </div>
                    <span className="text-sm">{bet.username}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{bet.bet}</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="text-sm">{bet.multiplier}</span>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{bet.payout}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BetsList;

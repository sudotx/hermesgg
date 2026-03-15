
import React from "react";
import { cn } from "../utils/cn";

interface Player {
  id: number;
  username: string;
  avatar: string;
  multiplier: string;
  bet: string;
}

interface PlayersListProps {
  players: Player[];
}

const PlayersList: React.FC<PlayersListProps> = ({ players }) => {
  return (
    <div className="flex-1 mt-6">
      <div className="flex justify-between items-end mb-4 px-1">
        <h3 className="text-lg font-bold text-white tracking-tight">{players.length} players</h3>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Live</span>
      </div>
      
      <div className="space-y-1">
        {players.map((player) => (
          <div
            key={player.id}
            className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-[#252A36]/60 transition-colors border border-transparent hover:border-gray-800/50"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-xs overflow-hidden border border-gray-800 shadow-sm relative group-hover:border-gray-600 transition-colors">
                {/* Random avatar bg colors for variety since it's mock data */}
                <div className={cn(
                  "absolute inset-0 opacity-20",
                  player.id % 3 === 0 ? "bg-purple-500" : player.id % 2 === 0 ? "bg-blue-500" : "bg-red-500"
                )}></div>
                <span className="opacity-80 drop-shadow-md z-10">{player.avatar || "👤"}</span>
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{player.username}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-400 group-hover:text-gray-300 transition-colors">{player.multiplier}</span>
              <div className="flex items-center space-x-1.5 min-w-[70px] justify-end">
                <div className="w-4 h-4 bg-blue-500/20 rounded-full flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                </div>
                <span className="text-sm font-mono font-medium text-white tracking-tight">{player.bet}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersList;

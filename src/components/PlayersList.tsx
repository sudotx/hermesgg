
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
    <div className="flex-1">
      <h3 className="text-lg font-medium mb-4">{players.length} players</h3>
      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-2 bg-neutral-700 rounded"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-neutral-600 rounded-full flex items-center justify-center text-xs">
                {player.avatar}
              </div>
              <span className="text-sm">{player.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{player.multiplier}</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs">{player.bet}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersList;

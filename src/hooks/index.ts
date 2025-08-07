import { useQuery } from "@tanstack/react-query";
import { getGameData } from "../config";

export const useGameData = (gameId: string) => {
  return useQuery({
    queryKey: ["gameData", gameId],
    queryFn: () => getGameData(gameId),
  });
};

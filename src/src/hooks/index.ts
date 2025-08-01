import { useQuery } from "@tanstack/react-query";
import { getGameData } from "../api";

export const useGameData = (gameId: string) => {
  return useQuery({
    queryKey: ["gameData", gameId],
    queryFn: () => getGameData(gameId),
  });
};

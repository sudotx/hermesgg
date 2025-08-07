import { create } from 'zustand';

interface GameStore {
  gameId: string | null;
  setGameId: (gameId: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameId: null,
  setGameId: (gameId) => set({ gameId }),
}));

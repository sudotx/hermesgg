import { ethers } from "ethers";

export const getGameData = async (gameId: string) => {
  try {
    const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_PROJECT_ID");
    // Example: Fetching block number
    const blockNumber = await provider.getBlockNumber();
    return { gameId, blockNumber };
  } catch (error) {
    console.error("Error fetching game data:", error);
    return null;
  }
};

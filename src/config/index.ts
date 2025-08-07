import { ethers } from "ethers";

export const config = {
    appName: "Hermes Games",
    projectId: "8X1df9Wbcqj6A7LWG71Ra5yLYj-1eL7y",
    chains: ["sepolia"],
};

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

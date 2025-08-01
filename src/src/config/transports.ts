import { http } from "viem";
import { sepolia } from "wagmi/chains";

export const transports = {
    [sepolia.id]: http(),
};

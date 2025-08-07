import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { chains } from "./chains";
import { transports } from "./transports";
import { config as appConfig } from ".";

export const wagmiConfig = getDefaultConfig({
    appName: appConfig.appName,
    projectId: appConfig.projectId,
    chains: [chains],
    transports: transports,
});

import './App.css';

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { http, WagmiProvider } from "wagmi";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from 'viem/chains';
import { AppLayout } from './components';
import { config as appConfig } from './config';
import { queryClient } from "./config/queryClient";
import { CoinFlip, Crash, Dice, Home, Mines, NotFound, Plinko, Roulette } from './pages';

const wagmiConfig = getDefaultConfig({
  appName: appConfig.appName,
  projectId: appConfig.projectId,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

function App() {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/app" element={<AppLayout />}>
                  <Route path="coin-flip" element={<CoinFlip />} />
                  <Route path="crash" element={<Crash />} />
                  <Route path="mines" element={<Mines />} />
                  <Route path="plinko" element={<Plinko />} />
                  <Route path="roulette" element={<Roulette />} />
                  <Route path="dice" element={<Dice />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>

    </>
  )
}

export default App

import './App.css';

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "./src/config/wagmi";
import { queryClient } from "./src/config/queryClient";
import { Home, NotFound, CoinFlip, Crash, Mines, Plinko, Roulette, Dice } from './src/pages';

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
                <Route path="/game/coinflip" element={<CoinFlip />} />
                <Route path="/game/crash" element={<Crash />} />
                <Route path="/game/mines" element={<Mines />} />
                <Route path="/game/plinko" element={<Plinko />} />
                <Route path="/game/roulette" element={<Roulette />} />
                <Route path="/game/dice" element={<Dice />} />
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

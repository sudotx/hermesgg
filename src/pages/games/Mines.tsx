import GameNavbar from "../../components/GameNavbar";
import BetsList from "../../components/BetsList";
import PlayersList from "../../components/PlayersList";
import { useRef, useState } from "react";
import { BarChart3 } from "lucide-react";
import { cn } from "../../utils";
import { GameCanvas } from "../../components/GameCanvas";
import { SceneManager } from "../../lib/three/SceneManager";
import { MinesGame as MinesThreeGame } from "../../lib/three/games/MinesGame";
import * as THREE from 'three';

// Mock data for players
const mockPlayers = [
  { id: 1, username: "haargpooolnt", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
  { id: 2, username: "Kevin", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
  { id: 3, username: "badalasong", avatar: "👤", multiplier: "2.2x", bet: "6.83241" },
];

const mockBets = [
  { id: 1, game: "Mines", username: "Kevin", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
  { id: 2, game: "Mines", username: "badalasong", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
  { id: 3, game: "Mines", username: "haargpooolnt", avatar: "👤", bet: "1.0851361", multiplier: "8.4x", payout: "1.0851361" },
];

const multipliersOptions = [
  { value: "x1.1", label: "1 Hit 1", color: "green" },
  { value: "x1.25", label: "1 Hit 2", color: "gray" },
  { value: "x1.4", label: "1 Hit 3", color: "gray" },
  { value: "x1.45", label: "1 Hit 4", color: "gray" },
  { value: "x1.62", label: "1 Hit 5", color: "gray" },
];

const Mines = () => {
  const [betAmount, setBetAmount] = useState("10.00");
  const [minesCount, setMinesCount] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [revealedCount, setRevealedCount] = useState(0);

  const gameRef = useRef<MinesThreeGame | null>(null);
  
  // Game state (server mock)
  const minePositionsRef = useRef<number[]>([]);
  const isRevealedRef = useRef<boolean[]>(new Array(25).fill(false));

  const handleSceneInit = (manager: SceneManager) => {
      // Position camera nicely to view the 5x5 board
      if (manager.camera instanceof THREE.PerspectiveCamera) {
          manager.camera.position.set(0, 10, 14);
          manager.camera.lookAt(0, 0, 0);
          manager.camera.updateProjectionMatrix();
      }

      const game = new MinesThreeGame(manager);
      gameRef.current = game;

      game.setOnClick((idx) => {
          handleTileClick(idx);
      });
  };

  const handleTileClick = (idx: number) => {
      // Must use ref or state carefully inside callbacks 
      // Note: This callback is bound to ThreeJS, so it's easier to use a ref to check isPlaying
      if (!minePositionsRef.current) return;
      if (isRevealedRef.current[idx]) return;
      
      const isMine = minePositionsRef.current.includes(idx);
      gameRef.current?.revealTile(idx, isMine);
      
      isRevealedRef.current[idx] = true;

      if (isMine) {
          // Boom! Game Over
          handleLoss();
      } else {
          // Safe
          setMultiplier(prev => prev * 1.25); // Just a mock math
          setRevealedCount(prev => prev + 1);
      }
  };

  // Called when user hits a mine
  const handleLoss = () => {
      setIsPlaying(false);
      // Reveal all remaining
      setTimeout(() => {
          for(let i=0; i<25; i++) {
              if (!isRevealedRef.current[i]) {
                  gameRef.current?.revealTile(i, minePositionsRef.current.includes(i));
                  isRevealedRef.current[i] = true;
              }
          }
      }, 500);
  };

  const handlePlaceBet = () => {
      setIsPlaying(true);
      setMultiplier(1.0);
      setRevealedCount(0);
      gameRef.current?.resetBoard();

      isRevealedRef.current = new Array(25).fill(false);

      // Randomize mines
      const newMines: number[] = [];
      while(newMines.length < minesCount) {
          const r = Math.floor(Math.random() * 25);
          if (!newMines.includes(r)) newMines.push(r);
      }
      minePositionsRef.current = newMines;
  };

  const handleCashout = () => {
      setIsPlaying(false);
      // Optionally reveal remaining tiles on confident win
      setTimeout(() => {
          for(let i=0; i<25; i++) {
              if (!isRevealedRef.current[i]) {
                  gameRef.current?.revealTile(i, minePositionsRef.current.includes(i));
                  isRevealedRef.current[i] = true;
              }
          }
      }, 500);
  };

  return (
      <div className="flex flex-col min-h-screen bg-[#0F1115] text-white">
          <GameNavbar />

          {/* Main Content Area */}
          <div className="w-full max-w-[1500px] mx-auto p-4 md:p-6 flex flex-col gap-6 flex-1">
              {/* Top Section: Controls (Left) & Canvas (Right) */}
              <div className="flex flex-col lg:flex-row gap-6 min-h-[500px] lg:h-[600px]">
                  {/* Left Panel - Betting Controls & Player List */}
                  <div className="w-full lg:w-[360px] bg-[#1A1D24] p-5 flex flex-col rounded-2xl border border-gray-800/50 shadow-xl overflow-y-auto custom-scrollbar">
                      {/* Betting Controls */}
                      <div className="flex-none mb-6">
                          {/* Manual/Auto Tabs */}
                          <div className="flex p-1 bg-[#101217] rounded-lg mb-6">
                              <button className="flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 bg-[#252A36] text-white shadow-sm">
                                  Manual
                              </button>
                              <button className="flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 text-gray-500 hover:text-gray-300">
                                  Auto
                              </button>
                          </div>

                          {/* Bet Amount Input */}
                          <div className="mb-4">
                              <div className="flex justify-between items-center mb-2">
                                  <label className="text-sm font-medium text-gray-400">Bet amount</label>
                              </div>
                              <div className="flex items-center space-x-2 bg-[#252A36] rounded-lg p-1.5 border border-gray-700/50 focus-within:border-gray-500 transition-colors">
                                  <div className="flex-1 relative flex items-center pl-3">
                                      <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center mr-2">
                                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                      </div>
                                      <input
                                          type="text"
                                          value={betAmount}
                                          onChange={(e) => setBetAmount(e.target.value)}
                                          disabled={isPlaying}
                                          className="w-full bg-transparent text-white font-medium disabled:opacity-50 outline-none"
                                      />
                                  </div>
                                  <div className="flex space-x-1 pr-1">
                                      <button disabled={isPlaying} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">1/2</button>
                                      <button disabled={isPlaying} className="px-3 py-1.5 bg-[#1A1D24] rounded-md text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#323945] transition-colors disabled:opacity-50">2x</button>
                                      <button disabled={isPlaying} className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-md text-xs font-semibold hover:bg-green-500/30 transition-colors disabled:opacity-50">Max</button>
                                  </div>
                              </div>
                          </div>

                          {/* Amount of Mines */}
                          <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-400 mb-2">Mines</label>
                              <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                                  <div className="w-10 h-10 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center shadow-lg">
                                      <span className="text-lg">💣</span>
                                  </div>
                                  {[1, 3, 5, 10].map((count) => (
                                      <button
                                          key={count}
                                          disabled={isPlaying}
                                          className={cn(
                                              "flex-1 h-10 rounded-xl text-sm font-bold transition-all border disabled:opacity-50",
                                              minesCount === count
                                                  ? "bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                                                  : "bg-[#252A36] border-transparent text-gray-400 hover:bg-[#2A303C]"
                                          )}
                                          onClick={() => setMinesCount(count)}
                                      >
                                          {count}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          {isPlaying ? (
                              <button
                                  onClick={handleCashout}
                                  className="w-full bg-green-500 hover:bg-green-400 text-[#101217] font-black py-4 rounded-xl text-lg transition-all shadow-green-500/20 hover:shadow-green-500/40 shadow-lg active:scale-[0.98]"
                              >
                                  Cashout {(parseFloat(betAmount) * multiplier).toFixed(2)}
                              </button>
                          ) : (
                              <button
                                  onClick={handlePlaceBet}
                                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#101217] font-black py-4 rounded-xl text-lg transition-all shadow-yellow-400/20 hover:shadow-yellow-400/40 shadow-lg active:scale-[0.98]"
                              >
                                  Place Bet
                              </button>
                          )}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gray-800/50 my-2 flex-none"></div>

                      {/* Players List */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
                          <PlayersList players={mockPlayers} />
                      </div>
                  </div>

                  {/* Right Panel - Mines Game Visualization */}
                  <div className="flex-1 flex flex-col relative">
                      <div className="w-full h-full bg-[#1A1D24] rounded-2xl relative overflow-hidden border border-gray-800/50 shadow-2xl bg-gradient-to-br from-[#1A1D24] to-[#12141A]">

                          {/* Top Game Info overlays */}
                          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
                              <span className="text-sm font-mono text-gray-400">03498945</span>
                              <button className="flex items-center space-x-2 bg-black/40 px-4 py-2 rounded-md text-sm pointer-events-auto hover:bg-black/60 transition">
                                  <BarChart3 className="w-4 h-4" />
                                  <span>Statistics</span>
                              </button>
                          </div>

                          {/* ThreeJS Container */}
                          <GameCanvas onSceneInit={handleSceneInit} cameraType="perspective" className="absolute inset-0 cursor-pointer" />

                          {/* Bottom Multipliers Overlay */}
                          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 pointer-events-none">
                              {multipliersOptions.map((m, i) => (
                                  <div
                                      key={i}
                                      className={cn(
                                          "px-4 py-2 rounded-md text-xs font-bold border border-white/10 shadow-lg",
                                          m.color === "green" ? "bg-green-500/90 text-black" : "bg-black/50 text-white backdrop-blur-md"
                                      )}
                                  >
                                      <span className="text-sm">{m.value}</span>
                                      <span className="ml-2 text-white/50 font-normal">{m.label}</span>
                                  </div>
                              ))}
                          </div>

                          {/* Counters Overlay - Left / Right */}
                          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center bg-black/30 p-4 rounded-xl border border-white/10 backdrop-blur-sm pointer-events-none">
                              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/20 mb-2">
                                  <span className="text-white text-2xl font-bold">◆</span>
                              </div>
                              <span className="text-white text-xl font-bold">{revealedCount.toString().padStart(2, '0')}</span>
                              <span className="text-gray-400 text-xs">Hits</span>
                          </div>

                          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center bg-black/30 p-4 rounded-xl border border-white/10 backdrop-blur-sm pointer-events-none">
                              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/20 mb-2">
                                  <span className="text-white text-2xl font-bold">💣</span>
                              </div>
                              <span className="text-white text-xl font-bold">{minesCount.toString().padStart(2, '0')}</span>
                              <span className="text-gray-400 text-xs">Mines</span>
                          </div>

                      </div>
                  </div>
              </div>
          </div>

          {/* Bottom Section: Bets List */}
          <div className="w-full max-w-[1500px] mx-auto px-4 md:px-6 pb-6 mt-4">
              <BetsList bets={mockBets} />
          </div>
      </div>
  );
};

export default Mines;
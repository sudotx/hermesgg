import { ChevronLeft, ChevronRight } from 'lucide-react'; // Using icons for better quality
import { useMemo, useState, useCallback } from 'react';
import GameCard from './GameCard';

const GamesSection = () => {
	const initialGames = useMemo(() => [
		{ title: "Crash", slug: "crash", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055246/20250711_0435_Rocket_s_Rise_simple_compose_01jzvhxecxf5wv1w8ct0345fks_ezq5eq.png" },
		{ title: "Plinko", slug: "plinko", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055244/20250711_0441_Electric_Plinko_Adventure_simple_compose_01jzvj9t_kiix7d.png" },
		{ title: "Roulette", slug: "roulette", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055253/20250711_0455_Dynamic_Roulette_Spin_simple_compose_01jzvk2a0af419z5s48sm52dqd_qins71.png" },
		{ title: "CoinFlip", slug: "coinflip", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055244/20250711_0455_Suspenseful_Coinflip_Casino_remix_01jzvk1a6tfdabsantqec6vp1m_af9xug.png" },
		{ title: "Mines", slug: "mines", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055267/20250711_0454_Suspenseful_Mines_Game_Moment_simple_compose_01jz_xts5zy.png" },
		{ title: "Dice", slug: "dice", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055256/20250711_0436_Dynamic_Dice_Roll_simple_compose_01jzvj0xxpey0b1g9dxj01h7em_zemqds.png" },
	], []);

	const [games, setGames] = useState(initialGames);
	const activeIndex = Math.floor((games.length - 1) / 2);

	const handlePrev = useCallback(() => {
		setGames(prevGames => [prevGames[prevGames.length - 1], ...prevGames.slice(0, prevGames.length - 1)]);
	}, []);

	const handleNext = useCallback(() => {
		setGames(prevGames => [...prevGames.slice(1), prevGames[0]]);
	}, []);

	return (
		<div className="w-full py-12 flex items-center justify-center">
			<div className="relative flex items-center justify-center gap-6 w-full max-w-5xl">
				{/* Left Navigation Arrow */}
				<button 
                    onClick={handlePrev}
                    className="absolute left-0 -translate-x-1/2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#2FFF8A] rounded-full flex items-center justify-center shadow-lg hover:bg-[#28e07c] transition-colors z-20"
                >
					<ChevronLeft className="w-8 h-8 text-black" />
				</button>

				{/* Game Cards Container */}
                <div className="flex gap-4 items-center justify-center">
                    {games.map((game, index) => (
                        <GameCard 
                            key={game.slug} 
                            title={game.title} 
                            image={game.image} 
							slug={game.slug}
                            isActive={index === activeIndex}
                        />
                    ))}
                </div>

				{/* Right Navigation Arrow */}
				<button 
                    onClick={handleNext}
                    className="absolute right-0 translate-x-1/2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#2FFF8A] rounded-full flex items-center justify-center shadow-lg hover:bg-[#28e07c] transition-colors z-20"
                >
					<ChevronRight className="w-8 h-8 text-black" />
				</button>
			</div>
		</div>
	)
}

export default GamesSection;
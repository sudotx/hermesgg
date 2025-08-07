// src/components/GamesSection.jsx

import { useState } from 'react';
import GameCard from './GameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Using icons for better quality

// --- Component ---

const GamesSection = () => {
    // NOTE: Make sure these image paths are correct for your project structure.
	const games = [
		{ title: "Crash", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055246/20250711_0435_Rocket_s_Rise_simple_compose_01jzvhxecxf5wv1w8ct0345fks_ezq5eq.png" },
		{ title: "Plinko", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055244/20250711_0441_Electric_Plinko_Adventure_simple_compose_01jzvj9t_kiix7d.png" },
		{ title: "Roulette", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055253/20250711_0455_Dynamic_Roulette_Spin_simple_compose_01jzvk2a0af419z5s48sm52dqd_qins71.png" },
		{ title: "Dice", image: "https://res.cloudinary.com/dma1c8i6n/image/upload/v1754055256/20250711_0436_Dynamic_Dice_Roll_simple_compose_01jzvj0xxpey0b1g9dxj01h7em_zemqds.png" },
	];

    // State to track the active game card, defaulting to Roulette (index 2)
	const [activeIndex, setActiveIndex] = useState(2);

	const handlePrev = () => {
		setActiveIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
	};

	const handleNext = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % games.length);
	};

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
                            key={game.title} 
                            title={game.title} 
                            image={game.image} 
                            isActive={index === activeIndex}
                            onClick={() => setActiveIndex(index)}
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
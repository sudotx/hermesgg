// src/components/GameCard.jsx

import clsx from 'clsx'; // A utility for conditionally joining class names

interface GameCardProps {
	title?: string;
	image?: string;
	isActive: boolean;
	onClick?: () => void;
}

const GameCard = ({ title, image, isActive, onClick }: GameCardProps) => {
	return (
        <div 
            onClick={onClick}
            className={clsx(
                'relative w-64 h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out',
                {
                    'scale-110 z-10': isActive, // Active card is larger and on top
                    'scale-100 z-0': !isActive,  // Inactive cards are normal size
                }
            )}
        >
            {/* Background Image */}
            <img 
                src={image} 
                alt={title} 
                className={clsx(
                    'w-full h-full object-cover transition-all duration-500',
                    {
                        'filter-none': isActive, // No filter on active card
                        'filter brightness-[0.6] saturate-50': !isActive, // Darken and desaturate inactive cards
                    }
                )}
            />

            {/* Gradient Overlay for Text Readability */}
            <div className={clsx(
                "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500",
                { "opacity-100": isActive, "opacity-70": !isActive }
            )} />

            {/* Active Card Glow Effect (using a pseudo-element) */}
            {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FFD700]/50 via-[#FFB800]/20 to-transparent blur-2xl" />
            )}

            {/* Content: Title, Button, and Indicator */}
            <div className="absolute inset-0 flex flex-col justify-end items-center p-4">
                {/* Active State Content */}
                {isActive ? (
                    <>
                        <h3 className="text-white text-2xl font-bold mb-4">{title}</h3>
                        <button className="bg-black text-white text-lg font-semibold py-3 px-16 rounded-lg hover:bg-gray-800 transition-colors">
                            Play
                        </button>
                        {/* Active Indicator Dot */}
                        <div className="absolute -bottom-5 w-3 h-3 bg-[#2FFF8A] rounded-full" />
                    </>
                ) : (
                    /* Inactive State Content */
                    <h3 className="text-white/80 text-xl font-semibold mb-2">{title}</h3>
                )}
            </div>
        </div>
	)
}

export default GameCard;
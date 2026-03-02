import { Link } from "react-router-dom";

const LeftCard = () => {
	return (
		<div className="relative w-full h-[600px] flex flex-row shadow-lg overflow-hidden items-stretch">
			{/* Background image - covers entire component */}
			<img
				src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573580/Rectangle_36624_tq0cyu.png"
				alt="Background"
				className="absolute inset-0 w-full h-full object-cover grayscale"
			/>

			{/* Star/jagged shape overlay - moved to left */}
			<div className="absolute inset-0">
				<img
					src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573579/Star_1_p81mi1.png"
					alt="Star overlay"
					className="absolute left-0 top-0 h-full w-auto object-cover"
				/>
			</div>

			{/* Left Column - Content */}
			<div className="w-[60%] relative z-20 flex flex-col justify-center pl-10 pr-0 py-6 h-full ">
				{/* Slider indicators */}
				{/* <div className="flex gap-2 mb-8">
					<div className="w-3 h-3 rounded-full bg-black"></div>
					<div className="w-3 h-3 rounded-full bg-yellow-300 border border-black"></div>
					<div className="w-3 h-3 rounded-full bg-yellow-300 border border-black"></div>
				</div> */}

				<h1 className="text-[64px] leading-[1.05] font-extrabold text-black mb-8">
					HERMES<br />GAMES
				</h1>
				<p className="text-gray-600 text-2xl mb-12 max-w-[600px]">
					Hermes Games is a new kind of onchain casino — fast, fair, and fully transparent. Real rewards. Full control. Built on WMChain for speed, trust, and degen fun, all with a touch of divine mischief.
				</p>
				<Link
					to="/app"
					className="flex gap-1.5 mt-2 w-fit group hover:scale-105 transition-transform duration-200"
				>
					<span className="bg-black text-white rounded-full px-12 py-5 text-2xl font-bold flex items-center shadow-lg group-hover:bg-gray-800 transition-all">
						Play Hermes
					</span>
					<span className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-3xl group-hover:bg-gray-800 group-hover:rotate-45 transition-all duration-200">
						↗
					</span>
				</Link>
			</div>

			{/* Right Column - Character */}
			<div className="w-[40%] relative z-20">
				{/* Character image */}
				<img
					src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573580/20250710_2048_Modern_Zeus_Illustration_remix_01jztq4y0ce3v9zsawtzz1cet3_2_vy00vz.png"
					alt="Hermes Character"
					className="pointer-events-none absolute bottom-0 right-20 z-20 h-[570px] w-auto max-w-[570px] select-none"
				/>
			</div>
		</div>
	);
};

export default LeftCard;

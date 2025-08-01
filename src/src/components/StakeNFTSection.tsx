
const StakeNFTSection = () => {
	return (
		<div className="w-full flex justify-center items-center py-10 px-4 rounded-3xl bg-[#10151A]">
			<div className="flex w-full max-w-6xl h-[370px] rounded-3xl overflow-hidden relative">
				{/* Left Side - NFT Market */}
				<div className="flex-1 bg-[#3B3486] flex flex-col justify-between p-10 relative">
					{/* Decorative shape */}
					<div className="absolute left-0 bottom-0">
						{/* Replace with SVG or image if available */}
						<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
							<polygon points="0,80 80,0 0,0" fill="#5FE0E6" opacity="0.7" />
						</svg>
					</div>
					<div>
						<h2 className="text-4xl font-bold text-white/80">NFT</h2>
						<h2 className="text-4xl font-bold text-white/80 mb-4">Market</h2>
						<p className="text-gray-300 mb-5">
							Qorem ipsum dolor sit amet, <br /> consectetur adipiscing elit. <br /> Nunc vulputate libero et
						</p>
						<button className="bg-[#D9C97B] text-[#3B3486] font-bold px-8 py-3 rounded-full shadow-md hover:bg-[#e6d98c] transition">
							Go Over
						</button>
					</div>
					{/* Character Placeholder */}
					<div className="absolute bottom-0 -right-24 w-10/12 opacity-80 pointer-events-none">
						{/* Replace with your character image */}
						<img
							src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1754088065/20250713_1709_Futuristic_Heroic_Robot_remix_01k021tryxfbeskdahqrbyhr9s-Photoroom_2_czmnpn.png"
							alt="NFT Hero"
							className="w-full h-auto object-contain"
						/>
					</div>
				</div>

				{/* Divider using the S-curve image */}
				<div className="relative z-10 w-16 h-full">
					<img
						src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1754088066/image_y5aora.png"
						alt="S-curve divider"
						className="absolute left-0 top-0 h-full w-full object-cover"
					/>
				</div>

				{/* Right Side - Stake Hermes Tokens */}
				<div className="flex-1 bg-[#FFE94A] flex flex-col justify-between p-10 relative">
					{/* Decorative shape */}
					<div className="absolute right-0 top-0">
						{/* Replace with SVG or image if available */}
						<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
							<polygon points="80,0 0,80 80,80" fill="#6C63FF" opacity="0.7" />
						</svg>
					</div>
					<div>
						<h2 className="text-4xl font-bold text-black">Stake Hermes</h2>
						<h2 className="text-4xl font-bold text-black mb-4">Tokens</h2>
						<p className="text-gray-700 mb-5">
							Qorem ipsum dolor sit amet, <br /> consectetur adipiscing elit. <br /> Nunc vulputate libero et
						</p>
						<button className="bg-black text-[#FFE94A] font-bold px-8 py-3 rounded-full shadow-md hover:bg-neutral-800 transition">
							Join Now
						</button>
					</div>
					{/* Character Placeholder */}
					<div className="absolute -bottom-3.5 -right-10 w-1/2 pointer-events-none">
						{/* Replace with your character image */}
						<img
							src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1754088070/20250714_1655_Modern_Digital_Illustration_remix_01k04kd0mpermrzxdqprvfbgkz_3_mazm1n.png"
							alt="Hermes King"
							className="w-full h-full object-contain"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StakeNFTSection;
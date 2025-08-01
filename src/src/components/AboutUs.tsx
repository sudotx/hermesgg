const AboutUs = () => {
	const Stat = ({ value, label }:any) => (
		<div>
			<span className="block text-7xl font-bold text-white">{value}</span>
			<span className="block text-gray-400">{label}</span>
		</div>
	);

	return (
		<div className="min-h-screen w-full bg-[#10151A] px-4 py-20 sm:px-8 md:px-12 lg:px-24">
			{/* Main content grid with two columns */}
			<div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 md:grid-cols-2">

				{/* --- LEFT COLUMN --- */}
				<div className="flex h-full flex-col justify-between pt-8">
					{/* 1. "About Us" Title inside the starburst */}
					<div className="relative h-48 w-48 ">
						<img
							src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573579/Star_5_vkhhir.png"
							alt="Purple star decoration"
							className="absolute inset-0 h-full w-full animate-spin-slow"
						/>
						<h2 className="absolute left-12 top-1/2 -translate-y-1/2 text-4xl font-bold text-white whitespace-nowrap">
							About Us
						</h2>
					</div>

					{/* 2. Tagline at the bottom of the column */}
					<div className="mt-24">
						<p className="text-4xl font-bold leading-tight text-white">
							This isn't <span className="text-[#FFD600]">just play</span>, it's <br />
							<span className="text-[#FFD600]">legacy</span>. Enter the House. <br />
							Win like the <span className="text-[#FFD600]">gods</span>.
						</p>
					</div>
				</div>

				{/* --- RIGHT COLUMN --- */}
				<div className="flex h-full flex-col justify-between">
					{/* 3. Main description paragraphs */}
					<div className="space-y-6 text-lg text-gray-300">
						<p>
							<span className="font-bold text-[#FFD600]">Hermes Games</span> is a fully onchain casino built on World Mobile Chain, offering provably fair games with instant, transparent payouts.
						</p>
						<p>
							Players don't just bet, they own a share of the house through the <span className="font-bold text-[#FFD600]">$HERMES</span> token and limited <span className="font-bold text-[#FFD600]">NFTs</span>.
						</p>
						<p>
							Our mission is to redefine online gaming by removing middlemen, delays, and doubt.
						</p>
						<p>
							With a vision rooted in speed, fairness, and player ownership, Hermes delivers a seamless casino experience powered by smart contracts. From Coin Flip to Crash and beyond, every game is trustless and tamper-proof.
						</p>
					</div>

					{/* 4. Stats section at the bottom of the column */}
					<div className="mt-16 flex items-end justify-start gap-12">
						<Stat value="6" label="Inhouse Games" />
						<Stat value="10k" label="NFT Art" />
						<img
							src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573579/Star_7_troq8c.png"
							alt="Green star decoration"
							className="h-28 w-28 animate-spin-slow"
						/>
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default AboutUs;
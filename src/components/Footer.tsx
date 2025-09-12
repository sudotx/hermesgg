import { Instagram, Twitch, Twitter, Youtube } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-black py-16 px-14 w-full">
			<div className="max-w-[1772px] mx-auto">
				<div className="grid grid-cols-4 gap-15">
					{/* Leftmost Section - Brand Identity & Socials */}
					<div className="col-span-1 mr-20">
						{/* Logo */}
						<img src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573580/image_xxi7cr.png" alt="" className="mb-4" />

						{/* Description */}
						<p className="text-gray-400 text-sm leading-relaxed mb-8">
							Hermes brings provably fair games and NFT-powered rewards to WMChain all built onchain from day one. Hermes is where chads play!  The house doesn’t lie, and the gods don’t miss.

						</p>

						{/* Social Media Icons */}
						<div className="flex gap-4 mb-8">
							{/* Discord */}
							<div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
								<span className="text-white text-sm"><Twitch /></span>
							</div>

							{/* Twitter */}
							<div className="w-8 h-8  rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
								<span className="text-white text-sm"><Twitter /></span>
							</div>

							{/* Instagram */}
							<div className="w-8 h-8  rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
								<span className="text-white text-sm"><Instagram /></span>
							</div>

							{/* YouTube */}
							<div className="w-8 h-8  rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
								<span className="text-white text-sm"><Youtube /></span>
							</div>
						</div>

						{/* Copyright */}
						<p className="text-gray-400 text-sm">
							© {new Date().getFullYear()} <span className="text-[#FFD600] font-bold">HERMES Games</span>. All Right Reserved
						</p>
					</div>

					{/* Marketplace Section */}
					<div className="col-span-1">
						<h3 className="text-white font-bold text-lg mb-6">Casino</h3>
						<div className="space-y-3">
							<a href="#" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Explore</a>
							<a href="#" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Articles</a>
							<a href="#" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">How It Works</a>
						</div>
					</div>

					{/* Inhouse Games Section */}
					<div className="col-span-1">
						<h3 className="text-white font-bold text-lg mb-6">Inhouse Games</h3>
						<div className="grid grid-cols-1 gap-x-8 gap-y-3">
							<a href="/app/crash" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Crash</a>
							<a href="/app/dice" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Dice</a>
							<a href="/app/roulette" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Plinko</a>
							<a href="/app/coin-flip" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Coin Flip</a>
							<a href="/app/roulette" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Roulette</a>
							<a href="/app/mines" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Mines</a>
						</div>
					</div>

					{/* Other Section */}
					<div className="col-span-1">
						<h3 className="text-white font-bold text-lg mb-6">Other</h3>
						<div className="space-y-3">
							<a href="#" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Support Service</a>
							<a href="#" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">FAQ</a>
							<a href="#" className="block text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
						</div>
					</div>
				</div>
			</div>
		</footer >
	);
};

export default Footer;
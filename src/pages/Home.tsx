import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import LeftCard from "../components/LeftCard";
import NavBar from "../components/NavBar";

import BannerSection from "../components/BannerSection";
import Faqs from "../components/Faqs";
import GamesSection from "../components/GamesSection";

import AboutUs from "../components/AboutUs";
import StakeNFTSection from "../components/StakeNFTSection";


const Home = () => {
	return (
		<div className="bg-neutral-900 flex justify-center overflow-hidden">
			<div className="w-full max-w-screen">
				<div className="top-[34px] z-50">
					<NavBar />
				</div>
				<div className="pt-4 mx-auto">
					<LeftCard />
				</div>

				{/* Inhouse Games Section */}
				<div className="mt-20 px-8">
					{/* Header */}
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-white mb-4">Inhouse Games</h2>
						<p className="text-gray-400 text-lg max-w-2xl mx-auto">
							Qorem ipsum dolor sit amet, consectetur adipiscing <br /> elit. Nunc vulputate libero et.
						</p>
					</div>

					{/* Game Cards Section */}
					<GamesSection />

					{/* Explore Now Button */}
					<div className="text-center mt-12">
						<Link
							to="/app/coin-flip"
							className="bg-[#FFD600] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFD600]/90 transition-colors shadow-lg"
						>
							Explore Now
						</Link>
					</div>
				</div>

				{/* Banner Section */}
				<BannerSection />

				{/* About Us Section */}
				<AboutUs />

				<StakeNFTSection/>

				{/* FAQs Section */}
				<Faqs />

				{/* Footer */}
				<Footer />
			</div>
		</div>
	);
}

export default Home;

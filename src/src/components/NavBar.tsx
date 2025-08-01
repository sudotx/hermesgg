
const NavBar = () => {
	return (
		<nav className="bg-neutral-900 flex items-center justify-between h-10 font-normal line px-14 mt-2 mb-2 leading-7 text-sm font-sans">
			{/* Logo - Left side */}
			<div className="flex items-center">
				<div className="w-10 h-10 rounded-xl flex items-center justify-center">
					<img src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573580/image_xxi7cr.png" alt="" />
				</div>
			</div>

			{/* Navigation items - Right side */}
			<div className="flex items-center gap-7">
				{/* Menu links */}
				<ul className="flex gap-7 list-none m-0 p-0 text-[15px] font-normal items-center">
					<li className="text-[#FFD600] font-bold cursor-pointer">About Us</li>
					<li className="text-white font-medium cursor-pointer">Inhouse Games</li>
					<li className="text-white font-medium cursor-pointer">Marketplace</li>
					<li className="text-white font-medium cursor-pointer">Creators</li>
				</ul>

				{/* Join Now Button */}
				<button className="bg-[#2FFF8A] text-[#10151A] border-none rounded-full px-6 py-1.5 font-bold text-[15px] cursor-pointer shadow-md transition-colors">
					Join Now
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
// A simple SVG component for the stars to match the image better.
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
		stroke="currentColor"
		strokeWidth="1"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
	</svg>
);


const BannerSection = () => {
	return (
		// The main container is now fully rounded and relative for positioning the mascot.
		<div className="relative mx-auto mt-20 flex h-[90px] max-w-6xl items-center rounded-sm bg-[#5B4FFF] px-6">
			{/* 1. Mascot is now absolutely positioned to peek from the left */}
			<img
				src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573580/image_copy_4_f7mxzj.png"
				alt="Mascot"
				className="pointer-events-none absolute -left-5 bottom-0 h-[125px] w-[125px] select-none"
				draggable={false}
			/>

			{/* This container holds the text and button, with padding to avoid the mascot */}
			<div className="flex w-full items-center justify-between pl-24">
				{/* 2. Text and Stars (now using SVG icons) */}
				<div className="flex flex-1 items-center justify-center gap-5">
					<StarIcon className="text-2xl text-[#FFD600]" />
					<span className="whitespace-nowrap text-xl font-medium text-white">
						There's more Games to Come and <span className="font-bold">NFTs</span> to Mint
					</span>
					<StarIcon className="text-2xl text-[#FFD600]" />
				</div>

				{/* 3. Follow Us Button */}
				<button className="flex-shrink-0 rounded-full bg-[#FFD600] px-6 py-2.5 text-base font-semibold text-black shadow-lg transition-colors hover:bg-yellow-400">
					Follow Us
				</button>
			</div>
		</div>
	);
};

export default BannerSection;
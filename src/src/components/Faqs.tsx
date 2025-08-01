
import * as Accordion from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";

const faqsList = [
	{
		question: "What is Hermes Games?",
		answer: "Hermes Games is a decentralized gaming platform built on the World Mobile Chain, offering a variety of crypto-based games with a focus on transparency and player rewards.",
	},
	{
		question: "What makes Hermes different from other crypto casinos?",
		answer: "Hermes differentiates itself through its community-owned model, revenue sharing with NFT holders and $HERMES token stakers, and its commitment to provably fair gaming.",
	},
	{
		question: "What games are available on Hermes?",
		answer: "Hermes offers a growing selection of games, including classics like Dice, Crash, and Roulette, as well as innovative new games developed by the community.",
	},
	{
		question: "What is the $HERMES token used for?",
		answer: "The $HERMES token is the native utility token of the platform, used for staking, governance, and receiving a share of the platform's revenue.",
	},
	{
		question: "What are Hermes NFTs and why are they important?",
		answer: "Hermes NFTs are unique digital assets that represent ownership in the platform. NFT holders are entitled to a portion of the revenue generated by the games.",
	},
	{
		question: "How does the revenue share system work?",
		answer: "A percentage of the revenue from each game is distributed to Hermes NFT holders and those who stake $HERMES tokens, creating a passive income stream for supporters.",
	},
	{
		question: "Is Hermes safe to use?",
		answer: "Yes, Hermes is built on a secure and transparent blockchain, and all games are provably fair. The platform is regularly audited to ensure the safety of player funds.",
	},
	{
		question: "Why is World Mobile Chain used for Hermes?",
		answer: "World Mobile Chain provides a scalable, secure, and low-cost infrastructure for Hermes Games, enabling fast and efficient transactions for a seamless gaming experience.",
	},
	{
		question: "Do I need to KYC or register?",
		answer: "No, Hermes is a decentralized platform, and there is no requirement for KYC or registration. You can play anonymously with just a compatible crypto wallet.",
	},
	{
		question: "How can I join early or support the project?",
		answer: 'You can mint a Hermes "Degen god NFT", join the presale for $HERMES, test early games, provide feedback, or join the community on Discord and X to contribute ideas and content.',
	},
];

const Faqs = () => {
	return (
		<div className="min-h-screen bg-[#10151A]">
			<div className="max-w-7xl mx-auto px-8">
				<div className="flex gap-16 items-start">
					{/* Left Column */}
					<div className="flex-1">
						{/* Title */}
						<h2 className="text-5xl font-bold text-white mb-6">FAQs</h2>

						{/* Description */}
						<p className="text-gray-400 text-lg mb-12">
							Qorem ipsum dolor sit amet, consectetur <br /> adipiscing elit. Nunc vulputate libero et
						</p>

						{/* 3D Slot Machine */}
						<div className="relative w-[569px] h-[569px] mx-auto mb-8">
							<img src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573583/image_copy_5_zqt2wd.png" alt="FAQ Slot Machine" className="w-full h-full object-contain" />
						</div>

						{/* Bottom-left Group Image */}
						<div className="relative w-32 h-32 animate-spin-slow">
							<img src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1753573579/Group_ymb6ub.png" alt="Contact us" className="w-full h-full object-contain" />
						</div>
					</div>

					{/* Right Column - FAQ List */}
					<div className="flex-1">
						<div className="space-y-0">
							{faqsList.map((faq, index) => (
								<div key={index} className="border-b border-gray-600 py-4">
									<Accordion.Root type="single" collapsible>
										<Accordion.Item value={`item-${index}`} className="w-full">
											<Accordion.Trigger className="w-full flex justify-between items-center text-left py-2">
												<span className="text-white font-medium text-lg">{faq.question}</span>
												{index === faqsList.length - 1 ? (
													<Minus className="text-white h-5 w-5" />
												) : (
													<Plus className="text-white h-5 w-5" />
												)}
											</Accordion.Trigger>
											<Accordion.Content className="text-gray-300 text-sm leading-relaxed pt-3 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
												{faq.answer}
											</Accordion.Content>
										</Accordion.Item>
									</Accordion.Root>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Faqs
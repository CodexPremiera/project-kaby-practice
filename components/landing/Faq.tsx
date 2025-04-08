import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import FaqItem from "./FaqItem";
import Pretitle from "../Pretitle";


interface FaqItemData {
	title: string;
	description: string;
}

const faqItemsData: FaqItemData[] = [
	{
		title: "Is my personal data secure on the app?",
		description:
			"Yes, your personal data is securely stored using encryption protocols and will only be used for the RBI registration of your barangay.",
	},
	{
		title: "Do I need to visit the barangay to create an account?",
		description:
			"Not necessary, if your barangay is registered in the app, you can create your account, verify your email, and we will forward it to your barangay for approval.",
	},
	{
		title: "What if my barangay isn't registered? Can I log in?",
		description:
			"No, you cannot log in if your barangay is not registered. You can submit a petition for us to invite your barangay to register.",
	},
];

// Animation variants for FAQ items
const faqItemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: index * 0.1, duration: 0.3 }, // Staggered animation
	}),
};

const Faq = () => {
	return (
		<section className="pt-16 xl:pt-32" id="faq">
			<div className="container mx-auto w-full xl:h-auto card-custom p-4 xl:p-8 xl:px-[90px] xl:py-[36px]">
				{/* Text Section */}
				<motion.div
					variants={fadeIn("up", 0.2)}
					initial="hidden"
					whileInView="show"
					viewport={{ once: false, amount: 0.2 }}
					className="text-center max-w-[720px] mx-auto xl:mb-20"
				>
					<Pretitle text="Frequently Asked Questions" center />
					<p className="mb-11 max-w-[400px] mx-auto">
					</p>
				</motion.div>

				{/* FAQ Items */}
				<ul className="w-full flex flex-col">
					{faqItemsData.map((item, index) => {
						return (
							<motion.li
								key={index}
								variants={faqItemVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false, amount: 0.8 }}
								custom={index} // Pass index to control stagger
							>
								<FaqItem title={item.title} description={item.description} />
							</motion.li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};

export default Faq;

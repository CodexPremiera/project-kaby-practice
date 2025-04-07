import Link from "next/link";
import {
	RiFacebookFill,
	RiYoutubeFill,
	RiTwitterFill,
	RiInstagramFill,
} from "react-icons/ri";
import { ReactElement } from "react";

interface SocialItem {
	icon: ReactElement;
	path: string;
}

interface SocialsProps {
	containerStyles?: string;
	iconStyles?: string;
}

const socials: SocialItem[] = [
	{
		icon: <RiFacebookFill />,
		path: "",
	},
	{
		icon: <RiYoutubeFill />,
		path: "",
	},
	{
		icon: <RiTwitterFill />,
		path: "",
	},
	{
		icon: <RiInstagramFill />,
		path: "",
	},
];

const Socials = ({ containerStyles = "", iconStyles = "" }: SocialsProps) => {
	return (
		<div className={containerStyles}>
			{socials.map((item, index) => (
				<Link href={item.path} key={index} className={iconStyles}>
					{item.icon}
				</Link>
			))}
		</div>
	);
};

export default Socials;

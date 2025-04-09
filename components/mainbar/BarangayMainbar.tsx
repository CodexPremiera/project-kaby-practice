import {
	RiCommunityLine,
	RiHome4Line,
	RiServiceLine,
	RiSettings4Line,
} from "react-icons/ri";
import Link from "next/link";

const links = [
	{ name: "Home", path: "/barangay" },
	{ name: "Citizen Desk", path: "/barangay/citizen_desk" },
	{ name: "Service Desk", path: "/barangay/service_desk" },
	{ name: "Settings", path: "/barangay/account" },
];

const BarangayMainbar = () => {
	return (
		<div className="z-10 h-[75px] w-screen text-white p-4 fixed left-0 card-shadow-custom bottom-0 sm:w-[75px] sm:h-screen sm:fixed sm:bottom-0 sm:left-0 sm:flex sm:flex-start flex flex-row justify-center items-center py-5 sm:flex-col">
			{links.map((link, index) => (
				<Link key={index} href={link.path}>
					<div className="relative flex items-center py-3 px-3 cursor-pointer group transition-all duration-300 hover:bg-gray rounded-[10px]">
						{/* Icon */}
						<div className="flex space-around items-center">
							{link.name === "Home" && (
								<RiHome4Line className="w-6 h-6 text-black" />
							)}
							{link.name === "Citizen Desk" && (
								<RiCommunityLine className="w-6 h-6 text-black" />
							)}
							{link.name === "Service Desk" && (
								<RiServiceLine className="w-6 h-6 text-black" />
							)}
							<div className="relative top-0">
								{link.name === "Settings" && (
									<RiSettings4Line className="w-6 h-6 text-black" />
								)}
							</div>
						</div>

						{/* Text - Appears when hovered, positioned absolutely next to the icon */}
						<span className="absolute left-full ml-2 text-black text-[12px] text-center group-hover:text-white group-hover:bg-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
							{link.name}
						</span>
					</div>
				</Link>
			))}
		</div>
	);
};

export default BarangayMainbar;

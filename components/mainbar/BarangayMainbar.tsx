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
					<div className="relative flex items-center px-3 py-3 cursor-pointer group transition-all duration-300 hover:bg-gray rounded-[10px] m-6">
						{/* Icon */}
						<div className="flex flex-col sm:flex-row text-[13px] text-center text-black justify-center items-center">
							{link.name === "Home" && (
								<RiHome4Line className="w-6 h-6 text-black" />
							)}
							{link.name === "Citizen Desk" && (
								<RiCommunityLine className="w-6 h-6 text-black" />
							)}
							{link.name === "Service Desk" && (
								<RiServiceLine className="w-6 h-6 text-black" />
							)}
							{link.name === "Settings" && (
								<RiSettings4Line className="w-6 h-6 text-black" />
							)}
							<p className="sm:hidden">{link.name}</p>
						</div>

						{/* Text - Appears when hovered*/}
						<span className="hidden sm:block sm:absolute sm:left-full sm:ml-2 sm:text-black sm:text-[12px] sm:text-center sm:group-hover:text-white sm:group-hover:bg-black sm:px-2 sm:py-1 sm:rounded-lg sm:opacity-0 sm:group-hover:opacity-100 sm:transition-all sm:duration-300">
							{link.name}
						</span>
					</div>
				</Link>
			))}
		</div>
	);
};

export default BarangayMainbar;

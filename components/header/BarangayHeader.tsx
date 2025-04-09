"use client";

import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ModeToggle";

const BarangayHeader = () => {
	return (
		<header className="h-[65px] sm:w-[95%] flex justify-between items-center border-b border-gray/20">
			<div className="flex">
				<Logo />
			</div>

			<div className="flex gap-6 mx-8">
				<div>
					<Button variant="barangay">Barangay</Button>
				</div>
				<div>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};

export default BarangayHeader;

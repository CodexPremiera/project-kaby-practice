import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {logout} from "@/components/header/logout/actions";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LogoutToggle() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="clear" size="icon">
					<ChevronDown className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<ChevronDown className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="background-1">
				<DropdownMenuItem onClick={logout} className="flex w-full">
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}


import Link from "next/link";

interface MainbarItemProps {
  name: string;
  path: string;
  icon: React.ElementType;
}

const MainbarItem = ({ name, path, icon: Icon }: MainbarItemProps) => (
  <Link
    href={path}
    className="mainbar-tab group flex flex-col items-center justify-center px-3 py-3 mt-2 rounded-[10px] transition-all duration-300 hover:bg-gray-100"
  >
    <Icon className="w-6 h-6" />

    {/* Label for mobile */}
    <p className="sm:hidden text-[11px] mt-1 whitespace-nowrap">{name}</p>

    {/* Tooltip for desktop */}
    <span className="max-sm:hidden absolute left-full ml-2 text-black text-[12px] text-center group-hover:text-white group-hover:bg-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
			{name}
		</span>
  </Link>
);

export default MainbarItem;

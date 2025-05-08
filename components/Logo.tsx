import Link from "next/link";
import Image from "next/image";

const Logo = () => {
	return (
		<Link href="/">
			<Image src="/assets/kaby_logo.svg" width="0" height={32} alt="" className="w-auto"/>
		</Link>
	);
};

export default Logo;

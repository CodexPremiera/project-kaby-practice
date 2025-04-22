import Link from "next/link";
import Image from "next/image";

const Logo = () => {
	return (
		<Link href="/">
			<Image src="/assets/logo.svg" width={28} height={28} alt="" />
		</Link>
	);
};

export default Logo;

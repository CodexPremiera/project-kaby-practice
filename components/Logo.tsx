import Link from "next/link";
import Image from "next/image";

const Logo = () => {
	return (
		<Link href="/">
			<Image src="/assets/logo.svg" width={32} height={32} alt="" />
		</Link>
	);
};

export default Logo;

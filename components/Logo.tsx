import Link from "next/link";
import Image from "next/image";

const Logo = () => {
	return (
		<Link href="">
			<Image src="/assets/logo.png" width={230} height={48} alt="" />
		</Link>
	);
};

export default Logo;

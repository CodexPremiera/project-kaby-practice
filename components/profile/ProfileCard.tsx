"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileCardProps {
	id: string;
	name: string;
	address: string;
	image: string;
}

const ProfileCard = ({ id, name, address, image }: ProfileCardProps) => {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/profile/${id}`)}
			className="flex gap-4 w-auto items-center my-4 cursor-pointer hover:bg-gray-200 p-2 rounded-md"
		>
			<div className="w-10 h-10 shrink-0">
				<Image src={image} width={60} height={60} alt="Profile" />
			</div>
			<div className="flex flex-col">
				<div className="flex lg:justify-start gap-2">
					<p className="h6">{name}</p>
				</div>
				<p className="text-sm text-gray-600">{address}</p>
			</div>
		</div>
	);
};

export default ProfileCard;

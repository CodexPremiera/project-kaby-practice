"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ServiceTagProps {
	id: string;
	title: string;
	owner: string;
	image: string;
}

const ServiceTag = ({ id, title, owner, image }: ServiceTagProps) => {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/services/${id}`)}
			className="flex gap-4 w-auto items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md"
		>
			<div className="w-16 h-16 shrink-0">
				<Image src={image} width={60} height={60} alt="Profile" />
			</div>
			<div className="flex flex-col">
				<div className="flex lg:justify-start gap-2">
					<p className="text-sm font-semibold">{title}</p>
				</div>
				<p className="text-sm text-gray-600">{owner}</p>
			</div>
		</div>
	);
};

export default ServiceTag;

import { notFound } from "next/navigation";
import Image from "next/image";
import { profiles } from "@/data/profiles";

interface ProfilePageProps {
	params: { id: string };
}

const getProfileById = async (id: string) => {
	return profiles.find((profile) => profile.id === id) || null;
};

const CitizenProfileTab = async ({ params }: ProfilePageProps) => {
	const { id } = await params;

	const profile = await getProfileById(id);

	if (!profile) {
		notFound();
	}

	return (
		<div className="container mx-auto p-6">
			{/* Profile Header and Image */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 card-custom p-6 shadow">
				{/* Profile Details */}
				<div className="flex gap-4 items-center text-center sm:text-left">
					<Image
						src={profile.image}
						width={60}
						height={60}
						alt="Profile"
						className="min-w-[60px] min-h-[60px] rounded-full"
					/>
					<div className="flex flex-col">
						<div className="flex items-center justify-start gap-2">
							<p className="text-lg font-semibold">{profile.name}</p>
						</div>
						<p className="text-sm text-gray-600">{profile.address}</p>
					</div>
				</div>

				{/* Profile Badges */}
				<div className="flex gap-6 py-6 px-6 sm:px-12 text-sm w-full sm:w-auto">
					<div className="text-center sm:text-left">
						<span className="h5 mr-3">{profile.current_badges}</span>
						Current Badges
					</div>
					<div className="text-center sm:text-left">
						<span className="h5 mr-3">{profile.accumulated_badges}</span>
						Accumulated Badges
					</div>
				</div>
			</div>
		</div>
	);
};

export default CitizenProfileTab;

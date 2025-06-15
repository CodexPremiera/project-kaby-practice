import React, { useEffect, useState } from "react";
import { useBarangayContext } from "@/app/context/BarangayContext";
import { set } from "date-fns";
import { getPublicUrl } from "@/utils/supabase/storage";

interface Citizen {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  profile_pic: string;
}

const FeaturedCitizenCard = ({
	name,
	email,
	avatar,
}: {
	name: string;
	email: string;
	avatar: string;
}) => (
	<div className="flex items-start gap-3 w-full">
		<img src={avatar} alt="user profile" className="w-9 rounded-full" />
		<div className="flex flex-col justify-center items-start">
			<span className="text-primary font-medium max-w-[13rem] truncate whitespace-nowrap">
				{name}
			</span>
			<span className="text-secondary text-xs max-w-[13rem] truncate whitespace-nowrap">
				{email}
			</span>
		</div>
	</div>
);

const MonthlyBadges = () => {
	const {barangayId} = useBarangayContext();
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [citizens, setCitizens] = useState<Citizen[]>([]);


	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 767px)");
		setIsSmallScreen(mediaQuery.matches);

		const handler = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches);
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);
	  useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(
					`/api/monthly_badge/${barangayId}`,
					{
						method: "GET",
						cache: "no-store",
					}
				);
				const data = await res.json();
				console.log("Monthly Badges Data:", data);
				setCitizens(data.data);
			} catch (err) {
				console.error("Failed to fetch monthly badges:", err);
			}
		};
    fetchData();
  }, []);

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	// Small screen: button + modal
	if (isSmallScreen) {
		return (
			<>
				<button
					onClick={openModal}
					className="flex items-center gap-2 font-bold text-primary hover:underline text-sm"
				>
					<svg
						width={20}
						height={20}
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7.49534 13.5878L9.99949 12.069L12.5037 13.5878L11.838 10.7387L14.0527 8.83768L11.1422 8.5795L9.99949 5.90691L8.85684 8.5795L5.94625 8.83768L8.16096 10.7387L7.49534 13.5878ZM9.99949 20L7.04755 17.0591H2.93984V12.9514L0 9.99949L2.93984 7.04755V2.93984H7.04755L9.99949 0L12.9514 2.93984H17.0591V7.04755L20 9.99949L17.0591 12.9514V17.0591H12.9514L9.99949 20Z"
							fill="#FFA52F"
						/>
					</svg>
					Month of March
				</button>

				{showModal && (
					<div
						onClick={closeModal}
						className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className="bg-white rounded-lg p-6 max-w-md w-full"
						>
							<div className="w-full">
								<div className="flex items-center gap-2 mb-2">
									<svg
										width={20}
										height={20}
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M7.49534 13.5878L9.99949 12.069L12.5037 13.5878L11.838 10.7387L14.0527 8.83768L11.1422 8.5795L9.99949 5.90691L8.85684 8.5795L5.94625 8.83768L8.16096 10.7387L7.49534 13.5878ZM9.99949 20L7.04755 17.0591H2.93984V12.9514L0 9.99949L2.93984 7.04755V2.93984H7.04755L9.99949 0L12.9514 2.93984H17.0591V7.04755L20 9.99949L17.0591 12.9514V17.0591H12.9514L9.99949 20Z"
											fill="#FFA52F"
										/>
									</svg>
									<span className="font-bold text-primary truncate">
										Month of {new Date().toLocaleString("default", { month: "long" })}
									</span>
								</div>
								<span className="text-secondary text-sm block mb-4 text-center">
									Thank you for your active participation!
								</span>
								<div className="grid grid-cols-2 gap-4">
									<div className="w-full mt-6">
										{citizens.map((citizen, idx) => (
											<FeaturedCitizenCard
												key={idx}
												name={`${citizen.first_name} ${citizen.middle_name || ""} ${citizen.last_name}`}
												email={citizen.email}
												avatar="/assets/img/profile/bg-profile.png"
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</>
		);
	}

	// Large screen: always show info panel
	return (
		<div className="flex flex-col items-center gap-6 rounded-2xl bg-white p-6">
			<div className="w-full">
				<div className="flex items-center gap-2 mb-2">
					<svg
						width={20}
						height={20}
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7.49534 13.5878L9.99949 12.069L12.5037 13.5878L11.838 10.7387L14.0527 8.83768L11.1422 8.5795L9.99949 5.90691L8.85684 8.5795L5.94625 8.83768L8.16096 10.7387L7.49534 13.5878ZM9.99949 20L7.04755 17.0591H2.93984V12.9514L0 9.99949L2.93984 7.04755V2.93984H7.04755L9.99949 0L12.9514 2.93984H17.0591V7.04755L20 9.99949L17.0591 12.9514V17.0591H12.9514L9.99949 20Z"
							fill="#FFA52F"
						/>
					</svg>
					<span className="font-bold text-primary truncate">
						Month of {new Date().toLocaleString("default", { month: "long" })}
					</span>
				</div>
				<span className="text-secondary text-sm block mb-4">
					Thank you for your active participation!
				</span>
				<div className="grid grid-cols-2 gap-4">
					<div className="w-full mt-6">
						{citizens.map((citizen, idx) => (
							<FeaturedCitizenCard
								key={idx}
								name={`${citizen.first_name} ${citizen.middle_name || ""} ${citizen.last_name}`}
								email={citizen.email}
								avatar={getPublicUrl(citizen.profile_pic, "profile-pictures")}

							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MonthlyBadges;

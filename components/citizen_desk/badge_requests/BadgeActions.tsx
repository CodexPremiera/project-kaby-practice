import React, { useEffect, useRef, useState } from "react";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import { EllipsisVertical as MoreIcon } from "lucide-react";

type Props = {
	customer_id: string;
	owner_id: string;
	service_id: string;
	onActionComplete: () => void;
};

const BadgeActions: React.FC<Props> = ({
	customer_id,
	owner_id,
	service_id,
	onActionComplete,
}) => {
	const [showActions, setShowActions] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setShowActions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleAccept = async () => {
		try {
			const res = await fetch(`/api/barangay/badge_request`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					customer_id,
					owner_id,
				}),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error);

			// MonthlyBadge table with status: "Accept"
			const postRes = await fetch(`/api/barangay/badge_request`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					citizen_id: customer_id,
					barangay_id: owner_id,
					service_id: service_id,
					date_given: new Date().toISOString().split("T")[0],
					status: "Accept",
				}),
			});

			const postData = await postRes.json();
			if (!postRes.ok) throw new Error(postData.error);

			alert("Badge given and logged successfully!");
			onActionComplete();
		} catch (error: any) {
			alert(`Error: ${error.message}`);
		}
		setShowActions(false);
	};
	const handleReject = async () => {
		try {
			// MonthlyBadge table with status: "Reject"
			const postRes = await fetch(`/api/barangay/badge_request`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					citizen_id: customer_id,
					barangay_id: owner_id,
					service_id: service_id,
					date_given: new Date().toISOString().split("T")[0],
					status: "Reject",
				}),
			});

			const postData = await postRes.json();
			if (!postRes.ok) throw new Error(postData.error);

			alert("Badge request rejected and logged.");
			onActionComplete();
		} catch (error: any) {
			alert(`Error: ${error.message}`);
		}
		setShowActions(false);
	};

	return (
		<div ref={wrapperRef} className="relative">
			<ButtonClear onClick={() => setShowActions((prev) => !prev)}>
				<MoreIcon strokeWidth={2} size={20} className="w-6 p-0" />
			</ButtonClear>

			{showActions && (
				<div className="flex flex-col gap-2 absolute bottom-0 right-0 translate-y-full background-1 p-4 rounded-xl drop-shadow-xl z-50">
					<ButtonClear onClick={handleReject} className="!p-3 !text-sm">
						Reject
					</ButtonClear>
					<ButtonClear onClick={handleAccept} className="!p-3 !text-sm">
						Accept
					</ButtonClear>
				</div>
			)}
		</div>
	);
};

export default BadgeActions;

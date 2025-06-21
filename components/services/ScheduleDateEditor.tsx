"use client";

import React, { useState } from "react";
import { formatDate, formatDateToInputValue } from "@/lib/utils";

interface Props {
	startDate: Date | null;
	endDate: Date | null;
	onConfirm: (start: Date | null, end: Date | null) => void;
}

const ScheduleDateEditor: React.FC<Props> = ({
	startDate,
	endDate,
	onConfirm,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [tempStartDate, setTempStartDate] = useState("");
	const [tempEndDate, setTempEndDate] = useState("");

	const handleEditSchedule = () => {
		const todayISO = formatDateToInputValue(new Date());
		setTempStartDate(startDate ? formatDateToInputValue(startDate) : todayISO);
		setTempEndDate(endDate ? formatDateToInputValue(endDate) : todayISO);
		setIsEditing(true);
	};

	const handleRemoveSchedule = () => {
		onConfirm(startDate, null);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setTempStartDate("");
		setTempEndDate("");
	};

	const handleConfirm = () => {
		const start = tempStartDate ? new Date(tempStartDate) : null;
		const end = tempEndDate ? new Date(tempEndDate) : null;
		if (start) {
			onConfirm(start, end);
		}
		setIsEditing(false);
	};

	return (
		<div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-2 text-sm w-full justify-between">
			{/* Schedule display */}
			<div>
				<span className="text-gray-500">Schedule: </span>
				<span className="font-normal text-gray-500">
					{endDate
						? `${formatDate(startDate)} • ${formatDate(endDate)}`
						: "Available anytime"}
				</span>
			</div>

			{/* Buttons */}
			{!isEditing && (
				<div className="flex gap-2 md:gap-4 flex-wrap w-full md:w-auto">
					<button
						onClick={handleEditSchedule}
						className="text-sm px-3 py-1 rounded bg-gray text-black hover:bg-black hover:text-white transition w-full md:w-fit"
					>
						{endDate ? "Change Schedule" : "Add Schedule Date"}
					</button>

					{endDate && (
						<button
							onClick={handleRemoveSchedule}
							className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition w-full md:w-fit"
							title="Remove schedule (clear end date)"
						>
							Remove Schedule
						</button>
					)}
				</div>
			)}

			{/* Editing UI */}
			{isEditing && (
				<div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-3 w-full md:w-auto">
					{/* Date inputs */}
					<div className="flex flex-row gap-2 md:gap-4 w-full md:w-auto">
						<div className="flex items-center gap-1">
							<label className="text-gray-500 text-sm">Start Date:</label>
							<input
								type="date"
								value={tempStartDate}
								disabled
								className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-500"
								max={tempEndDate}
							/>
						</div>
						<div className="flex items-center gap-1">
							<label className="text-gray-500 text-sm">End Date:</label>
							<input
								type="date"
								value={tempEndDate}
								onChange={(e) => setTempEndDate(e.target.value)}
								className="border border-gray-300 rounded px-2 py-1 text-sm"
								min={tempStartDate}
							/>
						</div>
					</div>

					{/* Confirm & Back buttons */}
					<div className="flex flex-row gap-2 w-full md:w-auto">
						<button
							onClick={handleConfirm}
							className="text-sm px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition w-full md:w-fit"
						>
							Confirm
						</button>
						<button
							onClick={handleCancel}
							className="text-sm px-3 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition w-full md:w-fit"
						>
							Back
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ScheduleDateEditor;

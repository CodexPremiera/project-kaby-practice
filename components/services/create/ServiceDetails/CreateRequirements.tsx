import React from "react";
import DatePicker from "../../DatePicker";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RequirementsFormData } from "@/app/(features)/services/create/page";

const yesNoOptions = ["Yes", "No"] as const;
const dateOptions = ["Available Anytime", "Scheduled"] as const;

interface CreateRequirementsProps {
	formData: RequirementsFormData;
	updateFormData: (field: keyof RequirementsFormData, value: any) => void;
}

const CreateRequirements: React.FC<CreateRequirementsProps> = ({
	formData,
	updateFormData,
}) => {
	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-xl font-semibold">Requirements</h2>

			{/* Attach Requirements Dropdown */}
			<div className="flex items-center gap-2">
				<p className="text-sm text-gray-500 mt-2">
					Do you require your customers to attach any requirements or files?
				</p>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="gray" className="w-24 justify-between">
							{formData.attach_requirements || "Select"}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="bg-white">
						{yesNoOptions.map((opt) => (
							<DropdownMenuItem
								key={opt}
								onClick={() => updateFormData("attach_requirements", opt)}
							>
								{opt}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Date Option Dropdown */}
			<div className="flex flex-col md:flex-row justify-between md:items-center items-start gap-4">
				<div className="text-sm mt-2 ">
					You can choose to make your service either scheduled or available
					anytime. <br />
					If you select <strong>"Scheduled"</strong>, please be sure of the
					dates, as they cannot be changed once set.
				</div>
				<div>
					<p className="text-sm text-gray-500">Date Option:</p>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="gray" className="w-40 justify-between">
								{formData.date_option || "Select"}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-white">
							{dateOptions.map((opt) => (
								<DropdownMenuItem
									key={opt}
									onClick={() => updateFormData("date_option", opt)}
								>
									{opt}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Conditionally render DatePicker */}
			{formData.date_option === "Scheduled" && (
				<div className="flex-1 flex flex-col gap-4">
					<DatePicker
						selectedStartDate={formData.start_date}
						selectedEndDate={formData.end_date}
						onStartDateChange={(date) => updateFormData("start_date", date)}
						onEndDateChange={(date) => updateFormData("end_date", date)}
					/>
				</div>
			)}
		</div>
	);
};

export default CreateRequirements;

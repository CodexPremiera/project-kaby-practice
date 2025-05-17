"use client";
import { Calendar } from "@/components/ui/calendar";
import { isBefore, startOfDay } from "date-fns";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

interface DatePickerProps {
	selectedStartDate: Date | null;
	selectedEndDate: Date | null;
	onStartDateChange: (date: Date | null) => void;
	onEndDateChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
	selectedStartDate,
	selectedEndDate,
	onStartDateChange,
	onEndDateChange,
}) => {
	const today = startOfDay(new Date());

	const handleStartDateSelect = (date?: Date) => {
		onStartDateChange(date ?? null);
		if (selectedEndDate && date && isBefore(selectedEndDate, date)) {
			onEndDateChange(null);
		}
	};

	return (
		<div className="flex sm:gap-6">
			<div className="flex-1 w-full">
				<p className="text-sm">Start:</p>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="gray">
							{selectedStartDate
								? selectedStartDate.toLocaleDateString()
								: "Select Date"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="bg-white">
						<Calendar
							mode="single"
							selected={selectedStartDate ?? undefined}
							onSelect={handleStartDateSelect}
							disabled={(date) => isBefore(date, today)}
						/>
					</PopoverContent>
				</Popover>
			</div>

			<div className="flex-1 w-full">
				<p className="text-sm">End:</p>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="gray">
							{selectedEndDate
								? selectedEndDate.toLocaleDateString()
								: "Select Date"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="bg-white">
						<Calendar
							mode="single"
							selected={selectedEndDate ?? undefined}
							onSelect={(date) => onEndDateChange(date ?? null)}
							disabled={(date) =>
								selectedStartDate
									? isBefore(date, selectedStartDate)
									: isBefore(date, today)
							}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default DatePicker;

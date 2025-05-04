"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { isBefore } from "date-fns";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

const DatePicker = () => {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	const handleStartDateSelect = (date?: Date) => {
		setStartDate(date);
		if (endDate && date && isBefore(endDate, date)) {
			setEndDate(undefined); // reset end date if it's before new start date
		}
	};

	return (
		<div className="flex gap-6">
			<div className="flex-1 w-full">
				<p className="text-sm">Start:</p>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="gray">
							{startDate ? startDate.toLocaleDateString() : "Select Date"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className=" bg-white">
						<Calendar
							mode="single"
							selected={startDate}
							onSelect={handleStartDateSelect}
						/>
					</PopoverContent>
				</Popover>
			</div>

			<div className="flex-1">
				<p className="text-sm">End:</p>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="gray">
							{endDate ? endDate.toLocaleDateString() : "Select Date"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className=" bg-white">
						<Calendar
							mode="single"
							selected={endDate}
							onSelect={setEndDate}
							disabled={(date) =>
								startDate ? isBefore(date, startDate) : false
							}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default DatePicker;

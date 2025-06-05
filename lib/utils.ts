import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null | undefined) {
	if (!date) return "";
	const d = typeof date === "string" ? new Date(date) : date;
	return d.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}
export const getRelativeTime = (date: string | Date): string => {
	const now = new Date();
	const past = new Date(date);
	const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

	const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
		[60, "second"],
		[60, "minute"],
		[24, "hour"],
		[7, "day"],
		[4.34524, "week"], // 1 month = ~4.345 weeks
		[12, "month"],
		[Number.POSITIVE_INFINITY, "year"],
	];

	let value = seconds;
	let unit: Intl.RelativeTimeFormatUnit = "second";

	for (const [interval, nextUnit] of intervals) {
		unit = nextUnit;
		if (value < interval) break;
		value = value / interval;
	}

	return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
		-Math.floor(value),
		unit
	);
};

export function formatDateToInputValue(
	date: string | Date | undefined
): string {
	if (!date) return "";
	if (typeof date === "string") {
		return date.slice(0, 10);
	}
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export type PaymentCalculationResult = {
	agreementFeeValue: number;
	convenienceFee: number;
	totalPrice: number;
};

export function calculatePayment(
	serviceCost: number,
	paymentType: string,
	agreementFeePercent: number = 100
): PaymentCalculationResult {
	const feePercent = paymentType === "Fixed" ? 100 : agreementFeePercent;
	const agreementFeeValue = (serviceCost * feePercent) / 100;
	const convenienceFee = agreementFeeValue * 0.03;
	const totalPrice = agreementFeeValue + convenienceFee;

	return {
		agreementFeeValue,
		convenienceFee,
		totalPrice,
	};
}

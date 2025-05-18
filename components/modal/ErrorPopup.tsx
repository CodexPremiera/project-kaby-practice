import { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { BsExclamationTriangle } from "react-icons/bs";

const ErrorPopup = ({
	errorMessages,
	onClose,
}: {
	errorMessages: { [key: string]: string };
	onClose: () => void;
}) => {
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		if (Object.keys(errorMessages).length === 0) return;

		setProgress(100);

		const interval = setInterval(() => {
			setProgress((prev) => (prev > 0 ? prev - 0.5 : 0));
		}, 15);

		const timeout = setTimeout(() => {
			clearInterval(interval);
			onClose();
		}, 5000);

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, [errorMessages]);

	if (Object.keys(errorMessages).length === 0) return null;

	return (
		<div className="fixed top-0 left-0 w-full flex justify-center z-50 p-4">
			<div className="relative w-full max-w-xl">
				{/* Progress Bar */}
				<div className="h-3 bg-gray-300 rounded overflow-hidden">
					<div
						className="h-full bg-red-500 transition-all duration-75 ease-linear"
						style={{ width: `${progress}%` }}
					/>
				</div>
				<Alert
					variant="destructive"
					className="bg-white shadow-lg rounded-b-lg "
				>
					<AlertDescription className="mt-2">
						<div className="flex items-center">
							<BsExclamationTriangle className="h-5 w-5 text-red-500 mr-2" />
							<AlertTitle className="text-red-600">Form Errors</AlertTitle>
						</div>
						<div className="text-red-500">
							<ul className="list-disc list-inside space-y-1 text-sm">
								{Object.values(errorMessages).map((msg, idx) => (
									<li key={idx}>{msg}</li>
								))}
							</ul>
						</div>
					</AlertDescription>
				</Alert>
			</div>
		</div>
	);
};

export default ErrorPopup;

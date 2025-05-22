import { Button } from "@/components/ui/button";

interface Profile {
	id: string;
	name: string;
	address: string;
	image: string;
}

interface ReportSheetProps {
	profile: Profile;
	onClose?: () => void;
}

interface Message {
	sender: string;
	text: string;
}

const dummyReports: Message[] = [
	{
		sender: "Alex Carter",
		text: "Client failed to deliver the final photos as agreed.",
	},
	{
		sender: "Morgan Lee",
		text: "Delivery was delayed by two weeks without notice.",
	},
	{
		sender: "Sienna Blake",
		text: "Received incomplete photo set, missing key event moments.",
	},
	{
		sender: "Riley Quinn",
		text: "Final images were of poor quality, not matching the preview.",
	},
	{
		sender: "Jordan Avery",
		text: "Package promised 50 edited shots, only 30 were delivered.",
	},
];

const ReportSheet: React.FC<ReportSheetProps> = ({ profile, onClose }) => {
	return (
		<div className="flex flex-col w-full">
			{/* Header */}
			<div className="flex bg-gray-200 justify-between items-center py-2">
				<div className="font-semibold px-4">{profile.name}</div>
				<div className="px-2">
					<Button
						variant="default"
						size="sm"
						className="rounded-full"
						onClick={onClose}
					>
						✕
					</Button>
				</div>
			</div>

			<div className="p-4">
				{/* Report Cases Section */}
				<div className="flex flex-col h-[420px] border border-gray-300 rounded-lg overflow-hidden ">
					<div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-700">
						Report Cases
					</div>

					{/* Message List */}
					<div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 text-sm">
						{dummyReports.length === 0 ? (
							<p className="text-gray-500 text-center mt-10">
								No reports found for this user.
							</p>
						) : (
							dummyReports.map((msg, idx) => (
								<div
									key={idx}
									className="px-3 py-2 bg-white border border-gray-200 rounded-lg max-w-[85%]"
								>
									<div className="text-xs font-semibold text-gray-600 mb-1">
										{msg.sender}
									</div>
									<p className="whitespace-pre-wrap">{msg.text}</p>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReportSheet;

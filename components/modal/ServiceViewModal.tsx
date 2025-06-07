// "use client";

// import React from "react";
// import { Dialog } from "@headlessui/react";
// import { X } from "lucide-react";
// import { getPublicUrl } from "@/utils/supabase/storage";

// interface ServiceViewModalProps {
// 	setShowModal: (show: boolean) => void;
// 	service: {
// 		title: string;
// 		description: string;
// 		image: string;
// 	};
// }

// export default function ServiceViewModal({
// 	setShowModal,
// 	service,
// }: ServiceViewModalProps) {
// 	return (
// 		<Dialog
// 			open={true}
// 			onClose={() => setShowModal(false)}
// 			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
// 		>
// 			<Dialog.Panel className="relative w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
// 				<button
// 					onClick={() => setShowModal(false)}
// 					className="absolute top-4 right-4 text-gray-400 hover:text-black"
// 				>
// 					<X className="w-5 h-5" />
// 				</button>

// 				<div className="flex flex-col gap-4">
// 					<h2 className="text-xl font-bold">{service.title}</h2>
// 					<img
// 						src={
//                                                 service.image
//                                                     ? getPublicUrl(service.image, "services-pictures")
//                                                     : "/default-image.jpg"
//                                             }
// 						alt={service.title}
// 						className="rounded-lg object-cover h-40 w-full"
// 					/>
// 					<p className="text-sm text-gray-700">{service.description}</p>
// 				</div>
// 			</Dialog.Panel>
// 		</Dialog>
// 	);
// }
"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { getPublicUrl } from "@/utils/supabase/storage";
import React from "react";

interface ServicePreviewPopoverProps {
	service: {
		title: string;
		description: string;
		image: string;
	};
}

export default function ServicePreviewPopover({ service}: ServicePreviewPopoverProps) {
	return (
		<Popover className="relative">
			<PopoverButton as="div" className="w-full h-full">
				{/* {children} */}
			</PopoverButton>

			<PopoverPanel
				static
                // className="fixed inset-0 z-50 flex items-center justify-center"
				className="absolute z-50 top-full left-1/2 mt-2 -translate-x-1/2 w-80 p-4 bg-white rounded-xl shadow-lg border border-gray-200"
			>
				<h3 className="text-lg font-bold">{service.title}</h3>
				<img
					src={
						service.image
							? getPublicUrl(service.image, "services-pictures")
							: "/default-image.jpg"
					}
					alt={service.title}
					className="mt-2 rounded-md object-cover h-32 w-full"
				/>
				<p className="text-sm text-gray-700 mt-2">{service.description}</p>
			</PopoverPanel>
		</Popover>
	);
}

interface GCashModalProps {
	handleFakeSuccess: () => void;
	setShowModal: (show: boolean) => void;
	service: {
		service_id: string;
		title: string;
		service_cost: number;
        agreement_fee : number;
        convenience_fee: number;
	};
}

export default function GCashModal({
	handleFakeSuccess,
	setShowModal,
	service,
}: GCashModalProps) {
	return (
		<div className="fixed inset-0 flex items-center justify-center ">
			<div className="bg-blue-500 p-6 rounded-xl text-center max-w-sm w-full shadow-xl border border-blue-700 text-white">
				<h2 className="text-lg font-bold mb-2">GCash Payment</h2>
				
                <p className="text-black mb-2">
                    You are paying for <span className="font-bold">{service.title}</span> 
                </p>
            	<p className="text-sm mb-4 text-white">Scan this QR code to  pay of ₱{service.agreement_fee + service.convenience_fee}</p>

				<img
					src="https://cdn.shopify.com/s/files/1/0493/3877/7794/files/IMG_3300_600x600.jpg?v=1638497918"
					alt="GCash QR Code"
					className="w-48 h-48 mx-auto object-contain border border-blue rounded mb-4"
				/>
            	<p className="text-sm mb-4 text-black">Agreement Fee:  <span className="font-bold">₱{service.agreement_fee}</span> </p>
            	<p className="text-sm mb-4 text-black">Convenience Fee:  <span className="font-bold">₱{service.convenience_fee}</span> </p>
            	<p className="text-sm mb-4 text-black">Total Fee:  <span className="font-bold">₱{service.agreement_fee + service.convenience_fee}</span> </p>

				<div className="space-x-4">
					<button
						onClick={handleFakeSuccess}
						className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100"
					>
						Pay
					</button>
					<button
						onClick={() => setShowModal(false)}
						className="text-white hover:text-red-300"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

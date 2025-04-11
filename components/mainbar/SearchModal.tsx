import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";

const SearchModal = () => {
	return (
		<div className="fixed z-30 inset-0 bg-black/80 overflow-y-auto h-full w-full flex items-center justify-center">
			<div className="p-8 w-lg rounded-md card-shadow-custom bg-white">
				<div className="text-center">
					<div className="mt-2 py-3">
						<form className="flex flex-col flex-grow">
							<div className="flex items-center mt-2 mb-4 w-full px-2 pt-3 pb-3 border border-gray-300 rounded-md">
								<div className="ml-2 mr-4">
									<RiSearch2Line className="text-gray-500" />
								</div>
								<input
									type="text"
									name=""
									placeholder="Search for services"
									required
									className="w-full bg-transparent focus:outline-none focus:ring-0"
								/>
							</div>
							<div className="mt-auto flex justify-center pt-6">
								<Link href="/search" passHref>
									<button
										type="submit"
										className="w-[300px] py-2 text-white bg-gray rounded-md hover:bg-black"
									>
										Submit
									</button>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchModal;

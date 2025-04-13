import { RiArrowLeftLine } from "react-icons/ri";

const BackTopSection = ({ title }: { title: string }) => (
	<div className="fixed w-full sm:w-[95%] bg-white border-b border-gray-200 p-4 flex justify-between items-center">
		<div className="flex items-center gap-2 mx-3">
			<RiArrowLeftLine />
			<h2 className="h5 mx-3">{title}</h2>
		</div>
	</div>
);

export default BackTopSection;

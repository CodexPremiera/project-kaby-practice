import { BsFillEyeFill, BsFillHandThumbsUpFill } from "react-icons/bs";

const PostActions = ({ likes, views }: { likes: number; views: number }) => (
	<div className="flex justify-between text-secondary mt-3 px-1 w-full">
		<div className="flex items-center space-x-2 hover:text-secondary cursor-pointer transition">
			<BsFillHandThumbsUpFill />
			<span>{likes}</span>
		</div>
		<div className="flex items-center space-x-2 hover:text-secondary cursor-pointer transition">
			<BsFillEyeFill />
			<span>{views}</span>
		</div>
	</div>
);

export default PostActions;
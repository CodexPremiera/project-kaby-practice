import React from "react";
import OfficialItem from "@/components/home/official_list/OfficialItem";
import { officials } from "@/data/officials";

const OfficialsList = () => {
	return (
		<div id="officials" className="flex flex-col p-2 gap-2">
			{officials.map((official, index) => (
				<OfficialItem
					key={index}
					name={official.name}
					email={official.email}
					position={official.position}
					startTerm={official.startTerm}
					endTerm={official.endTerm}
					imageUrl={official.imageUrl}
				/>
			))}
		</div>
	);
};

export default OfficialsList;
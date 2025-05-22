import React from "react";
import OfficialItem from "@/components/home/official_list/OfficialItem";
import { officials } from "@/data/officials";
import  { useEffect, useState } from "react";
import { useBarangayContext } from "@/app/context/BarangayContext";

type Worker = {
  id: string;
  first_name:string;
  last_name:string;
  position: string;
  date_started: string;
  date_ended: string;
  profile_pic: string; // Add this only if available in your API
};

const OfficialsList = () => {
	const [workers, setWorkers] =  useState<Worker[] | null>(null);
	const [loading, setLoading] = useState(true);
	// const {barangayId} = useBarangayContext();
	const barangayContext = useBarangayContext();
  	const barangayId = barangayContext?.barangayId ?? null;
  	const barangayProfilePic = barangayContext?.barangayProfilePic ?? null;

	useEffect(()=>{
		const fetchWorkers = async() =>{
			try{
				const res = await fetch(`/api/features/home/officials/${barangayId}`,  { method: "GET", cache: "no-store" });
				const data = await res.json();
				console.log(data.data);
				setWorkers(data.data);
			} catch(error){
				console.log(error);
			} finally{
				setLoading(false);
			}
		}
		if(barangayId)fetchWorkers();
	},[]);
	
	if (loading) return <div>Loading...</div>;
	if (!workers || workers.length === 0) return <div>No officials found.</div>;


	return (
		<div id="officials" className="flex flex-col p-2 gap-2">
			{workers.map((official: Worker, index: number) => (
				<OfficialItem
					key={index}
					name= {`${official.last_name} ${official.first_name}`}
					// email={official.email}
					position={official.position}
					startTerm={official.date_started}
					endTerm={official.date_ended}
					imageUrl={official.profile_pic}
				/>
			))}
		</div>
	);
};


export default OfficialsList;
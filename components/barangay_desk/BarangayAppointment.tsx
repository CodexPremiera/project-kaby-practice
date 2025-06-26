"use client";

import { useState , useEffect} from "react";
import { RiMessage2Line, RiSearch2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import CreateAccount from "./CreateAccount";

type Appointment = {
	id: number;
	barangay_name: string;
	barangay: string;
	email: string;
	city: string;
	region: string;  
	status: string;
	message?: string;
};

type Location = {
  id: string;
  name: string;
  region_id?:string;
};

type Props = {
	appointments: Appointment[];
  cities: Location[];
  regions: Location[];
};

const BarangayAppointment = ({ appointments }: Props) => {
	const supabase = createClient();

	const [regions, setRegions] = useState<Location[]>([]);
	const [cities, setCities] = useState<Location[]>([]);
	const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

	
	// Fetch regions and cities on mount
	useEffect(() => {
		async function fetchLocations() {
		const { data: regionsData, error: regionsError } = await supabase
			.from("regions")
			.select("id, name");
		if (regionsError) {
			console.error("Error fetching regions:", regionsError);
		} else {
			setRegions(regionsData || []);
		}

		const { data: citiesData, error: citiesError } = await supabase
			.from("cities")
			.select("id, name, region_id");
		if (citiesError) {
			console.error("Error fetching cities:", citiesError);
		} else {
			setCities(citiesData || []);
		}
		}

		fetchLocations();
	}, [supabase]);
	
	const [showCreateAccount, setShowCreateAccount] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRegion, setSelectedRegion] = useState("");
	const [selectedCity, setSelectedCity] = useState("");

	const pendingApps = appointments.filter(
		(appointment) => appointment.status === "Pending"
	);

	const [statuses, setStatuses] = useState<string[]>(
		pendingApps.map((appointment) => appointment.status || "Pending")
	);

	const [selectedItems, setSelectedItems] = useState<number[]>([]);

	const getRegionName = (id: string) => {
		return regions.find((r) => r.id === id)?.name || id;
	};

	const getCityName = (id: string) => {
		return cities.find((c) => c.id === id)?.name || id;
	};

	const filteredClients = pendingApps
		.filter((app) =>
			selectedRegion ? app.region === selectedRegion : true
		)
		.filter((app) => (selectedCity ? app.city === selectedCity : true))
		.filter((app) =>
			app.barangay_name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.map((appointment, index) => ({
			...appointment,
			status: statuses[index] || appointment.status,
			city_name: getCityName(appointment.city),
			region_name: getRegionName(appointment.region),
			index,
		}));

	const handleStatusChange = (index: number, newStatus: string) => {
		const updatedStatuses = [...statuses];
		updatedStatuses[index] = newStatus;
		setStatuses(updatedStatuses);
	};

	const handleSubmit = async (index: number) => {
		const appointmentId = filteredClients[index].id;
		const updatedStatus = statuses[index];
		const email = filteredClients[index].email;

		try {
			const res = await fetch("/api/admin/appointment", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: appointmentId, status: updatedStatus }),
			});
			if (!res.ok) {
				throw new Error("Failed to update appointment status");
			}
			if (updatedStatus === "Approved") {
				setSelectedAppointment(filteredClients[index]);
				setShowCreateAccount(true);
			} else {
				setShowCreateAccount(false);
			}
		} catch (err) {
			console.error("error ", err);
		}
	};

	const toggleSelection = (index: number) => {
		setSelectedItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	return (
		<div className="flex flex-col gap-6 p-6 bg-white rounded-[10px] mt-4">
			{/* Filters */}
			<div className="flex flex-wrap items-center gap-4">
				<div className="flex items-center w-full sm:w-[350px] px-4 border border-gray-300 bg-white rounded-lg">
					<RiSearch2Line className="text-gray-500 mr-2" />
					<input
						type="text"
						placeholder="Search by barangay name"
						className="w-full focus:outline-none text-sm h-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<select
					value={selectedRegion}
					onChange={(e) => setSelectedRegion(e.target.value)}
					className="px-3 py-2 border border-gray-300 rounded-md"
				>
					<option value="">All Regions</option>
					{regions.map((region) => (
						<option key={region.id} value={region.id}>
							{region.name}
						</option>
					))}
				</select>

				<select
					value={selectedCity}
					onChange={(e) => setSelectedCity(e.target.value)}
					className="px-3 py-2 border border-gray-300 rounded-md"
					disabled={!selectedRegion}
				>
					<option value="">All Cities</option>
					{cities
						.filter((city) => city.region_id === selectedRegion) 
						.map((city) => (
							<option key={city.id} value={city.id}>
								{city.name}
							</option>
						))}
				</select>
				 {/* <Button variant="default" size="sm">
                                                Submit
                                        </Button>
                                        <Button
                                                variant="outline"
                                                className="w-full sm:w-auto border border-gray-200"
                                                onClick={() => setShowCreateAccount(true)}
                                        >
                                                + Create Account
                                        </Button> */}
			</div>

			<div className="overflow-x-auto rounded-lg border border-gray-200">
				<Table className="table-fixed w-full">
					<TableHeader>
						<TableRow className="bg-gray/30 border-none">
							<TableHead className="w-[40px] px-4">
								<input
									type="checkbox"
									checked={
										selectedItems.length === filteredClients.length &&
										filteredClients.length > 0
									}
									onChange={() =>
										selectedItems.length === filteredClients.length
											? setSelectedItems([])
											: setSelectedItems(filteredClients.map((c) => c.index))
									}
								/>
							</TableHead>
							<TableHead className="w-[100px]">Barangay</TableHead>
							<TableHead className="w-[100px]">Email</TableHead>
							<TableHead className="w-[100px]">City</TableHead>
							<TableHead className="w-[100px]">Region</TableHead>
							<TableHead className="w-[50px]">Message</TableHead>
							<TableHead className="w-[50px]">Status</TableHead>
							<TableHead className="w-[50px]">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredClients.map((appointment) => (
							<TableRow
								key={appointment.index}
								className="hover:bg-gray-50 border-gray-200"
							>
								<TableCell className="w-[40px] px-4">
									<input
										type="checkbox"
										checked={selectedItems.includes(appointment.index)}
										onChange={() => toggleSelection(appointment.index)}
										className="outline-none"
									/>
								</TableCell>
								<TableCell className="w-[100px]">
									{appointment.barangay_name}
								</TableCell>
								<TableCell className="w-[100px]">{appointment.email}</TableCell>
								<TableCell className="w-[100px]">
									{getCityName(appointment.city)}
								</TableCell>
								<TableCell className="w-[100px]">
									{getRegionName(appointment.region)}
								</TableCell>
								<TableCell className="w-[50px]">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="gray"
												size="icon"
												className="rounded-full"
											>
												<RiMessage2Line className="text-gray-600" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-64 p-4 bg-white shadow-md rounded-lg">
											<p className="text-sm text-gray-700 mb-2">
												Message from {appointment.barangay_name}
											</p>
											<div className="border border-gray-300 rounded-md p-2 text-sm text-gray-800 bg-gray-50">
												{appointment.message || "No message received."}
											</div>
										</PopoverContent>
									</Popover>
								</TableCell>
								<TableCell className="w-[50px]">
									<select
										value={appointment.status}
										onChange={(e) =>
											handleStatusChange(appointment.index, e.target.value)
										}
										className="w-full px-1 py-1 text-sm border border-gray-300 rounded-md bg-white"
									>
										<option value="Pending">Pending</option>
										<option value="Approved">Approved</option>
										<option value="Rejected">Rejected</option>
									</select>
								</TableCell>
								<TableCell className="w-[50px] flex gap-2 py-12">
									<Button
										variant="default"
										size="sm"
										onClick={() => handleSubmit(appointment.index)}
									>
										Submit
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Modal */}
			{showCreateAccount && (
				<CreateAccount onClose={() => setShowCreateAccount(false) } appointment={selectedAppointment}/>
			)}
		</div>
	);
};

export default BarangayAppointment;

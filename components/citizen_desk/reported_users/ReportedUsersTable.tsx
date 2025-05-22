import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import Image from "next/image";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import {File as FileIcon} from 'lucide-react'
import {white} from "next/dist/lib/picocolors";


function ReportedUsersTable({
                              filteredClients,
                              selectedItems,
                              toggleSelection,
                              setActiveClient,
                              setSelectedItems,
                              handleStatusChange,
                              statuses
                            }) {
  const router = useRouter();

  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow className="border-b border-light-color text-sm">
          <TableHead className="w-[20px] pt-1 pb-5">
            <input
              type="checkbox"
              className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
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
          <TableHead className="w-[150px] text-secondary text-sm pt-1 pb-5">Citizen</TableHead>
          <TableHead className="w-[120px] text-secondary text-sm pt-1 pb-5">Service</TableHead>
          <TableHead className="w-[48px] text-secondary text-sm pt-1 pb-5">Reports</TableHead>
          <TableHead className="w-[72px] text-secondary text-sm pt-1 pb-5">Status</TableHead>
          <TableHead className="w-[44px] text-secondary text-sm pt-1 pb-5">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredClients.map((profile) => (
          <TableRow
            key={profile.index}
            className="overflow-hidden hover:bg-gray-50 border-light-color h-18"
          >
            <TableCell className="overflow-hidden">
              <input
                type="checkbox"
                className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
                checked={selectedItems.includes(profile.index)}
                onChange={() => toggleSelection(profile.index)}
              />
            </TableCell>

            <TableCell className="overflow-hidden">
              <button className="flex items-center gap-3 w-[18.75rem]"
                      onClick={() => router.push(`/services/${profile.id}`)}>
                <Image
                  /*src={profile.image}*/
                  src={"/assets/img/service-img.png"}
                  alt={`${profile.name}'s Avatar`}
                  width={36}
                  height={36}
                  className="object-cover w-10 h-10 rounded-full"
                />
                <div className="user_name flex flex-col justify-center items-start p-1 h-9">
                  <div className="text-primary font-semibold text-md">{profile.name}</div>
                  <div className="text-secondary text-sm">{profile.address}</div>
                </div>
              </button>
            </TableCell>

            <TableCell className="overflow-hidden">Mangrove Tree Planting</TableCell>

            <TableCell className="items-center justify-center h-18">
              <ButtonClear
                onClick={() => setActiveClient(profile)}
                className="">
                <FileIcon size={16} strokeWidth={2} />
              </ButtonClear>
            </TableCell>

            <TableCell className="items-center justify-center h-18">
              <select
                value={statuses[profile.index]}
                onChange={(e) =>
                  handleStatusChange(profile.index, e.target.value)
                }
                className="px-1 py-1 w-fit"
              >
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </TableCell>

            <TableCell className="items-center justify-center h-18">
              <ButtonSecondary className="!p-3 !text-sm">Submit</ButtonSecondary>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ReportedUsersTable;
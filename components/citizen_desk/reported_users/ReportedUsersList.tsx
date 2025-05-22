import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import Image from "next/image";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import {File as FileIcon} from 'lucide-react'
import {white} from "next/dist/lib/picocolors";
import {format} from "date-fns";


function ReportedUsersTable({
                              filteredClients,
                              selectedItems,
                              toggleSelection,
                              setActiveClient,
                              setSelectedItems,
                            }) {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="flex w-full border-b border-light-color pb-6 gap-4 items-center">
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
        <span>Select all items</span>
      </div>

      <div className="flex flex-col">
        {filteredClients.map((profile) => (
          <div
            key={profile.index}
            className="flex w-full hover:bg-gray-50 border-b border-light-color py-5 justify-between"
          >
            <button className="flex w-fit gap-2 sm:gap-3"
                    onClick={() => router.push(`/services/${profile.id}`)}>
              <div className="h-full w-fit py-3 pr-1 sm:pr-6">
                <input
                  type="checkbox"
                  className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
                  checked={selectedItems.includes(profile.index)}
                  onChange={() => toggleSelection(profile.index)}
                />
              </div>

              <div className="p-1">
                <Image
                  /*src={profile.image}*/
                  src={"/assets/img/service-img.png"}
                  alt={`${profile.name}'s Avatar`}
                  width={36}
                  height={36}
                  className="object-cover w-10 h-10 rounded-full"
                />
              </div>

              <div className="user_name flex flex-col justify-center items-start h-fit gap-1/2">
                <span className="text-primary font-semibold text-base sm:text-md">
                  {profile.name}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-secondary text-sm leading-[1.4] font-medium">Mangrove Tree Planting</span>
                  <span className="text-secondary text-sm leading-[1.2] font-medium">
                    {profile.address}
                  </span>
                </div>
              </div>
            </button>

            <div className="flex items-center justify-center h-18">
              <ButtonClear
                onClick={() => setActiveClient(profile)}
                className="">
                <FileIcon size={16} strokeWidth={2}/>
              </ButtonClear>
            </div>

            {/*<TableCell className="items-center justify-center h-18">

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
            </TableCell>*/}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportedUsersTable;
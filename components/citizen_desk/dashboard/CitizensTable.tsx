import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import {format} from "date-fns";
import ProfileTag from "@/components/profile/ProfileTag";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import Image from "next/image";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import {EllipsisVertical as MoreIcon} from "lucide-react";


function CitizensTable({
                              filteredClients,
                              selectedItems,
                              toggleSelection,
                              handleSelectAll,
                              actionButtons,
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
              onChange={handleSelectAll}
            />
          </TableHead>
          <TableHead className="w-[200px] text-secondary text-sm pt-1 pb-5">Citizen</TableHead>
          <TableHead className="w-[100px] text-secondary text-sm pt-1 pb-5">Date admitted</TableHead>
          <TableHead className="w-[24px] text-secondary text-sm pt-1 pb-5"/>
        </TableRow>
      </TableHeader>

      <TableBody className="">
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
            <TableCell className="overflow-hidden">
              {format(profile.date, "MMMM dd, yyyy")}
            </TableCell>

            <TableCell className="flex items-center justify-center h-18">
              {actionButtons}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CitizensTable;
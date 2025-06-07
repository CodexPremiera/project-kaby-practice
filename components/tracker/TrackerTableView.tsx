import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import {MessageCircleMore as MessageIcon} from "lucide-react";
import {getPublicUrl} from "@/utils/supabase/storage";
import {ServiceRequest} from "@/lib/clients/RequestServiceClient";
import Link from "next/link";

interface customerRequest extends ServiceRequest {
  index: number;
}

interface Props {
  requests : customerRequest[],
  selectedItems,
  setSelectedItems,
  toggleSelection,
  openRequestSheet,
}

function TrackerTableView({
                        requests,
                        selectedItems,
                        setSelectedItems,
                        toggleSelection,
                        openRequestSheet,
                      } : Props) {
  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow className="border-b border-light-color text-sm">
          <TableHead className="w-[30px] pt-1 pb-5">
            <input
              type="checkbox"
              className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
              checked={
                selectedItems.length === requests.length &&
                requests.length > 0
              }
              onChange={() =>
                selectedItems.length === requests.length
                  ? setSelectedItems([])
                  : setSelectedItems(requests.map((c) => c.id))
              }
            />
          </TableHead>
          <TableHead className="w-[200px] text-secondary text-sm pt-1 pb-5">Service</TableHead>
          <TableHead className="w-[100px] text-secondary text-sm pt-1 pb-5">Schedule</TableHead>
          <TableHead className="w-[80px] text-secondary text-sm pt-1 pb-5">Payment</TableHead>
          <TableHead className="w-[50px] text-secondary text-sm pt-1 pb-5">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="border-b border-light-color">
        {requests.map((request) => (
          <TableRow
            key={request.id}
            className="hover:bg-gray-50 border-light-color h-18"
          >
            <TableCell>
              <input
                type="checkbox"
                className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
                checked={selectedItems.includes(request.id)}
                onChange={() => toggleSelection(request.id)}
              />
            </TableCell>

            <TableCell>
              <Link className="flex items-center gap-3 w-[18.75rem]"
                    href={`/services/${request.service_id}/payment`} target={'_blank'}>
                <Image
                  src={
                    request.service_photo
                      ? getPublicUrl(request.service_photo, "services-pictures")
                      : "/default-image.jpg"
                  }
                  alt={`${request.service_title}'s Avatar`}
                  width={36}
                  height={36}
                  className="object-cover w-10 h-10 rounded-full"
                />
                <div className="user_name flex flex-col justify-center items-start p-1 h-9">
                  <div className="text-primary font-semibold text-md">{request.service_title}</div>
                  <div className="text-secondary text-sm">{request.owner_name}</div>
                </div>
              </Link>
            </TableCell>

            <TableCell>Apr 23, 2025</TableCell>
            <TableCell>Pending</TableCell>

            <TableCell>
              <ButtonClear onClick={() => openRequestSheet(request)}>
                <MessageIcon strokeWidth={2} className="w-6 p-0"/>
              </ButtonClear>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TrackerTableView;
import React from "react";
import Image from "next/image";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import {MessageCircleMore as MessageIcon} from "lucide-react";
import {ServiceRequest} from "@/lib/clients/RequestServiceClient";
import {getPublicUrl} from "@/utils/supabase/storage";
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

function TrackerListView({
                        requests,
                        selectedItems,
                        setSelectedItems,
                        toggleSelection,
                        openRequestSheet,
                      } : Props) {
  return (
    <div className="table-fixed w-full">
      <div className="flex w-full border-b border-light-color pb-6 gap-4 items-center">
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
        <span>Select all items</span>
      </div>


      <div className="flex flex-col">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex w-full hover:bg-gray-50 border-b border-light-color py-5 justify-between"
          >

            <div className="flex w-[18.75rem] gap-2 sm:gap-3">
              <div className="h-full w-fit py-3 pr-1 sm:pr-6">
                <input
                  type="checkbox"
                  className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
                  checked={selectedItems.includes(request.id)}
                  onChange={() => toggleSelection(request.id)}
                />
              </div>

              <div className="p-1">
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
              </div>

              <div className="user_name flex flex-col justify-center items-start h-fit">
                <span className="text-primary font-semibold text-base sm:text-md">{request.service_title}</span>
                <div className="flex flex-col gap-0">
                  <span className="text-secondary text-sm leading-[1.2] font-medium">{request.owner_name}</span>
                  <span className="text-secondary text-sm leading-[1.2] font-medium">
                    Last month • Pending
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <ButtonClear onClick={() => openRequestSheet(request)}>
                <MessageIcon strokeWidth={2} className="w-6 p-0" />
              </ButtonClear>
              {request.is_paid ? (
                <div className="button-secondary background-3 text-secondary opacity-80">
                  Pay
                </div>
              ) : (
                <Link
                  href={`/tracker/${request?.id}/payment`}
                  className="button-secondary">
                  Pay
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackerListView;
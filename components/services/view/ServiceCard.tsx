"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Crown as BadgeIcon } from "lucide-react";
import { getPublicUrl } from "@/utils/supabase/storage";
import { createClient } from "@/utils/supabase/client";
import ErrorModal from "@/components/modal/ErrorModal";

interface Service {
  id: string;
  title: string;
  owner: string;
  type: string;
  image: string;
  display_badge?: boolean;
  status?: string;
}

interface ServiceCardProps {
  service: Service;
  onSelect?: (id: string) => void;
  routePrefix?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  routePrefix,
}) => {
  const router = useRouter();
  const supabase = createClient();
  const [modalType, setModalType] = useState<"error" | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleClick = () => {
    if (!user) {
      setModalType("error"); // ✅ Set modal to show
      return;
    }

    if (onSelect) {
      onSelect(service.id);
    } else if (routePrefix) {
      const path = routePrefix.includes(":id")
        ? routePrefix.replace(":id", service.id)
        : `${routePrefix}/${service.id}`;
      router.push(path);
    } else {
      router.push(`/services/${service.id}`);
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
        className={`flex flex-col border border-light-color w-full cursor-pointer transition-opacity duration-300 rounded-xl background-1 ${
          service.status === "Closed" ? "opacity-50" : ""
        } hover:shadow-md`}
      >
        <div className="relative w-full h-[140px] sm:h-[180px] md:h-[160px] lg:h-[144px] xl:h-[180px] overflow-hidden rounded-t-[10px]">
          <Image
            src={
              service.image
                ? getPublicUrl(service.image, "services-pictures")
                : "/default-image.jpg"
            }
            alt={`${service.title} image`}
            fill
            className="object-cover"
          />
          {service.display_badge && (
            <span className="absolute top-2 right-2 bg-accent rounded-full p-1.5">
              <BadgeIcon size={16} color="white" fill="white" />
            </span>
          )}
        </div>
        <div className="px-6 pt-3 pb-5">
          <p className="font-semibold">{service.title}</p>
          <p className="flex gap-1 text-secondary">
            <span>{service.owner}</span>
            <span>•</span>
            <span>{service.type}</span>
          </p>
        </div>
      </div>

      {modalType === "error" && (
        <ErrorModal
          title="Login Required"
          content="You need to login to view this service."
          onClose={() => setModalType(null)} // ✅ Close modal on user action
        />
      )}
    </>
  );
};

export default ServiceCard;

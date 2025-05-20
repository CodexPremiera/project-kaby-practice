import React from 'react';
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import {Contact} from "@/data/contacts";

function ContactItem({
                        label,
                        value,
                      }: Contact ) {
  return (
    <div className="flex justify-between items-start self-stretch py-3 px-6 rounded-xl bg-white">
      <div className="flex items-center gap-2.5 self-stretch w-80 text-primary font-medium">
        {label}
      </div>
      <div className="flex items-center gap-2.5 self-stretch w-40 text-primary font-medium">
        {value}
      </div>
      <ButtonSecondary className="text-sm">Call</ButtonSecondary>
    </div>
  );
}

export default ContactItem;

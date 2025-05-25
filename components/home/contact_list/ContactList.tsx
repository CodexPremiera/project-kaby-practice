import React from 'react'
import {contacts} from "@/data/contacts";
import ContactItem from "@/components/home/contact_list/ContactItem";
import { useBarangayContext } from "@/app/context/BarangayContext";
import { useUser } from "@/app/context/UserContext";
import  { useEffect, useState } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import AddContactModal from "@/components/modal/AddContactModal";
import { useCitizenContext } from '@/app/context/CitizenContext';

type Contacts = {
  name:string;
  number:string;
}
const ContactList = () => {

  const {role} = useUser();
  
  let {access_role} = useCitizenContext();

  const {barangayId} = useBarangayContext();
  const [loading, setLoading] = useState(true);
  console.log("this zzz",access_role);
  const [contacts,setContacts] = useState<Contacts[] | null> (null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/features/home/contacts/${barangayId}`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      console.log(data.data);
      setContacts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
      if(barangayId)fetchContacts();
    },[]);


    if (loading) return <div>Loading Contacts...</div>;
    if (!contacts || contacts.length === 0) return <div>No contacts found.</div>;
    
  return (
    <div id="contacts" className="flex flex-col p-2 gap-2">
      <div className="flex justify-between items-start self-stretch py-3 px-6 rounded-xl bg-white">
        <div className="flex items-center gap-2.5 self-stretch w-80 text-primary font-medium">
          Contact Name
        </div>
        <div className="flex items-center gap-2.5 self-stretch w-40 text-primary font-medium">
          Contact Number
        </div>
        {(role === "barangay" || (role === "citizen" && access_role === "Chief Operator")) ? (
          <ButtonSecondary className="text-sm" onClick={handleOpenModal}>+</ButtonSecondary>
        ) : (
          <span className="text-sm text-primary font-medium">Call</span>
        )}

      </div>

      {contacts.map((contact, index) => (
        <ContactItem key={index} label={contact.name} value={contact.number} />
      ))}
       {showModal && <AddContactModal  onClose={handleCloseModal} barangayId={barangayId} onContactAdded={fetchContacts} />}

    </div>
  );
}

export default ContactList
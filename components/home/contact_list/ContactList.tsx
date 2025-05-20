import React from 'react'
import {contacts} from "@/data/contacts";
import ContactItem from "@/components/home/contact_list/ContactItem";

const ContactList = () => {
  return (
    <div id="contacts" className="flex flex-col p-2 gap-2">
      {contacts.map((contact, index) => (
        <ContactItem
          key={index}
          label={contact.label}
          value={contact.value}
        />
      ))}
    </div>
  )
}

export default ContactList
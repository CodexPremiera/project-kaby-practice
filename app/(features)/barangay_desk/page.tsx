'use client'

import BarangayDeskClient from './BarangayDeskClient';


const res = await fetch(`/api/admin/appointment`);

const data = await res.json();

if (!res.ok) {
  throw new Error(data.message);
}

const appointmentData = data;

console.log("hello world")
console.log(appointmentData);
const BarangayDesk = ()  => {
	return <BarangayDeskClient appointments={appointmentData.data} />;


};

export default BarangayDesk;

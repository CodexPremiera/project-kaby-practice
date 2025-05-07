'use client'
// https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side
import { useEffect, useState } from "react";
export default function BarangayAcceptPage(){
    const [barangays, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        fetch('/api/admin/appointment')
        .then((res) => res.json())
        .then((data)=>{
            setData(data.data);
            setLoading(false);

        })
    },[]);
    if(isLoading) return <p>Loading...</p>
    if(!barangays) return <p>No appointments</p>
    return (
        <div>
            <h1>Barangay Appointments</h1>
            <ul>
                {barangays.map((barangay,index)=>(
                    <li key ={index}>
                        <p><strong>Barangay Name:</strong>{barangay.name}</p>
                        <p><strong>City:</strong> {barangay.city}</p>
                        <p><strong>Email:</strong> {barangay.email}</p>
                        <p><strong>Message:</strong> {barangay.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
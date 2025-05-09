'use client'
import * as React from 'react'
import { useEffect, useState } from 'react';

export default function BarangayPage({ params }) {
  // const { appointmentId } = params;
  const { appointmentId } = React.use(params)
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const res = await fetch(`/api/admin/appointment/${appointmentId}`);
        const data = await res.json();
        setAppointment(data);
        // console.log(appointment);
      } catch (error) {
        console.error("Failed to fetch appointment:", error);
      }
    }

    if (appointmentId) {

      fetchAppointment(); 
    }
  }, [appointmentId]);
  // Log the state when it updates
  useEffect(() => {
    // console.log('Current appointment:', appointment);
  }, [appointment]); // Logs when appointment state is updated

  if (!appointment) {
    return <p>Loading appointment details...</p>;
  }
  
  return (
    <div>
      <h1>Barangay Appointment Details</h1>
      <p><strong>ID:</strong> {appointment[0].id}</p>
      <p><strong>Email:</strong> {appointment[0].email}</p>
      <p><strong>Message:</strong> {appointment[0].message}</p>
    </div>
  );
}

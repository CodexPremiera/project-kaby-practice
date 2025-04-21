// https://www.geeksforgeeks.org/fetching-data-from-an-api-with-useeffect-and-usestate-hook/import { useState } from "react";
'use client'
import { useEffect, useState } from "react";
import * as React from 'react'

export default function ServicesPage({params}){
    const {profileId} = React.use(params);
    // const profileId = "2064a8b2-9a40-4ece-afa1-a9214e0d8b9f";
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(()=>{
        async function fetchAll()  {

            const[serviceRes, profileRes] = await Promise.all([
                fetch(`/api/service/${profileId}`).then(res => res.json()),
                fetch(`/api/profile/${profileId}`).then(res => res.json())
            ]);
            
            console.log("Service Response:", serviceRes);
            console.log("Profile Response:", profileRes);
            setServices(serviceRes);
            setProfile(profileRes);
            setLoading(false);
        }
        fetchAll();
    },[]);

    if(loading) return <p>Loading..</p>
    return (
        <div>
          <h2>Profile</h2>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
      
          <h2>Services</h2>
          {services.map((service) => (
            <div key={service.id}>
              <p>Title: {service.title}</p>
              <p>Location: {service.location}</p>
            </div>
          ))}
        </div>
      );
      
}
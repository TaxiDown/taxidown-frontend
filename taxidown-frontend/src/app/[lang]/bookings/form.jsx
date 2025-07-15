'use client'
import React, { useEffect, useState } from 'react'
import Ride from './ride';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from "next/navigation";

export default function BookingForm({pickup, destination}) {
    const router = useRouter();
    const [rides, setRides] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch(`/api/get_rides`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            if(response.ok){
                const data = await response.json();
                setRides(data);
            }else{
                router.push("/en/unauthorized");
            }
        }
        fetchData();
    },[])
  return (
    <>
    {Array.isArray(rides) && rides &&
        <div className='mb-20 w-full space-y-7'>
            {rides.map((ride, index) => (
                <Ride key={`ride ${ride.id}`} pickupText={pickup} destinationText={destination} pickup={ride.booking.pickup_location.name_location} destination={ride.booking.dropoff_location.name_location} date={ride.booking.datetime_pickup} time={'11:20'}/>
            ))}
        </div>
    }
    </>

  )
}


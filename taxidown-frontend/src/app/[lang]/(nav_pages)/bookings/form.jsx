'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Ride from './ride';
import NavbarStatic from './nav_static';

export default function BookingForm({pickup, destination, dict, lang, rideText}) {
    const router = useRouter();
    const [rides, setRides] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch(`/api/get_rides`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            if(response.status === 200 ){
                const data = await response.json();
                setRides(data);
            }else{
                router.push(`/${lang}/unauthorized`);
            }
        }
        fetchData();
    },[])
  return (
    <>
    {Array.isArray(rides) && rides &&
    <div className='flex justify-start items-center flex-col gap-9 bg-stone-100 h-max min-h-screen pt-26'>
        <NavbarStatic home={dict.home} contactUs={dict.contactUs} loginTitle={dict.loginTitle} bookingTitle={dict.bookingTitle} logoutTitle={dict.logoutTitle}  loggedIn={true} lang={lang}/>
        {/*<div className='flex gap-3 justify-center md:justify-start mx-15 text-white mt-22'>
            <button className='bg-black rounded-3xl px-6 py-2 w-25 min-w-max h-max shadow-lg hover:scale-105 hover:bg-black hover:text-white transition'>All</button>
            <button className='text-black border-2 rounded-3xl px-6 py-2 w-25 min-w-max h-max hover:scale-105 hover:text-white hover:bg-black transition'>Pending</button>
            <button className='text-black border-2 rounded-3xl px-6 py-2 w-25 min-w-max h-max hover:scale-105 hover:text-white hover:bg-black transition'>Upcoming</button>
        </div>*/}
    
        <div className='mb-20 w-full space-y-7'>
            {rides.map((ride) => (
                <Ride key={`ride ${ride.id}`} id= {ride.booking.id} pickupText={pickup} destinationText={destination} pickup={ride.booking.pickup_location} destination={ride.booking.dropoff_location} date={ride.booking.datetime_pickup.split("T")[0]} time={ride.booking.datetime_pickup.split("T")[1].replace("Z", "")} status={ride.booking.status} price={ride.price} ride={rideText}/>
            ))}
        </div>
    </div>
   }
    </>
  )
}


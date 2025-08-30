import React, { useState } from 'react'
import { MapPinIcon, BanknotesIcon, CheckCircleIcon, CheckBadgeIcon, ClockIcon} from '@heroicons/react/24/solid'
import {
    Clock,
    CalendarDaysIcon,
    MapPinX,
    XCircleIcon,
    LucideDollarSign, X
  } from "lucide-react";
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'; // For the three dots icon
import { useRouter } from 'next/navigation';


export default function Ride({pickupText, destinationText, pickup, destination, date, time, price, status, vehicle, id, ride}) {
  const [showCancel, setShowCancel] = useState(false);

  const [cancel, setCancel] = useState(false);
  const getStatusColor = () => {
    if (status === 'Completed') return 'text-black-600';
    if (status === 'Canceled') return 'text-red-600';
    if (status === 'Confirmed') return 'text-green-600';
    return 'text-yellow-600'; 
  };

  const getStatusIcon = () => {
    if (status === 'Completed') return <></>;
    if (status === 'Canceled') return <></>;
    if (status === 'Confirmed') return <CheckBadgeIcon className="w-4 h-5 text-green-600" />;
    return <ClockIcon className="w-4 h-5 text-yellow-600" />;
  };

  const cancelRide = async ()=>{
    const response = await fetch(`/api/cancel_booking`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({id: id}),
    })
    if(response.status === 200 ){
      setCancel(false);
      window.location.reload();
    }else{
        router.push("/en/unauthorized");
    }
  }
  return (
    <>
    {
      cancel &&
      <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center bg-black/50 h-full w-screen">
        <div className="relative bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full py-10 flex flex-col items-center justify-center gap-5">
        <button className='cursor-pointer absolute top-3 right-3' onClick={() => {setCancel(false);}}><X size={20}/></button>
          <h2 className="text-red-600 text-xl font-semibold mb-2 ">{ride.cancelConfirm}</h2>
          <button className='text-white bg-red-800 rounded-lg py-2 px-4 flex items-center gap-1 text-md cursor-pointer' onClick={()=>cancelRide()}>
            {ride.cancelRide}</button>
        </div>
      </div> 
    }
    <div className="flex flex-col sm:flex-row max-w-5xl mx-auto bg-white rounded-2xl shadow sm:p-10 p-2 py-5 border border-gray-200 w-[90%]  max-w-[90%]">
      <div className='flex max-w-5xl mx-auto bg-white rounded-2xl w-full sm:w-[90%]'>
      <div className="flex flex-col items-center w-24 relative">
        <div className="text-center mb-2">
        </div>

        <div className="w-3 h-3 rounded-full border-2 border-white z-10 bg-red-600" />

        <div className="w-px bg-gray-300 flex-1 relative my-1">
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 flex items-center text-sm text-gray-400">  
          </div>
        </div>
        <MapPinIcon className="w-5 h-5 rounded-full border-2 border-white z-10 text-red-500" />
      </div>

      <div className="flex-3/2 pl-6 space-y-2">
        <div>
          <p className="font-semibold">{pickupText}</p>
          <p className="text-sm text-gray-500">{pickup}</p>
        </div>
        <div className=" text-sm text-gray-500">
            <div className='flex flex-col sm:flex-row gap-3 text-sm items-left'>
                <div className='flex items-center'>
                    <CalendarDaysIcon size={16} className="mr-1 text-gray-600" />
                    <p>{date}</p>
                </div>
                <div className='flex items-center'>
                    <Clock size={16} className="mr-1 text-gray-600" />
                    <p>{time}</p>
                </div>
            </div>
        </div>
        {
          destination &&
          <div>
            <p className="font-semibold">{destinationText}</p>
            <p className="text-sm text-gray-500">{destination}</p>
          </div>
        }
      </div>

      </div>
      <div className='relative flex sm:flex-col justify-between items-center min-w-max px-7 mt-3 gap-3'>
      {
          status == "Pending" &&
          <div className="absolute top-0 right-0 sm:right-[-15] inline-block text-left m-0 sm:m-[-10px]">
          {/* Three dots icon */}
          <button
            onClick={() => setShowCancel(!showCancel)}
            className="text-gray-600 hover:text-black"
          >
            <EllipsisVerticalIcon className="w-6 h-6" />
          </button>
          

          {/* Cancel button shown conditionally */}
          {showCancel && (
            <div className="absolute mt-2 top-0 right-5 bg-white border border-black py-1 px-2 rounded-lg">
              <button
                className="text-red-600 rounded-lg flex items-center gap-1 text-lg cursor-pointer font-semibold"
                onClick={() => {
                  setCancel(true);
                  setShowCancel(false); 
                }}
              >
                <XCircleIcon className="w-4 h-4 text-red-600 font-semibold " />
                {ride.cancel || 'Cancel'}
              </button>
            </div>
          )}
        </div>
        }

        <div className='flex items-center gap-1'>
          {getStatusIcon()}
           <p className={`font-semibold text-[17px] ${getStatusColor()}`}>{status}</p>
        </div>
        
        
        <div className='flex items-center'>
            <LucideDollarSign size={25} className=" text-green-900 w-4" />
            {price ?
              <p>{price}</p>
            : <>
              <p>{ride.undetermined}</p>
              </>
            }
        </div>
      </div>

    </div>
    </>
  )
}

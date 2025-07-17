import React from 'react'
import { MapPinIcon, BanknotesIcon, CheckCircleIcon, CheckBadgeIcon, ClockIcon,} from '@heroicons/react/24/solid'
import {
    Clock,
    CalendarDaysIcon,
    MapPinX,
    XCircleIcon,
    LucideDollarSign
  } from "lucide-react";


export default function Ride({pickupText, destinationText, pickup, destination, date, time, price, status, vehicle}) {
  const getStatusColor = () => {
    if (status === 'Completed') return 'text-black-600';
    if (status === 'Canceled') return 'text-red-600';
    if (status === 'Confirmed') return 'text-green-600';
    return 'text-yellow-600'; // Pending or others
  };

  const getStatusIcon = () => {
    if (status === 'Completed') return <></>;
    if (status === 'Canceled') return <XCircleIcon className="w-4 h-4 text-red-600" />;
    if (status === 'Confirmed') return <CheckBadgeIcon className="w-4 h-5 text-green-600" />;
    return <ClockIcon className="w-4 h-5 text-yellow-600" />;
  };
  return (
    <div className="flex max-w-5xl mx-auto bg-white rounded-2xl shadow p-10 border border-gray-200 w-[90%]">
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
            <div className='flex gap-3 text-sm items-center'>
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
      <div className='flex flex-col justify-between items-left'>
        <div className='flex items-center gap-1'>
          {getStatusIcon()}
           <p className={`font-semibold text-[17px] ${getStatusColor()}`}>{status}</p>
        </div>
        <div className='flex items-center'>
            <LucideDollarSign size={25} className=" text-green-900 w-4" />
            <p>{price}</p>
        </div>
      </div>

    </div>

  )
}

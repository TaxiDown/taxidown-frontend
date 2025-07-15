import React from 'react'
import { MapPinIcon} from '@heroicons/react/24/solid'
import {
    Clock,
    CalendarDaysIcon
  } from "lucide-react";

export default function Ride({pickupText, destinationText, pickup, destination, date, time}) {
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

      <div className="flex-1 pl-6 space-y-2">
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
        <div>
          <p className="font-semibold">{destinationText}</p>
          <p className="text-sm text-gray-500">{destination}</p>
        </div>
      </div>
    </div>

  )
}

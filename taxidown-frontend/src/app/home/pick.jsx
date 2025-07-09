'use client'
import {React, useEffect, useState, useRef} from 'react'
import { MapPinIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/solid'


export default function Pick() {
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [isOneWay, setIsOneWay] = useState(true);
    const [pickupQuery, setpickupQuery] = useState('');
    const [pickupResults, setpickupResults] = useState([]);
    const [destinationQuery, setdestinationQuery] = useState('');
    const [destinationResults, setdestinationResults] = useState([]);
    const [showpickupResults, setShowpickupResults] = useState(false);
    const [showDestinationResults, setShowDestinationResults] = useState(false);
    const pickupRef = useRef(null);
    const destinationRef = useRef(null);

    useEffect(() => {
          if (pickupQuery.length < 3 && !destinationQuery) {
            setpickupResults([]);
            return;
          }
      
          const fetchSuggestions = async () => {
            const url = `/api/auto_complete/?pickup=${pickupQuery}&dropoff=${destinationQuery}&field=pickup&ride_type=${isOneWay ? 'destination':'per_hour'}`;
            const response = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json',}
            });
            const data = await response.json();
            setpickupResults(data);
          };
      
          const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
          return () => clearTimeout(timeoutId);
        }, [pickupQuery]);
    
    useEffect(() => {
        if (destinationQuery.length < 3 && !pickupQuery) {
            setdestinationResults([]);
            return;
        }
    
        const fetchSuggestions = async () => {
            const url = `/api/auto_complete/?pickup=${pickupQuery}&dropoff=${destinationQuery}&field=dropoff&ride_type=${isOneWay ? 'destination':'per_hour'}`;
            const response = await fetch(url);
            const data = await response.json();
            setdestinationResults(data);
        };
    
        const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
        return () => clearTimeout(timeoutId);
        }, [destinationQuery]);
    
    useEffect(() => {
        const handleClickOutside = (e) => {
        if (pickupRef.current && !pickupRef.current.contains(e.target)) {
            setShowpickupResults(false);
        }
        if (destinationRef.current && !destinationRef.current.contains(e.target)) {
            setShowDestinationResults(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); 
    };   
  return (
    <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col p-7 lg:mt-12 mt-25 mb-20 h-[500px] lg:h-max lg:w-max lg:shadow-lg lg:absolute lg:inset-y-25 lg:left-30 lg:bg-white/20 lg:backdrop-blur-md lg:rounded-xl'>
        <h1 className='text-[40px] truculenta font-medium m-6'>Pickup your trip now!</h1>
        <div className=' w-80 h-11 rounded-xl flex items-center justify-center mb-12 bg-white text-black'>
            <button type="button" className={`w-40 text-[20px] border-black border-2 border-r-2 h-full rounded-s-xl flex items-center gap-2 pl-5 cursor-pointer ${isOneWay ? 'bg-black text-white': 'bg-white text-black'}`} onClick={()=>setIsOneWay(true)}>
                <TruckIcon className={`w-6 h-6 ${isOneWay ? 'text-white' : 'text-black'} `}/>One-way</button>
            <button type="button" className={`w-40 text-[20px] border-black border-2 border-l-0 h-full  rounded-e-xl flex items-center gap-2 pl-5 cursor-pointer ${!isOneWay ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={()=>setIsOneWay(false)}>
                <ClockIcon className={`w-6 h-6 ${isOneWay ? 'text-black' : 'text-white'} `} />
                Per Hour</button>
        </div>
        <div className='flex items-center justify-center flex-col'>

        {/* Pickup Input */}
        <div ref={pickupRef} style={{ position: 'relative', width: '100%' }}>
            <div className='input-wrapper'>
                <input type="text"
                    id="pickup"
                    className='input pickup'
                    value={pickupQuery}
                    onChange={(e) => {
                        setpickupQuery(e.target.value);
                        setShowpickupResults(true);
                    }}
                    required
                />
                <label htmlFor="pickup" className="label">Pickup Location</label>
                <button type="button" className='show button'>
                    <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                </button>
            </div>
            {showpickupResults && pickupResults.length > 0 && (
                <div className="absolute bg-[#fcfcfa] border border-gray-300 rounded shadow w-full top-[39] z-10">
                    {pickupResults.map((place, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                setpickupQuery(place.name_location);
                                setShowpickupResults(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {place.name_location}
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Destination Input */}
        {isOneWay && (
        <div ref={destinationRef} style={{ position: 'relative', width: '100%' }}>
            <div className='input-wrapper'>
                <input type="text"
                    id="destination"
                    className='input pickup'
                    value={destinationQuery}
                    onChange={(e) => {
                        setdestinationQuery(e.target.value);
                        setShowDestinationResults(true);
                    }}
                    required
                />
                <label htmlFor="destination" className="label">Destination</label>
                <button type="button" className='show button'>
                    <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                </button>
            </div>
            {showDestinationResults && destinationResults.length > 0 && (
                <div className="absolute bg-[#fcfcfa] border border-gray-300 rounded shadow w-full top-[39] z-10">
                    {destinationResults.map((place, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                setdestinationQuery(place.name_location);
                                setShowDestinationResults(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {place.name_location}
                        </div>
                    ))}
                </div>
            )}
        </div>
        )}


        <div className='flex space-x-4'>
        {/* Date Picker */}
        <div className='flex flex-col bg-white rounded-md'>
            <div className={`flex items-center border ${pickupDate ? 'text-black border-black' : 'text-[#5f666e] border-[#9ca1a7]'} rounded-md px-4 py-2 w-48 focus-within:border-black`}>
            <input
                type="date"
                id="pickup-date"
                className="bg-transparent outline-none text-[16px] w-full"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
            />
            </div>
        </div>

        {/* Time Picker */}
        <div className='flex flex-col bg-white rounded-md'>
            <div className={`flex items-center border ${pickupTime ? 'text-black border-black' : 'text-[#5f666e] border-[#9ca1a7]'} rounded-md px-4 py-2 w-48 focus-within:border-black `}>
            <input
                type="time"
                id="pickup-time"
                className="bg-transparent outline-none text-[16px] w-full"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                required
            />
            </div>
        </div>
        </div>

        {/* Submit */}
        <button className='cursor-pointer bg-black text-white rounded-sm text-[17px] p-3 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black w-[130px] mt-8' type='submit'>
            Get Offer
        </button>        
        </div>
    </form>
  )
}

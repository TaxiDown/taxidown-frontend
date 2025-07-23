'use client'
import {React, useEffect, useState, useRef} from 'react'
import { MapPinIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/solid'
import { redirect, useRouter } from "next/navigation";
import SuccessModal from './modal';
import PickLogin from './pick_login';

export default function Pick({ pick,  oneWay, perHour, pickupLocation, destination, getOffer, login, signup, pickdict, lang}) {
    const [IsLogin, setLogin] = useState(false);
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);
    const [type, setType] = useState('')
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [isOneWay, setIsOneWay] = useState(true);
    const [pickupQuery, setpickupQuery] = useState('');
    const [pickupID, setPickupID] = useState('');
    const [pickupResults, setpickupResults] = useState([]);
    const [destinationQuery, setdestinationQuery] = useState('');
    const [destinationID, setDestinationID] = useState('');
    const [destinationResults, setdestinationResults] = useState([]);
    const [showpickupResults, setShowpickupResults] = useState(false);
    const [showDestinationResults, setShowDestinationResults] = useState(false);
    const [validPickup, setvalidPickup] = useState(true);
    const [validDestination, setvalidDestination] = useState(true);
    const [fleets, setFleets] = useState([]);
    const pickupRef = useRef(null);
    const destinationRef = useRef(null);
    const now = new Date();
    now.setHours(now.getHours() + 4);
    const minDate = now.toISOString().split('T')[0];
    const minTime = now.toTimeString().slice(0, 5); 
    const [getPrice, setGetPrice] = useState(false);
    const [estimatedPrice, setEstimatedPrice] = useState("");
    const [selectedFleet, setSelectedFleet] = useState(null);


    useEffect(() => {
          if (pickupQuery.length < 1 ) {
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
        if (destinationQuery.length < 1) {
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

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        const datetime_pickup = new Date(`${pickupDate}T${pickupTime}:00`);
        const response = await fetch(`/api/create_ride`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ pickup_location: pickupQuery, dropoff_location: destinationQuery, datetime_pickup: `${pickupDate}T${pickupTime}:00`, id_vehicle_category: selectedFleet}),
        })
        if(response.ok){
            const data = await response.json();
            setShowSuccess(true)
            setType('success');
            setTimeout(() => {
                setShowSuccess(false);
                router.push(`/${lang}/bookings`);
            }, 4000);
        }else if (response.status == 429){
            setShowSuccess(true);
            setType('limit');
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }else if(response.status == 401){
            setLogin(true);
        }
    
    }; 

    const estimatePrice = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`/api/get_price`, {
                cache: "no-store",
                method: 'POST',
                body: JSON.stringify({
                    pickup_location: pickupQuery,
                    dropoff_location: destinationQuery,
                    datetime_pickup: `${pickupDate}T${pickupTime}:00`,
                    id_vehicle_category: selectedFleet,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (res.status === 200) {
                const data = await res.json();
                setGetPrice(true);
                setEstimatedPrice(data.price);
                console.log(data.price);
            } else {
                const errorData = await res.json();
                console.error('Error estimating price:', errorData);
            }
        } catch (err) {
            console.error('Request failed:', err);
        }
    };
    
    
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch(`/api/get_fleets`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            if(response.ok){
                const data = await response.json();
                setFleets(data);
            }
        }
        fetchData();
    },[])

  return (
    <>
    {
        IsLogin &&
        <PickLogin login = {login} signup={signup} closeModal={()=>setLogin(false)}/>
    }
    {
        showSuccess &&
        <SuccessModal type={type}/>
    }
    <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col px-3 pb-3 md:p-7 mt-35 md:mt-12 mb-20 h-[500px] h-max w-max shadow-lg absolute md:inset-y-16 md:left-30 bg-white/20 backdrop-blur-md rounded-xl'>
        <h1 className='text-[40px] truculenta font-medium mb-3 mt-5 md:m-6'>{pick}</h1>
        <div className=' w-80 h-11 rounded-xl flex items-center justify-center mb-12 bg-white text-black'>
            <button type="button" className={`w-40 text-[20px] border-black border-2 border-r-2 h-full rounded-s-xl flex items-center gap-2 pl-5 cursor-pointer ${isOneWay ? 'bg-black text-white': 'bg-white text-black'}`} onClick={()=>setIsOneWay(true)}>
                <TruckIcon className={`w-6 h-6 ${isOneWay ? 'text-white' : 'text-black'} `}/>{oneWay}</button>
            <button type="button" className={`w-40 text-[20px] border-black border-2 border-l-0 h-full  rounded-e-xl flex items-center gap-2 pl-5 cursor-pointer ${!isOneWay ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={()=>setIsOneWay(false)}>
                <ClockIcon className={`w-6 h-6 ${isOneWay ? 'text-black' : 'text-white'} `} />
                {perHour}</button>
        </div>
        <div className='flex items-center justify-center flex-col'>

        <div ref={pickupRef} style={{ position: 'relative', width: '100%' }}>
        <div className={`input-wrapper ${!validPickup ? 'red-wrapper' : ''}`}>                
            <input type="text"
                    id="pickup"
                    className='input pickup'
                    value={pickupQuery}
                    onChange={(e) => {
                        setPickupID('')
                        setpickupQuery(e.target.value);
                        setShowpickupResults(true);
                    }}
                    required
                />
                <label htmlFor="pickup" className="label">{pickupLocation}</label>
                <button type="button" className='show button'>
                    <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                </button>
            </div>
            {!validPickup && <div className='text-center m-auto mb-3 flex items-center justify-center text-red-600 w-full'>Choose from valid pickup locations.</div>}
            {showpickupResults && pickupResults.length > 0 && (
                <div className="absolute bg-[#fcfcfa] border border-gray-300 rounded shadow w-full top-[39] z-10 max-h-50 overflow-auto">
                    {pickupResults.map((place, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                setPickupID(place.id)
                                setpickupQuery(place.name_location);
                                setShowpickupResults(false);
                                setvalidPickup(true);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {place.name_location}
                        </div>
                    ))}
                </div>
            )}
        </div>

        {isOneWay && (
        <div ref={destinationRef} style={{ position: 'relative', width: '100%' }}>
            <div className={`input-wrapper ${!validDestination ? 'red-wrapper' : ''}`}>
                <input type="text"
                    id="destination"
                    className={`input pickup`}
                    value={destinationQuery}
                    onChange={(e) => {
                        setDestinationID('');
                        setdestinationQuery(e.target.value);
                        setShowDestinationResults(true);
                    }}
                    required
                />
                <label htmlFor="destination" className="label">{destination}</label>
                <button type="button" className='show button'>
                    <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                </button>
            </div>
            {!validDestination && <div className='text-center m-auto mb-3 flex items-center justify-center text-red-600 w-full'>Choose from valid destinations.</div>}

            {showDestinationResults && destinationResults.length > 0 && (
                <div className="absolute bg-[#fcfcfa] border border-gray-300 rounded shadow w-full top-[39] z-10 max-h-50 overflow-auto">
                    {destinationResults.map((place, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                setDestinationID(place.id)
                                setdestinationQuery(place.name_location);
                                setShowDestinationResults(false);
                                setvalidDestination(true);
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
                min={minDate}
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

        {
            Array.isArray(fleets) && fleets.length > 0 && (
                <div className="w-full px-4 mt-2">
                  <h2 className="text-lg font-semibold text-center text-black mb-1">
                    {pickdict.chooseVehicle}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-6">
                    {fleets.map((fleet) => (
                      <div
                        key={fleet.id}
                        onClick={() => setSelectedFleet(fleet.id)}
                        className={`bg-white rounded-xl shadow-lg w-max cursor-pointer transition duration-300
                          ${selectedFleet === fleet.id ? 'ring-2 ring-black' : 'hover:shadow-2xl'}`}
                      >
                        <div className="p-3 text-center">
                          <h3 className="text-sm font-medium text-gray-800">
                            {fleet.name_category}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            )
        }

        {!getPrice ?
        <button className='cursor-pointer bg-black text-white rounded-sm text-[17px] p-3 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black w-[130px] mt-4 min-w-max' onClick={estimatePrice}>
            {getOffer}
        </button>
        :
        <>
        <p className="my-3 font-bold text-green-900 text-lg"> {pickdict.estimatedPrice}: {estimatedPrice}</p>
        <button className='cursor-pointer bg-black text-white rounded-sm text-[17px] p-3 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black w-[130px] min-w-max' type='submit'>
            {pickdict.createRide}
        </button>
        </>
        }
                
        </div>
    </form>
    </>
  )
}

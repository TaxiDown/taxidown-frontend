'use client'
import {React, useEffect, useState, useRef} from 'react'
import { MapPinIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/solid'
import { Calendar, Clock } from "lucide-react"
import { redirect, useRouter } from "next/navigation";
import SuccessModal from './modal';
import PickLogin from './pick_login';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function Pick({ pick,  oneWay, perHour, pickupLocation, destination, getOffer, login, signup, pickdict, lang}) {
    const [isLoading, setIsLoading] = useState(true)
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
    const [selectedFleetID, setSelectedFleetID] = useState(null);
    const [selectedFleet, setSelectedFleet] = useState(null);
    const [error, setError] = useState('')


    const handleChange = (fleetId) => {
        console.log(fleetId.key)
        setSelectedFleet(fleetId)
        setError("")
        setGetPrice(false)
        }
    const [selectedFleetValue, setSelectedFleetValue] = useState(undefined)

    const handleValueChange = (value) => {
        setSelectedFleetValue(value)
        const selectedFleet = fleets.find((fleet) => fleet.name_category === value)
        if (selectedFleet) {
            console.log("Selected Fleet ID:", selectedFleet.id)
            setSelectedFleetID(selectedFleet.id)
        }
        }

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
            body: JSON.stringify({ pickup_location: pickupQuery, dropoff_location: destinationQuery, datetime_pickup: `${pickupDate}T${pickupTime}:00`, id_vehicle_category: selectedFleetID}),
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
        if (!oneWay && (!pickupQuery || !destinationQuery || !pickupDate || !pickupTime || !selectedFleetID)) {
            console.log("lalaaaaaaaaaa")
            setError('Please fill in all fields.');
            return;
        }else if(oneWay && (!pickupQuery || !pickupDate || !pickupTime || !selectedFleetID)){
            setError('Please fill in all fields.');
            return;
        }
        const pickupDateTime = new Date(`${pickupDate}T${pickupTime}:00`);
        if (now > pickupDateTime){ 
            setError('Please choose a date after now, at least 4 hours.');
            return;
        }


        try {
            const res = await fetch(`/api/get_price`, {
                cache: "no-store",
                method: 'POST',
                body: JSON.stringify({
                    pickup_location: pickupQuery,
                    dropoff_location: destinationQuery,
                    datetime_pickup: `${pickupDate}T${pickupTime}:00`,
                    id_vehicle_category: selectedFleetID,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (res.status === 200) {
                const data = await res.json();
                setGetPrice(true);
                setEstimatedPrice(data.price);
            } else {
                setGetPrice(true);
                setEstimatedPrice(pickdict.undetermined);
            }
        } catch (err) {
            setError('Failed to get price estimate. Please try again.');
        }
    };
    

    useEffect(() => {
        const fetchData = async () => {
            let success = false;
            
            while (!success) {
                try {
                    const response = await fetch(`/api/get_fleets`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    })
                    
                    if (response.status === 200) {
                        const data = await response.json();
                        setFleets(data);
                        success = true;
                        setIsLoading(false)
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        }
        fetchData();
    }, [])

    if (isLoading) {
        return (
          <div className="flex items-center justify-center min-h-screen w-screen z-40 bg-stone-100">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin"></div>
              <p className="text-black font-lg text-3xl">Loading ...</p>
            </div>
          </div>
        )
      }
    
  return (
    <>
    {
        IsLogin &&
        <PickLogin login = {login} signup={signup} lang={lang} closeModal={()=>setLogin(false)} submit={handleSubmit}/>
    }
    {
        showSuccess &&
        <SuccessModal type={type}/>
    }
    <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col px-3 pb-3 md:p-7 mt-35 md:mt-12 mb-20 h-[500px] h-max w-max shadow-lg absolute md:top-[4vh] xl:top-[10%] md:left-30 bg-white/20 backdrop-blur-md rounded-xl max-w-[95%]'>
        <h1 className='md:text-[38px] text-[30px] truculenta font-medium mb-3 mt-5 md:m-6'>{pick}</h1>
        <div className=' w-70 md:w-80 h-9 md:h-11 rounded-xl flex items-center justify-center mb-6 md:mb-12 bg-white text-black'>
            <button type="button" className={`w-35 md:w-40 text-[17px] md:text-[20px] border-black border-2 border-r-2 h-full rounded-s-xl flex items-center gap-2 pl-5 cursor-pointer ${isOneWay ? 'bg-black text-white': 'bg-white text-black'}`} onClick={()=>{setIsOneWay(true);
                setGetPrice(false);
                setEstimatedPrice("");
            }}>
                <TruckIcon className={`w-6 h-6 ${isOneWay ? 'text-white' : 'text-black'} `}/>{oneWay}</button>
            <button type="button" className={`w-35 md:w-40 text-[17px] md:text-[20px] border-black border-2 border-l-0 h-full  rounded-e-xl flex items-center gap-2 pl-5 cursor-pointer ${!isOneWay ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={()=>{
                setIsOneWay(false);
                setGetPrice(false);
                setEstimatedPrice("");
            }}>
                <ClockIcon className={`w-6 h-6 ${isOneWay ? 'text-black' : 'text-white'} `} />
                {perHour}</button>
        </div>
        <div className='flex items-center justify-center flex-col'>

        <div ref={pickupRef} style={{ position: 'relative', width: '100%' }} className="max-w-[95%]">
        <div className={`relative mb-[20px] ${!validPickup ? 'red-wrapper' : ''}`}>                
            <input type="text"
                    id="pickup"
                    className='input pickup'
                    value={pickupQuery}
                    onChange={(e) => {
                        setPickupID('')
                        setpickupQuery(e.target.value);
                        setShowpickupResults(true);
                        setError('');
                        setGetPrice(false);
                    }}
                    required
                />
                <label htmlFor="pickup" className="label">{pickupLocation}*</label>
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
        <div ref={destinationRef} style={{ position: 'relative', width: '100%' }} className="max-w-[95%]">
            <div className={`input-wrapper ${!validDestination ? 'red-wrapper' : ''}`}>
                <input type="text"
                    id="destination"
                    className={`input pickup`}
                    value={destinationQuery}
                    onChange={(e) => {
                        setDestinationID('');
                        setdestinationQuery(e.target.value);
                        setShowDestinationResults(true);
                        setError('');
                        setGetPrice(false);
                    }}
                    required
                />
                <label htmlFor="destination" className="label">{destination}*</label>
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


        <div className='flex space-x-4 justify-center'>
        {/* Date Picker */}
        <div className='flex flex-col w-[45%] bg-white rounded-md'>
            <div className={`flex items-center border ${pickupDate ? 'text-black border-black' : 'text-[#5f666e] border-[#9ca1a7]'} rounded-md px-4 py-2  focus-within:border-black`}>
            <input
                type="date"
                id="pickup-date"
                className="bg-transparent outline-none text-[16px] w-full"
                value={pickupDate}
                min={minDate}
                onChange={(e) => {
                    setPickupDate(e.target.value);
                    setError('');
                    setGetPrice(false);
                }
                }
                required
            />
            </div>
        </div>

        {/* Time Picker */}
        <div className='flex flex-col bg-white rounded-md w-[45%]'>
            <div className={`flex items-center border ${pickupTime ? 'text-black border-black' : 'text-[#5f666e] border-[#9ca1a7]'} rounded-md px-4 py-2  focus-within:border-black `}>
            <input
                type="time"
                id="pickup-time"
                className="bg-transparent outline-none text-[16px] w-full"
                value={pickupTime}
                onChange={(e) => {
                    setPickupTime(e.target.value)
                    setError('');
                    setGetPrice(false);
                }}
                required
            />
            </div>
        </div>
        </div>

        {
            Array.isArray(fleets) && fleets.length > 0 && (
                <div className="w-[95%] mt-4 text-black text-lg">
                    <Select onValueChange={handleValueChange} value={selectedFleetValue}>
                    <SelectTrigger className="w-full h-14 bg-white border-gray-200 focus-within:border-black text-2xl font-semibold ">
                        <SelectValue className="text-gray-200" placeholder="Choose vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                        {fleets.map((fleet) => (
                        <SelectItem key={fleet.id} value={fleet.name_category}>
                            <div className="flex items-center gap-2 text-lg font-semibold">
                            {fleet.image && (
                                <img
                                src={fleet.image || "/placeholder.svg?height=24&width=24&text=Image"}
                                alt={fleet.name_category}
                                className="w-6 h-6 object-cover rounded"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                            )}
                            <span>{fleet.name_category}</span>
                            </div>
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                
            )
        }
        
        {!getPrice ?
        <button className='cursor-pointer bg-black text-white rounded-sm text-[17px] p-3 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black w-[130px] mt-4 min-w-max' onClick={estimatePrice}>
            {getOffer}
        </button>
        :
        <>
        <p className="my-3 font-bold text-green-900 text-md"> {pickdict.estimatedPrice}: {estimatedPrice}</p>
        <button className='cursor-pointer bg-black text-white rounded-sm text-[17px] p-3 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black w-[130px] min-w-max' type='submit'>
            {pickdict.createRide}
        </button>
        </>
        }
        {error && 
        <>
        <p className="mt-3 font-bold text-red-600 text-lg"> {error}</p>
        </>
        }      
        </div>
    </form>
    </>
  )
}

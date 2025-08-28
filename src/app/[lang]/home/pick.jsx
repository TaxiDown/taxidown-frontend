'use client'
import {React, useEffect, useState, useRef} from 'react'
import { MapPinIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/solid'
import { Calendar, Clock } from "lucide-react"
import { redirect, useRouter } from "next/navigation";
import SuccessModal from './modal';
import PickLogin from './pick_login';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link';


export default function Pick({ pick,  oneWay, perHour, pickupLocation, destination, getOffer, login, signup, pickdict, lang}) {
    const [isLoading, setIsLoading] = useState(false)
    const [IsLogin, setLogin] = useState(false);
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);
    const [type, setType] = useState('')
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [isOneWay, setIsOneWay] = useState(true);
    const [pickupQuery, setpickupQuery] = useState('');
    const [pickupID, setPickupID] = useState('');
    const [pickupResults, setPickupResults] = useState([]);
    const [destinationQuery, setdestinationQuery] = useState('');
    const [destinationID, setDestinationID] = useState('');
    const [destinationResults, setDestinationResults] = useState([]);
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
    const [error, setError] = useState('');

    const [pickup, setPickup] = useState(null)
    const [destinationCoords, setDestinationCoords] = useState(null);

    const [isGuest, setIsGuest] = useState(false);


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
            if (pickupQuery.length < 1) {
              setPickupResults([])
              return
            }
            const fetchSuggestions = async () => {
              try {
                const url = `/api/auto_complete/?searchQuery=${pickupQuery}`
                const response = await fetch(url)
                const data = await response.json()
                setPickupResults(data)
              } catch (error) {
                console.error("Pickup autocomplete failed:", error)
              }
            }
            const timeoutId = setTimeout(fetchSuggestions, 300)
            return () => clearTimeout(timeoutId)
          }, [pickupQuery])
        
          // Destination autocomplete
          useEffect(() => {
            if (destinationQuery.length < 1) {
              setDestinationResults([])
              return
            }
            const fetchSuggestions = async () => {
              try {
                const url = `/api/auto_complete/?searchQuery=${destinationQuery}`
                const response = await fetch(url)
                const data = await response.json()
                setDestinationResults(data)
              } catch (error) {
                console.error("Destination autocomplete failed:", error)
              }
            }
            const timeoutId = setTimeout(fetchSuggestions, 300)
            return () => clearTimeout(timeoutId)
          }, [destinationQuery])
    
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
        router.push(`/${lang}/pickup?pickup=${pickupQuery}&destination=${destinationQuery}&oneway=${isOneWay}`);
    }; 

    useEffect(() => {
        const fetchData = async () => {
        let success = false;
        try {
            const response = await fetch(`/api/get_fleets`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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
        <PickLogin login = {login} signup={signup} lang={lang} closeModal={()=>setLogin(false)} isGuest={setIsGuest} submit={handleSubmit}/>
    }
    {
        showSuccess &&
        <SuccessModal type={type} />
    }
    <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col pb-3 px-3 md:p-7 mt-35 md:mt-12 mb-20 h-[500px] h-max w-max shadow-lg absolute md:top-[20vh] xl:top-[20%] md:left-30 bg-white/20 backdrop-blur-md rounded-xl '>
        <h1 className='md:text-[38px] text-[30px] truculenta font-medium mb-3 mt-5 md:m-6'>{pick}</h1>
        <div className=' w-60 mx-5 md:w-80 h-9 md:h-11 rounded-xl flex items-center justify-center mb-6 md:mb-12 bg-white text-black'>
            <button type="button" className={`w-30 md:w-40 text-[16px] md:text-[20px] border-black border-2 border-r-2 h-full rounded-s-xl flex items-center gap-2 pl-3 md:pl-5 cursor-pointer ${isOneWay ? 'bg-black text-white': 'bg-white text-black'}`} onClick={()=>{
                setIsOneWay(true);
                setGetPrice(false);
                setEstimatedPrice("");
            }}>
                <TruckIcon className={`w-5 h-5 md:w-6 md:h-6 ${isOneWay ? 'text-white' : 'text-black'} `}/>{oneWay}</button>
            <button type="button" className={`w-30 md:w-40 text-[16px] md:text-[20px] border-black border-2 border-l-0 h-full  rounded-e-xl flex items-center gap-2 pl-3 md:pl-5 cursor-pointer ${!isOneWay ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={()=>{
                setIsOneWay(false);
                setGetPrice(false);
                setEstimatedPrice("");
            }}>
                <ClockIcon className={`w-5 h-5 md:w-6 md:h-6 ${isOneWay ? 'text-black' : 'text-white'} `} />
                {perHour}</button>
        </div>
        <div className='flex items-center justify-center flex-col'>

        <div ref={pickupRef} className=" relative">
        <div className={`relative mb-[20px] ${!validPickup ? 'red-wrapper' : ''}`}>                
            <input type="text"
                    id="pickup"
                    className='peer appearance-none bg-[#fcfcfa] border border-[#9ca1a7] 
                    rounded-md text-[#2d333a] text-base h-[40px] leading-[1.1] 
                    px-4 transition duration-200 ease-in-out 
                    focus:outline-none focus:border-black 
                    valid:border-black
                    w-90 max-w-[85vw] inline-block text-start'
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
                <label htmlFor="pickup" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d333a] text-base 
                    transition-all duration-200 ease-in-out 
                    peer-focus:text-sm peer-focus:top-0 peer-focus:left-[10px] peer-focus:text-black peer-focus:bg-[#fcfcfa] peer-focus:rounded-t-sm peer-focus:px-1
                    peer-valid:text-sm peer-valid:top-0 peer-valid:left-[10px] peer-valid:text-black peer-valid:bg-[#fcfcfa] peer-valid:rounded-t-sm peer-valid:px-1">{pickupLocation}*</label>
                <Link href={`/${lang}/pickup?pickup=${pickupQuery}&destination=${destinationQuery}&oneway=${isOneWay}&pick=true`}>
                    <button type="button" className='show button'>
                        <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                    </button>
                </Link>
            </div>
            {!validPickup && <div className='text-center m-auto mb-3 flex items-center justify-center text-red-600 w-full'>Choose from valid pickup locations.</div>}
            {showpickupResults && pickupResults.length > 0 && (
                <div className="absolute bg-[#fcfcfa] border border-gray-300 rounded shadow w-full top-[39] z-10 max-h-50 overflow-auto">
                    {pickupResults.map((place, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                setPickupID(place.id)
                                setpickupQuery(place.place_name);
                                setShowpickupResults(false);
                                setvalidPickup(true);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {place.place_name}
                        </div>
                    ))}
                </div>
            )}
        </div>

        {isOneWay && (
        <div ref={destinationRef} className=" relative">
            <div className={` ${!validDestination ? 'red-wrapper' : ''}`}>
                <input type="text"
                    id="destination"
                    className="peer appearance-none bg-[#fcfcfa] border border-[#9ca1a7] 
                    rounded-md text-[#2d333a] text-base h-[40px] leading-[1.1] 
                    px-4 transition duration-200 ease-in-out 
                    focus:outline-none focus:border-black 
                    valid:border-black
                    w-90 max-w-[85vw] inline-block text-start"
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
                <label htmlFor="destination" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d333a] text-base 
                transition-all duration-200 ease-in-out 
                peer-focus:text-sm peer-focus:top-0 peer-focus:left-[10px] peer-focus:text-black peer-focus:bg-[#fcfcfa] peer-focus:rounded-t-sm peer-focus:px-1
                peer-valid:text-sm peer-valid:top-0 peer-valid:left-[10px] peer-valid:text-black peer-valid:bg-[#fcfcfa] peer-valid:rounded-t-sm peer-valid:px-1">
                    {destination}*</label>
                <Link href={`/${lang}/pickup?pickup=${pickupQuery}&destination=${destinationQuery}&oneway=${isOneWay}&dest=true`}>
                    <button type="button" className='show button'>
                        <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                    </button>
                </Link>
            </div>
            {!validDestination && <div className='text-center m-auto mb-3 flex items-center justify-center text-red-600 w-full'>Choose from valid destinations.</div>}

            {showDestinationResults && destinationResults.length > 0 && (
                <div className="absolute bg-[#fcfcfa] border border-gray-300 rounded shadow w-full top-[39] z-10 max-h-50 overflow-auto">
                    {destinationResults.map((place, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                setDestinationID(place.id)
                                setdestinationQuery(place.place_name);
                                setShowDestinationResults(false);
                                setvalidDestination(true);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {place.place_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
        )}
        
        <button className='cursor-pointer bg-black text-white rounded-sm text-[17px] p-3 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black w-[130px] mt-4 min-w-max' type='submit'>
            {getOffer}
        </button>
        
        </div>
    </form>
    </>
  )
}

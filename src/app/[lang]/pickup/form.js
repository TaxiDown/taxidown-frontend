/* 'use client'
import {React, useState, useEffect, useRef} from 'react'
import { MapPinIcon, ClockIcon, TruckIcon} from '@heroicons/react/24/solid'
import { redirect, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function PickupForm({ pick,  oneWay, perHour, pickupLocation, destination, getOffer, login, signup, pickdict, lang}) {
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
            const url = `/api/auto_complete/?searchQuery=${pickupQuery}`;
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
            const url = `/api/auto_complete/?searchQuery=${destinationQuery}`;
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

    const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [pickup, setPickup] = useState(null);
  const [destination1, setDestination] = useState(null);

  const [center, setCenter] = useState([0, 0]);
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const spainBounds = [
    [-18.0, 27.5], // Southwest corner (Canary Islands)
    [5.0, 43.8]    // Northeast corner
  ];
  // Get GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        setCenter(coords);
        if (isOneWay) {
          setPickup(coords); // Lock pickup to GPS
        }
      });
    }
  }, [isOneWay]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !center[0]) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom: 14,
      center: [-3.7038, 40.4168], // Madrid
    });

    // Geocoder for searching
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false
    });
    mapRef.current.addControl(geocoder);

    // On map click
    mapRef.current.on("click", e => {
      const lngLat = [e.lngLat.lng, e.lngLat.lat];
      if (!isOneWay) {
        if (!pickup) {
          setPickup(lngLat);
        } else {
          setDestination(lngLat);
        }
      } else {
        setDestination(lngLat);
      }
    });

  }, [center, pickup, destination1, isOneWay]);

  // Add markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing markers
    document.querySelectorAll(".mapboxgl-marker").forEach(m => m.remove());

    if (pickup) {
      new mapboxgl.Marker({ color: "green" })
        .setLngLat(pickup)
        .addTo(mapRef.current);
    }

    if (destination1) {
      new mapboxgl.Marker({ color: "red" })
        .setLngLat(destination1)
        .addTo(mapRef.current);
    }
  }, [pickup, destination1]);


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
    <form onSubmit={handleSubmit} className='w-[70%] flex justify-center mt-20 flex-col items-center text-black'>
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
        <div className="flex gap-4">
              <div className="flex flex-col items-center pt-2">
                <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                {isOneWay && (
                  <>
                    <div className="w-px h-12 bg-gray-300 my-2"></div>
                    <MapPinIcon className="w-4 h-4 text-red-500" />
                  </>
                )}
              </div>
            <div className="flex-1 space-y-4 ">
            <div ref={pickupRef} style={{ position: 'relative', width: '100%' }} className="max-w-[95%]">
                <div className={`relative mb-[20px] ${!validPickup ? 'red-wrapper' : ''}`}>                
                    <input type="text"
                            id="pickup"
                            className='border-b-2 p-2 border-stone-600'
                            value={pickupQuery}
                            onChange={(e) => {
                                setPickupID('')
                                setpickupQuery(e.target.value);
                                setShowpickupResults(true);
                                setError('');
                                setGetPrice(false);
                            }}
                            placeholder={pickupLocation}
                            required
                        />
                        <button type="button" className='show button'>
                            <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                        </button>
                </div>
                {!validPickup && <div className='text-center m-auto mb-3 flex items-center justify-center text-red-600 w-full'>Choose from valid pickup locations.</div>}
                {showpickupResults && pickupResults.length > 0 && (
                    <div className="absolute bg-[#fcfcfa] border border-gray-300 rounded shadow w-full top-[39] z-10 max-h-50 overflow-auto text-black">
                        {pickupResults.map((place, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    setPickupID(place.id)
                                    setpickupQuery(place.place_name);
                                    setShowpickupResults(false);
                                    setvalidPickup(true);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                            >
                                {place.place_name}
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
                        className={`border-b-2 p-2 border-stone-600`}
                        value={destinationQuery}
                        onChange={(e) => {
                            setDestinationID('');
                            setdestinationQuery(e.target.value);
                            setShowDestinationResults(true);
                            setError('');
                            setGetPrice(false);
                        }}
                        placeholder={destination}
                        required
                    />
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
            </div>
        </div>
      
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
        <div style={{ width: "100%", height: "100%" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />
      <div className="mt-2 p-2 bg-gray-100 text-sm">
        <p><strong>Mode:</strong> {isOneWay}</p>
        <p>Pickup: {pickup ? pickup.join(", ") : "Not set"}</p>
        <p>Destination: {destination1 ? destination1.join(", ") : "Not set"}</p>
      </div>
    </div>   
    </form>
    </>
  )
}*/

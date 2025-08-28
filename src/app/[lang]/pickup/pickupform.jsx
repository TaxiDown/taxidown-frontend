"use client"
import { useState, useEffect, useRef } from "react" // Fixed import syntax
import { MapPinIcon, ClockIcon, TruckIcon, CalendarIcon } from "@heroicons/react/24/solid"
import { MessageCircleMore, ArrowLeft } from "lucide-react";
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Minus, Plus, User, Baby } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import PickupDetailsPage from "./pickup_details";
import PickupDetails from "./pickup_details";
import { Phone } from "lucide-react";


export default function PickupFor({
  pick,
  oneWay,
  perHour,
  pickupLocation,
  destination,
  getOffer,
  login,
  signup,
  pickdict,
  lang,
}) {

  const router = useRouter();

  const [error, setError] = useState('')
  const searchParams = useSearchParams();
  const [isOneWay, setIsOneWay] = useState(searchParams.get("oneway") === "true" || true)
  const [pickupQuery, setPickupQuery] = useState(searchParams.get("pickup") || "")
  const [pickupID, setPickupID] = useState("")
  const [pickupResults, setPickupResults] = useState([])
  const [destinationQuery, setDestinationQuery] = useState(searchParams.get("destination") || "")
  const [destinationID, setDestinationID] = useState("")
  const [destinationResults, setDestinationResults] = useState([])
  const [showPickupResults, setShowPickupResults] = useState(false)
  const [showDestinationResults, setShowDestinationResults] = useState(false)
  const [validPickup, setValidPickup] = useState(true)
  const [validDestination, setValidDestination] = useState(true)
  const [isPickingPickup, setIsPickingPickup] = useState(false)
  const [isPickingDestination, setIsPickingDestination] = useState(false)

  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [fleets, setFleets] = useState([]);
  const [selectedFleetID, setSelectedFleetID] = useState(null);
  const [selectedFleetValue, setSelectedFleetValue] = useState(undefined);


  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [minDate, setMinDate] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [returnCalendarOpen, setReturnCalendarOpen] = useState(false)

  const [returnDate, setReturnDate] = useState(null);
  const [returnTime, setReturnTime] = useState("");

  const [showDateTime, setShowDateTime] = useState(false)

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [isReturn, setIsReturn] = useState(false);

  const pickupRef = useRef(null)
  const destinationRef = useRef(null)

  const mapContainer = useRef(null)
  const mapRef = useRef(null)

  const isPickingPickupRef = useRef(false)
  const isPickingDestinationRef = useRef(false)

  const [estimatedPrice, setEstimatedPrice] = useState("");

  const [pickup, setPickup] = useState(null)
  const [destinationCoords, setDestinationCoords] = useState(null);
  
  const [phone, setPhone] = useState("");


  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const bounds = new mapboxgl.LngLatBounds();

    if (pickup && destinationCoords) {
      bounds.extend(pickup);
      bounds.extend(destinationCoords);

      map.fitBounds(bounds, {
        padding: 100,
        duration: 1000,
      });
      return;
    }

    if (pickup) {
      map.flyTo({ center: pickup, zoom: 10, duration: 1000 });
      return;
    }

    if (destinationCoords) {
      map.flyTo({ center: destinationCoords, zoom: 10, duration: 1000 });
      return;
    }
  }, [pickup, destinationCoords, mapRef]);


  const [center, setCenter] = useState([-3.7038, 40.4168])
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  useEffect(() => {
    isPickingPickupRef.current = isPickingPickup
  }, [isPickingPickup])

  useEffect(() => {
    isPickingDestinationRef.current = isPickingDestination
  }, [isPickingDestination])

  const reverseGeocode = async (lngLat, setQuery, setID) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat[0]},${lngLat[1]}.json?access_token=${mapboxgl.accessToken}`,
      )
      const data = await res.json()
      if (data.features && data.features.length > 0) {
        setQuery(data.features[0].place_name)
        setID(data.features[0].id)
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error)
    }
  }

  const forwardGeocode = async (query, setCoords) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`,
      )
      const data = await res.json()
      if (data.features && data.features.length > 0) {
        const coords = data.features[0].center;
        setCoords(coords);
      }
    } catch (error) {
      console.error("Forward geocoding failed:", error)
    }
  }

  // Get GPS location
  /*useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = [pos.coords.longitude, pos.coords.latitude]
        setCenter(coords)
      })
    }
  }, [isOneWay])*/

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom: 6,
    })

    mapRef.current.on("click", (e) => {
      const lngLat = [e.lngLat.lng, e.lngLat.lat]
      
      if (isPickingPickupRef.current) {
        setPickup(lngLat)
        reverseGeocode(lngLat, setPickupQuery, setPickupID)
        setIsPickingPickup(false)
        setValidPickup(true)
      } else if (isPickingDestinationRef.current) {
        setDestinationCoords(lngLat)
        reverseGeocode(lngLat, setDestinationQuery, setDestinationID)
        setIsPickingDestination(false)
        setValidDestination(true)
      }
    })
  }, [center]) 

  // Add markers
  useEffect(() => {
    if (!mapRef.current) return
    document.querySelectorAll(".mapboxgl-marker").forEach((m) => m.remove())
    if (pickup) {
      new mapboxgl.Marker({ color: "green" }).setLngLat(pickup).addTo(mapRef.current)
    }
    if (destinationCoords) {
      new mapboxgl.Marker({ color: "red" }).setLngLat(destinationCoords).addTo(mapRef.current)
    }
  }, [pickup, destinationCoords]) 

  // Pickup autocomplete
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
        setShowPickupResults(false)
      }
      if (destinationRef.current && !destinationRef.current.contains(e.target)) {
        setShowDestinationResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handlePickupMapClick = () => {
    setIsPickingPickup(true)
    setIsPickingDestination(false)
    setShowPickupResults(false)
  }

  const handleDestinationMapClick = () => {
    setIsPickingDestination(true)
    setIsPickingPickup(false)
    setShowDestinationResults(false)
  }

  useEffect(() => {
    setIsPickingPickup(searchParams.get("pick") === "true" || false);
    setIsPickingDestination(searchParams.get("dest") === "true" || false);

    forwardGeocode(pickupQuery, setPickup)
    forwardGeocode(destinationQuery, setDestinationCoords)

    const now = new Date()
    
    const minDateTime = new Date(now.getTime())

    setMinDate(minDateTime)

    const hours = String(minDateTime.getHours()).padStart(2, "0")
    const minutes = String(minDateTime.getMinutes()).padStart(2, "0")
    setSelectedTime(`${hours}:${minutes}`)
  }, [])

  const validateDateTime = (date, time) => {
    if (!date || !time) return false

    const [hours, minutes] = time.split(":")
    const selectedDateTime = new Date(date)
    selectedDateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes), 0, 0)

    const now = new Date()
    const minAllowedTime = new Date(now.getTime() + 4 * 60 * 60 * 1000)

    return selectedDateTime >= minAllowedTime
  }
  const [comment, setComment] = useState("")
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setComment(e.target.value);

    // auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // expand
    }
  };

  const isDateDisabled = (date) => {
    const now = new Date()
    const minAllowedDate = new Date(now.getTime())
    minAllowedDate.setHours(0, 0, 0, 0)

    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)

    return checkDate < minAllowedDate
  }

  const estimatePrice = async (e) =>{
    e.preventDefault();
    setButtonLoading(true);
    if (!pickupQuery  || !selectedDate || !selectedTime || !selectedFleetID || !phone) {
      setError(`${pickdict.fillFields}`);
      setButtonLoading(false);
      return;
    }else if(isOneWay && !destinationQuery){
      setError(`${pickdict.fillFields}`);
      setButtonLoading(false);
      return;
    }else if(showDateTime && (!returnDate || !returnTime)){
        setError(`${pickdict.fillFields}`);
        setButtonLoading(false);
        return;
    }else{
      if(!pickup){
        setValidPickup(false);
        setError("");
        setButtonLoading(false);
        return;
      }
      if(!destinationCoords){
        setValidDestination(false);
        setError("");
        setButtonLoading(false);
        return;
      }
    }
    setError("");
    try {
      const body = {
        pickup_coordinates: pickup,
        id_vehicle_category: selectedFleetID,
        datetime_pickup: `${selectedDate}T${selectedTime}:00`,
      };

      if(isOneWay)
        body.dropoff_coordinates = destinationCoords
    
      if (showDateTime) {
        body.datetime_return = `${returnDate}T${returnTime}:00`;
      }

      const res = await fetch(`/api/get_price`, {
          cache: "no-store",
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
      });

      if (res.status === 200) {
          const data = await res.json();
          setEstimatedPrice(data.price);
         // router.push(`/${lang}/pickup-details?pickup=${pickupQuery}&destination=${destinationQuery}&pickCoords=${pickup.join(",")}&destinationCoords=${destinationCoords.join(",")}&phone=${phone}&pickupDate=${selectedDate}&pickupTime=${selectedTime}&price=${estimatedPrice[0]}&returnPrice=${estimatePrice[1]}&adults=${adults}&childern=${children}&note=${comment}&returnDate=${returnDate}&returnTime=${returnTime}&vehicleID=${selectedFleetID}&vehicle=${selectedFleetValue}`)
      } else {
        setError(`${pickdict.failedEstimate}`);
        setButtonLoading(false);
      }
    } catch (err) {
        setError(`${pickdict.failedEstimate}`);
        setButtonLoading(false);
    }

  }

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
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    }
    fetchData();
  }, [])

  const handleValueChange = (value) => {
    setSelectedFleetValue(value)
    const selectedFleet = fleets.find((fleet) => fleet.name_category === value)
    if (selectedFleet) {
        setSelectedFleetID(selectedFleet.id)
    }
  }

  
  return (
    <>
    {estimatedPrice ?
      <div className="mb-4 relative ">
      <Button variant="ghost" size="md" className={`bg-white p-2 md:bg-transparent z-500 absolute top-0 left-2 cursor-pointer mt-16 md:ml-10 text-md hover:border-black`} onClick={()=>{setEstimatedPrice(""); setButtonLoading(false);}}>
        <ArrowLeft className="w-5 h-5 mr-2" />
        {pickdict.back}
      </Button>
    </div>:<></>
    }
    <div className={`relative flex flex-col-reverse md:flex-row ${estimatedPrice? "mt-15 md:mt-25": "mt-15 md:mt-20 "} md:gap-10 md:mx-15 md:mb-10 h-max overflow-y-auto md:min-h-[82%] `}>
    {estimatedPrice ?
    <div className="relative container w-max">
      <PickupDetails pickupDict={pickdict} pickup={pickupQuery} destination={destinationQuery} pickupCoords={pickup} destinationCoords={destinationCoords} phone={phone} pickupDate={selectedDate} pickupTime={selectedTime} price={isOneWay ? estimatedPrice[0] : estimatedPrice} returnPrice={estimatedPrice[1]} numAdultSeats={adults} numChildSeats={children} customerNote={comment} returnDate={returnDate} returnTime={returnTime} vehicleID={selectedFleetID} vehicleCategory={selectedFleetValue} login = {login} signup={signup} lang={lang}/>
    </div>
    :
    <form className="relative inset-0 bg-white w-[100%] flex mt-[-20] md:mt-0 md:pt-15 md:p-8 md:w-max flex-col items-center text-black h-max py-10 rounded-2xl shadow-custom">
      {error && 
        <>
          <div className="mb-4 py-3 w-70 bg-red-100 border-l-4 border-red-500 rounded text-red-800 text-center font-medium">
            {error}
          </div>
        </>
      }
      {(isPickingPickup || isPickingDestination) && (
        <div className="mb-4 p-3 bg-orange-100 border-l-4 border-orange-500 rounded text-orange-800 text-center font-medium">
          {isPickingPickup
            ? `${pickdict.selectPickup}`
            : `${pickdict.selectDest}`}
        </div>
      )}
      <div className="w-70 md:w-80 h-9 md:h-11 rounded-xl flex items-center justify-center mb-6 md:mb-12 bg-white text-black">
        <button
          type="button"
          className={`w-35 md:w-40 text-[17px] md:text-[20px] border-black border-2 border-r-2 h-full rounded-s-xl flex items-center gap-2 pl-5 cursor-pointer ${isOneWay ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => {
            setIsOneWay(true)
            setError("")
          }}
        >
          <TruckIcon className={`w-6 h-6 ${isOneWay ? "text-white" : "text-black"}`} />
          {oneWay}
        </button>
        <button
          type="button"
          className={`w-35 md:w-40 text-[17px] md:text-[20px] border-black border-2 border-l-0 h-full rounded-e-xl flex items-center gap-2 pl-5 cursor-pointer ${!isOneWay ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => {
            setIsOneWay(false)
            setDestinationCoords(null)
            setDestinationQuery("")
            setError("")
          }}
        >
          <ClockIcon className={`w-6 h-6 ${isOneWay ? "text-black" : "text-white"}`} />
          {perHour}
        </button>
      </div>
      <div className="flex gap-4 w-100 max-w-[90%]">
        <div className="flex flex-col items-center pt-2">
          {isOneWay && (
            <>
              <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
              <div className="w-px h-12 bg-gray-300 my-2"></div>
              <MapPinIcon className="w-4 h-4 text-red-500" />
            </>
          )
          }
        </div>
        <div className="flex-1 space-y-4">
          <div ref={pickupRef} className="relative w-full max-w-[95%]">
            <div className={`relative mb-[20px] ${!validPickup ? "border-red-500" : ""}`}>
              <input
                type="text"
                id="pickup"
                className="border-b-2 p-2 border-stone-600 w-full outline-none"
                value={pickupQuery}
                onChange={(e) => {
                  setPickupID("")
                  setPickupQuery(e.target.value)
                  setShowPickupResults(true)
                  setError("");
                  setValidPickup(true)
                  setPickup(null)
                }}
                placeholder={pickupLocation}
                required
              />
              <button
                type="button"
                className={`absolute right-2 top-2 transition-colors bg-white` }
                onClick={handlePickupMapClick}
                title="Click to select location on map"
              >
                <MapPinIcon className={`h-5 w-5 ${isPickingPickup ? "w-7 h-7 text-green-700 bg-green-200 rounded-full p-1" : "text-gray-500 hover:text-green-700"}`} />
              </button>
            </div>
            {!validPickup && (
              <div className="text-center m-auto mb-3 flex items-center justify-center text-red-600 w-full">
                {pickdict.chooseValidP}
              </div>
            )}
            {showPickupResults &&
              pickupResults.length > 0 && ( 
                <div className="absolute bg-[#fcfcfa] border border-gray-300 rounded shadow w-full top-[60px] z-10 max-h-50 overflow-auto text-black">
                  
                  {pickupResults.map((place, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setPickupID(place.id)
                        setPickupQuery(place.place_name)
                        setShowPickupResults(false)
                        setValidPickup(true)
                        forwardGeocode(place.place_name, setPickup)
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
            <div ref={destinationRef} className="relative w-full max-w-[95%]">
              
              <div className={`relative mb-[20px] ${!validDestination ? "border-red-500" : ""}`}>
                <input
                  type="text"
                  id="destination"
                  className="border-b-2 p-2 border-stone-600 w-full outline-none"
                  value={destinationQuery}
                  onChange={(e) => {
                    setDestinationID("")
                    setDestinationQuery(e.target.value)
                    setShowDestinationResults(true)
                    setError("");
                    setValidDestination(true);
                    setDestinationCoords(null)
                  }}
                  placeholder={destination}
                  required
                />
                <button
                  type="button"
                  className={`absolute right-2 top-2 transition-colors bg-white`}
                  onClick={handleDestinationMapClick}
                  title="Click to select location on map"
                >
                  <MapPinIcon className={`h-5 w-5 ${isPickingDestination ? "h-7 w-7 text-red-600 bg-red-100 rounded-full p-1" : "text-gray-500 hover:text-red-500"}`} />
                </button>
              </div>
              {!validDestination && (
                <div className="text-center m-auto mb-3 flex items-center justify-center text-red-600 w-full">
                  {pickdict.chooseValidD}
                </div>
              )}
              {showDestinationResults && destinationResults.length > 0 && (
                <div className="absolute bg-[#fcfcfa] border border-gray-300 rounded shadow w-full top-[60px] z-10 max-h-50 overflow-auto">
                  
                  {destinationResults.map((place, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setDestinationID(place.id)
                        setDestinationQuery(place.place_name)
                        setShowDestinationResults(false)
                        setValidDestination(true) 
                        forwardGeocode(place.place_name, setDestinationCoords) 
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
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-90">
          <div className="w-full">
            <label className="block text-sm font-medium text-stone-800 mb-1">{pickdict.date}</label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal h-10", !selectedDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? selectedDate : `${pickdict.pickDate}`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(format(date, "yyyy-MM-dd"));
                    setCalendarOpen(false);
                  }}
                  disabled={isDateDisabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full">
            <label htmlFor="pickup-time" className="block text-sm font-medium text-stone-800 mb-1 ">
              {pickdict.time}
            </label>
            <input
              type="time"
              id="pickup-time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-black valid:border-black h-10"
              required
            />
          </div>
        </div>
        {
            Array.isArray(fleets) && fleets.length > 0 && (
                <div className="w-90 mt-4 text-black text-lg">
                    <label className="block text-sm font-medium text-stone-800 mb-1">{pickdict.vehicleType}</label>
                    <Select onValueChange={handleValueChange} value={selectedFleetValue} className={cn('outline-none shadow-none')}>
                    <SelectTrigger className="w-full h-14 bg-white border-gray-200 outline-none focus:border-black text-2xl font-semibold ">
                        <SelectValue className="text-gray-300 font-medium outline-none" placeholder={`${pickdict.chooseVehicle}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {fleets.map((fleet) => (
                        <SelectItem key={fleet.id} value={fleet.name_category}>
                          <div className="flex items-center gap-2 text-lg font-semibold">
                          {fleet.image_path && (
                            <div className="w-10 h-10 flex-shrink-0">
                              <img
                                src={fleet.image_path}
                                alt={fleet.name_category}
                                className="w-full h-full object-contain rounded"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                              />
                            </div>
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
        {isOneWay && 
        <div className="w-90 flex items-center space-x-2 mt-5">
          <Checkbox id="schedule" checked={showDateTime} className="w-5 h-5" onCheckedChange={(e)=>{setShowDateTime(e); setReturnDate(null); setReturnTime("");}} />
          <label htmlFor="schedule" className="text-lg text-stone-800">
            {pickdict.addReturn}
          </label>
        </div>
        }
        {showDateTime &&
        <div className="grid grid-cols-2 gap-4 w-90 mt-2">
        <div className="w-full">
          <label className="block text-sm font-medium text-stone-800 mb-1">{pickdict.returnDate}</label>
          <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal h-10", !returnDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate ? format(returnDate, "yyyy-MM-dd") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={(date) => {
                  setReturnDate(format(date, "yyyy-MM-dd"));
                  setReturnCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full">
          <label htmlFor="pickup-time" className="block text-sm font-medium text-stone-800 mb-1 ">
            {pickdict.returnTime}
          </label>
          <input
            type="time"
            id="pickup-time"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-black valid:border-black h-10"
            required
          />
        </div>
      </div>
      }
      <div className="flex gap-6 w-90 mt-5">

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center justify-end gap-1">
          <User className="w-5 h-5 text-stone-700" />
          <span className="text-lg font-bold text-stone-800">{pickdict.adults}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
            className="flex items-center justify-center w-7 h-7 border-2 rounded-sm border-stone-200 hover:bg-stone-200"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-max text-center py-1 px-2">{adults}</div>
          <button
            type="button"
            onClick={() => setAdults((prev) => prev + 1)}
            className="flex items-center justify-center w-7 h-7 border-2 rounded-sm border-stone-200 hover:bg-stone-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Baby className="w-5 h-5 text-stone-600" />
          <span className="text-lg font-medium text-stone-800">{pickdict.childern}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
            className="flex items-center justify-center w-7 h-7 border-2 rounded-sm border-stone-200 hover:bg-stone-200"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-max text-center rounded-md py-1 px-2">{children}</div>
          <button
            type="button"
            onClick={() => setChildren((prev) => prev + 1)}
            className="flex items-center justify-center w-7 h-7 border-2 rounded-sm border-stone-200 hover:bg-stone-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <div className={`flex items-center w-90 mt-5`}>
    <Phone className="w-5 h-5 text-gray-600" />
    <input
        id="phone"
        className="border-b-2 p-2 border-stone-600 w-full outline-none resize-none overflow-hidden"
        value={phone}
        onChange={(e)=>{setPhone(e.target.value); setError("");}}
        placeholder={`${pickdict.phone}`}
        required
      />
    </div>
    <div className={`flex items-center w-90 mt-5 mb-[20px]`}>
      <MessageCircleMore className="h-6 w-6 text-gray-600" />
      <textarea
        id="comment"
        className="border-b-2 p-2 border-stone-600 w-full outline-none resize-none overflow-hidden"
        value={comment}
        ref={textareaRef}
        onChange={handleChange}
        placeholder={`${pickdict.comments}`}
        required
        rows={1} 
      />
    </div>
    <Button className='h-12 px-4 cursor-pointer bg-orange-500 text-white rounded-3xl text-[17px] p-3 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-orange-600 hover:text-orange-600 w-[130px] mt-3 min-w-max' onClick={estimatePrice}>
      {buttonLoading ?
      <>
        <Loader2Icon className="animate-spin text-white" />
        Loading ...
      </>:
      <>
        {getOffer}
      </>
      }
    </Button>
    </form>
    }
    <div className="shadow-custom border-none relative inset-0 w-full h-full flex flex-col justify-center outline-none">
      <div ref={mapContainer} className="w-full h-[400px] md:h-[85vh] md:rounded-lg outline-none" />
    </div>
    </div>
    </>
    
  )
}

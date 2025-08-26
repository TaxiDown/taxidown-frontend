"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Phone, User } from "lucide-react"
import { MapPinIcon} from "@heroicons/react/24/solid"
import {
    RadioGroup,
    RadioGroupItem,
  } from "@/components/ui/radio-group"
import PickLogin from "../home/pick_login"
import SuccessModal from "../home/modal"

export default function PickupDetails({pickup, destination, pickupCoords, destinationCoords, phone, pickupDate, pickupTime, price, returnPrice, numAdultSeats, numChildSeats, customerNote, returnDate,  returnTime, vehicleID, vehicleCategory, login, signup, lang} ) {
   const router = useRouter();

  const [IsLogin, setLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [type, setType] = useState('');

  const [isGuest, setIsGuest] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);


  const [pickupData, setPickupData] = useState({
    pickup: pickup,
    pickupCoords: pickupCoords,
    destination: destination,
    destinationCoords: destinationCoords,
    phone: phone,
    pickupDate: pickupDate,
    pickupTime: pickupTime ,
    vehicleID: vehicleID,
    vehicleCategory: vehicleCategory,
    price: price,
    returnPrice: returnPrice,
    numAdultSeats: numAdultSeats,
    numChildSeats: numChildSeats,
    returnDate: returnDate,
    returnTime: returnTime,
    customerNote: customerNote
  })

  const [paymentCash, setPaymentCash] = useState("cash");

  const fetchData = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('/api/validate_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (response.status === 200) {
        const data = await response.json();
        setLoggedIn(true);
        
    } else {
        setLoggedIn(false);
        setLogin(true);
    }
    } catch (err) {
        setLoggedIn(false);
        setLogin(true);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const body = {
      datetime_pickup: `${pickupData.pickupDate}T${pickupData.pickupTime}:00`,
      pickup_coordinates: pickupData.pickupCoords,
      phone_number: pickupData.phone,
      num_adult_seats: pickupData.numAdultSeats,
      num_child_seats: pickupData.numChildSeats,
      id_vehicle_category: pickupData.vehicleID,
      customer_note: pickupData.customerNote
    }
    if(pickupData.destination)
        body.dropoff_coordinates = pickupData.destinationCoords;
    if (returnPrice){
      body.return_ride =  true;
      body.datetime_return = `${pickupData.returnDate}T${pickupData.returnTime}:00`;
    }
    const response = await fetch(`/api/create_ride`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
    })
    if(response.ok){
        const data = await response.json();
        setShowSuccess(true)
        setType('success');
        setTimeout(() => {
            setShowSuccess(false);
            if(loggedIn)
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


  return (
    <>
    {
        IsLogin &&
        <PickLogin login = {login} signup={signup} lang={lang} closeModal={()=>setLogin(false)} isGuest={()=>setIsGuest(true)} submit={handleSubmit}/>
    }
    {
        showSuccess &&
        <SuccessModal type={type} isGuest={isGuest}/>
    }
    <form className="mt-[-20] flex items-center justify-center" onSubmit={fetchData}>
        <div className=" md:bg-white rounded-xl md:shadow p-6 w-90 md:w-120">
          <h2 className="text-lg font-semibold mb-1">Pickup Confirmation</h2>
          <p className="text-sm text-gray-500 mb-4">Review your pickup details</p>
          
          <div className="space-y-4">
          <div className="flex gap-4 w-100 max-w-[90%]">
            <div className="flex flex-col items-center pt-2">
            {pickupData.destination ? (
                <>
                <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                <div className="w-px h-14 bg-gray-300 my-2"></div>
                <MapPinIcon className="w-4 h-4 text-red-500" />
                </>
            ):
            <MapPinIcon className="w-5 h-7 text-gray-700" />
            }
            </div>
            <div className="flex flex-col h-full gap-4">
            <div className="flex items-center space-x-3">
              <div>
                    <p className="font-medium">Pickup Location</p>
                    <p className="text-gray-600">{pickupData.pickup || "Not provided"}</p>
              </div>
            </div>
            {pickupData.destination &&
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-medium">Destination</p>
                <p className="text-gray-600">{pickupData.destination || "Not provided"}</p>
              </div>
            </div>
            }
            </div>
           </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">Phone Number</p>
                <p className="text-gray-600">{pickupData.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">Preferred Time</p>
                <p className="text-gray-600">{pickupData.pickupDate}{'\u00A0'}{'\u00A0'}{'\u00A0'}{pickupData.pickupTime}</p>
              </div>
            </div>

            <div className="w-full flex justify-between items-center p-2 rounded-lg border-gray-200">
              <p className="text-orange-600 text-lg font-medium">Estimated Price</p>
              <p className="text-orange-600 text-xl font-bold">€{pickupData.price}</p>
            </div>
            <div>
                <h3 className="font-bold text-gray-900 text-lg">Payment Method</h3>
                <RadioGroup defaultValue="cash" onValueChange={(value)=>{setPaymentCash(value);}} className={"mt-3"}>
                    <div className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 ${paymentCash==="cash" ? "border-2 border-gray-700": ""}`}>
                        <RadioGroupItem value="cash" id="r2" />
                        <label htmlFor="r2">Cash on Delivery</label>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 ${paymentCash==="credit" ? "border-2 border-gray-700": ""}`}>
                        <RadioGroupItem value="credit" id="r3" />
                        <label htmlFor="r3">Credit</label>
                    </div>
                </RadioGroup>
            </div>
            <Button className="w-full cursor-pointer text-white rounded-lg text-[17px] p-3 py-5 bg-orange-500 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black min-w-max" type="submit">Confirm Booking</Button>
          </div>
        </div>        
      </form>
    </>
  )
}

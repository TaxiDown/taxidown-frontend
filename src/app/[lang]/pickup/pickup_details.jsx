"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Phone, User } from "lucide-react"
import { MapPinIcon} from "@heroicons/react/24/solid"
import { Loader2Icon } from "lucide-react"
import {
    RadioGroup,
    RadioGroupItem,
  } from "@/components/ui/radio-group"
import PickLogin from "../home/pick_login"
import SuccessModal from "../home/modal"

export default function PickupDetails({pickupDict, pickup, destination, pickupCoords, destinationCoords, phone, pickupDate, pickupTime, price, returnPrice, numAdultSeats, numChildSeats, customerNote, returnDate,  returnTime, vehicleID, vehicleCategory, login, signup, lang} ) {
  const router = useRouter();

  const [IsLogin, setLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [type, setType] = useState('');

  const [isGuest, setIsGuest] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [buttonLoading, setButtonLoading] = useState(false);

  const [error, setError] = useState("");

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
        handleSubmit(e);
        
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
    setButtonLoading(true);
    const body = {
      datetime_pickup: `${pickupData.pickupDate}T${pickupData.pickupTime}:00`,
      pickup_coordinates: pickupData.pickupCoords,
      pickup_location:pickupData.pickup,
      phone_number: pickupData.phone,
      num_adult_seats: pickupData.numAdultSeats,
      num_child_seats: pickupData.numChildSeats,
      id_vehicle_category: pickupData.vehicleID,
      customer_note: pickupData.customerNote
    }
    if(pickupData.destination){
        body.dropoff_coordinates = pickupData.destinationCoords;
        body.dropoff_location = pickupData.destination;
    }
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
    const data = await response.json();
    if(response.status === 201){
        const totalPrice = pickupData.returnPrice
        ? Number(pickupData.price) + Number(pickupData.returnPrice) 
        : Number(pickupData.price);
        if(!isGuest){
          setShowSuccess(true)
          setButtonLoading(false);
          setType('success');
          setTimeout(() => {
            router.push(`/${lang}/bookings`);
        }, 4000);
        }else
          router.push(`/${lang}/pickup-details?pickup=${pickupData.pickup}&destination=${pickupData.destination}&phone=${pickupData.phone}&pickupDate=${pickupData.pickupDate}&pickupTime=${pickupData.pickupTime}&price=${totalPrice}&returnDate=${pickupData.returnDate}&returnTime=${pickupData.returnTime}&vehicle=${pickupData.vehicleCategory}`)
    }else if (response.status == 429){
        console.log(data);
        setShowSuccess(true);
        setType('limit');
        setButtonLoading(false);
        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
    }else if(response.status == 401){
        setLogin(true);
        setButtonLoading(false);
    }else{
      setError(pickupDict.error);
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
    <form className="flex items-center justify-center w-max" onSubmit={fetchData}>
      {error && 
          <>
            <div className="mb-4 py-3 w-70 bg-red-100 border-l-4 border-red-500 rounded text-red-800 text-center font-medium">
              {error}
            </div>
          </>
        }
        <div className=" md:bg-white rounded-xl md:shadow p-6 w-90 md:w-120">
          <h2 className="text-lg font-semibold mb-1">{pickupDict.pickConfirm}</h2>
          <p className="text-sm text-gray-500 mb-4">{pickupDict.details}</p>
          
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
                    <p className="font-medium">{pickupDict.pickupLocation}</p>
                    <p className="text-gray-600">{pickupData.pickup || "Not provided"}</p>
              </div>
            </div>
            {pickupData.destination &&
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-medium">{pickupDict.destination}</p>
                <p className="text-gray-600">{pickupData.destination || "Not provided"}</p>
              </div>
            </div>
            }
            </div>
           </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">{pickupDict.phone}</p>
                <p className="text-gray-600">{pickupData.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">{pickupDict.pickTime}</p>
                <p className="text-gray-600">{pickupData.pickupDate}{'\u00A0'}{'\u00A0'}{'\u00A0'}{pickupData.pickupTime}</p>
              </div>
            </div>

            
            {pickupData.returnPrice ?
            <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-700" />
                <div>
                <p className="font-medium">{pickupDict.returnTime}</p>
                <p className="text-gray-600">{pickupData.returnDate}{'\u00A0'}{'\u00A0'}{'\u00A0'}{pickupData.returnTime}</p>
                </div>
            </div>
            : <></>
            }
            <div className="w-full flex justify-between items-center pr-2 rounded-lg border-gray-200">
              <p className="text-orange-600 text-lg font-medium">{pickupDict.totalPrice}</p>
              <p className="text-orange-600 text-xl font-bold">€{Number(pickupData.price) + Number(pickupData.returnPrice)}</p>
            </div>
            <div>
                <h3 className="font-bold text-gray-900 text-lg">{pickupDict.paymentMethod}</h3>
                <RadioGroup defaultValue="cash" onValueChange={(value)=>{setPaymentCash(value);}} className={"mt-3"}>
                    <div className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 ${paymentCash==="cash" ? "border-2 border-gray-700": ""}`}>
                        <RadioGroupItem value="cash" id="r2" />
                        <label htmlFor="r2">{pickupDict.cash}</label>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 ${paymentCash==="credit" ? "border-2 border-gray-700": ""}`}>
                        <RadioGroupItem value="credit" id="r3" />
                        <label htmlFor="r3">{pickupDict.credit}</label>
                    </div>
                </RadioGroup>
            </div>
            <Button className="w-full cursor-pointer text-white rounded-lg text-[17px] p-3 py-5 bg-orange-500 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black min-w-max" type="submit">
            {buttonLoading ?
            <>
              <Loader2Icon className="animate-spin text-white" />
              Loading ...
            </>:
            <>
              {pickupDict.confirm}
            </>
            }
            </Button>
          </div>
        </div>        
      </form>
    </>
  )
}

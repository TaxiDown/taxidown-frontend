"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
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

export default function PickupDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [IsLogin, setLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [type, setType] = useState('');

  const searchParams = useSearchParams()
  const [pickupData, setPickupData] = useState({
    pickup: "",
      pickupCoords: "",
      destination: "",
      destinationCoords: [],
      phone: "",
      pickupDate: null,
      pickupTime: "" ,
      vehicleID: "",
      vehicleCategory: "",
      price: "",
      returnPrice: "",
      numAdultSeats: "",
      numChildSeats: "",
      returnDate: null,
      returnTime: "",
      customerNote: ""
  })
  const [isLoaded, setIsLoaded] = useState(false)

  const [paymentCash, setPaymentCash] = useState(true);

  useEffect(() => {
    if (isLoaded) return

    const pickup = searchParams.get("pickup");
    const pickupCoords = searchParams.get("pickCoords").split(",");

    const destination = searchParams.get("destination");
    const destinationCoords = searchParams.get("destinationCoords").split(",");

    const phone = searchParams.get("phone");
    const pickupTime = searchParams.get("pickupTime");
    const pickupDate = searchParams.get("pickupDate");

    const price = searchParams.get("price");
    const returnPrice = searchParams.get("returnPrice");

    const vehicleID = searchParams.get("vehicleID");
    const vehicleCategory = searchParams.get("vehicle")

    const numAdultSeats = searchParams.get("adults");
    const numChildSeats = searchParams.get("children");

    const returnDate = searchParams.get("returnDate");
    const returnTime = searchParams.get("returnTime");

    const customerNote = searchParams.get("note");


    const finalData = {
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
    }

    setPickupData(finalData)
    setIsLoaded(true)
  }, [searchParams, isLoaded])

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const body = {
      datetime_pickup: `${pickupData.pickupDate}T${pickupData.pickupTime}:00`,
      pickup_coordinates: pickupData.pickupCoords,
      dropoff_coordinates: pickupData.dropoffCoords,
      phone_number: pickupData.phone,
      num_adult_seats: pickupData.numAdultSeats,
      num_child_seats: pickupData.numChildSeats,
      id_vehicle_category: pickupData.vehicleID,
      customer_note: pickupData.customerNote
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

  if (!isLoaded) {
    return (
      <div classpickup="container mx-auto p-6 max-w-4xl">
        <div classpickup="bg-white rounded-xl shadow p-6">
          <div classpickup="text-center">Loading...</div>
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
    <div classpickup="container mx-auto p-6 max-w-4xl">
      <div classpickup="mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft classpickup="w-4 h-4 mr-2" />
            Back to Form
          </Button>
        </Link>
      </div>

      <div classpickup="lg:mt-10 flex items-center justify-center">
        <div classpickup="bg-white rounded-xl shadow p-6 w-120">
          <h2 classpickup="text-lg font-semibold mb-1">Pickup Confirmation</h2>
          <p classpickup="text-sm text-gray-500 mb-4">Review your pickup details</p>
          
          <div classpickup="space-y-4">
          <div classpickup="flex gap-4 w-100 max-w-[90%]">
            <div classpickup="flex flex-col items-center pt-2">
            <div classpickup="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
            {pickupData.destination && (
                <>
                <div classpickup="w-px h-14 bg-gray-300 my-2"></div>
                <MapPinIcon classpickup="w-4 h-4 text-red-500" />
                </>
            )}
            </div>
            <div classpickup="flex flex-col h-full gap-4">
            <div classpickup="flex items-center space-x-3">
              <div>
                    <p classpickup="font-medium">Pickup Location</p>
                    <p classpickup="text-gray-600">{pickupData.pickup || "Not provided"}</p>
              </div>
            </div>

            <div classpickup="flex items-center space-x-3">
              <div>
                <p classpickup="font-medium">Destination</p>
                <p classpickup="text-gray-600">{pickupData.destination || "Not provided"}</p>
              </div>
            </div>
            </div>
           </div>

            <div classpickup="flex items-center space-x-3">
              <Phone classpickup="w-5 h-5 text-gray-500" />
              <div>
                <p classpickup="font-medium">Phone Number</p>
                <p classpickup="text-gray-600">{pickupData.phone || "Not provided"}</p>
              </div>
            </div>

            <div classpickup="flex items-center space-x-3">
              <Calendar classpickup="w-5 h-5 text-gray-500" />
              <div>
                <p classpickup="font-medium">Preferred Time</p>
                <p classpickup="text-gray-600"></p>
              </div>
            </div>
            <div classpickup="text-[18px] text-green-700 font-bold w-full text-center">
                Estimated Price: {pickupData.price}
            </div>
            <div>
                <h4 classpickup="font-bold text-[17px]">Payment Method</h4>
                <RadioGroup defaultValue="cash" onValueChange={(value)=>{setPaymentCash(value);}} classpickup={"mt-3"}>
                    <div classpickup="flex items-center gap-3">
                        <RadioGroupItem value="cash" id="r2" />
                        <label htmlFor="r2">Cash on Delivery</label>
                    </div>
                    <div classpickup="flex items-center gap-3">
                        <RadioGroupItem value="credit" id="r3" />
                        <label htmlFor="r3">Credit</label>
                    </div>
                </RadioGroup>
            </div>
            <Button classpickup="w-full mt-6">Confirm Pickup</Button>
          </div>
        </div>        
      </div>
    </div>
    </>
  )
}

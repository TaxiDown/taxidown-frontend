"use client"

import React from 'react'
import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Phone, User } from "lucide-react"
import { MapPinIcon} from "@heroicons/react/24/solid"


export default function Card({pickupDict}) {
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
    useEffect(() => {
      if (isLoaded) return
  
      const pickup = searchParams.get("pickup");
  
      const destination = searchParams.get("destination");
  
      const phone = searchParams.get("phone");
      const pickupTime = searchParams.get("pickupTime");
      const pickupDate = searchParams.get("pickupDate");
  
      const price = searchParams.get("price");
  
      const vehicleCategory = searchParams.get("vehicle")
  
      const returnDate = searchParams.get("returnDate");
      const returnTime = searchParams.get("returnTime");
  
      const finalData = {
        pickup: pickup,
        destination: destination,
        phone: phone,
        pickupDate: pickupDate,
        pickupTime: pickupTime ,
        vehicleCategory: vehicleCategory,
        price: price,
        returnDate: returnDate,
        returnTime: returnTime,
      }
  
      setPickupData(finalData)
      setIsLoaded(true)
    }, [searchParams, isLoaded])
  
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
      <div className="flex items-center justify-center w-max shadow-custom " >
          <div className=" md:bg-white rounded-xl md:shadow p-6 w-90 md:w-120">
          <h2 className="text-green-600 text-xl font-semibold mb-6">{pickupDict.rideCreated}</h2>
            
            <div className="space-y-4 m-4">
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
              {pickupData.returnTime ?
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
                <p className="text-black text-lg font-medium">{pickupDict.totalPrice}</p>
                <p className="text-black text-xl font-bold">€{pickupData.price}</p>
              </div>
            </div>
          </div>        
        </div>
)}


"use client"
import { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Ride from "./ride"
import NavbarStatic from "./nav_static"

export default function BookingForm({ pickup, destination, dict, lang, rideText }) {
  const router = useRouter()
  const [rides, setRides] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const content = {
    en: {
      title: "No rides yet",
      subtitle: "Start your journey with us",
      description: "You haven't booked any rides yet. Book your first ride and experience our premium service.",
      buttonText: "Book Your First Ride",
      features: [
        "Quick and easy booking",
        "Professional drivers",
        "Safe and comfortable rides",
        "24/7 customer support",
      ],
    },
    es: {
      title: "Aún no hay viajes",
      subtitle: "Comienza tu viaje con nosotros",
      description: "Aún no has reservado ningún viaje. Reserva tu primer viaje y experimenta nuestro servicio premium.",
      buttonText: "Reserva Tu Primer Viaje",
      features: [
        "Reserva rápida y fácil",
        "Conductores profesionales",
        "Viajes seguros y cómodos",
        "Soporte al cliente 24/7",
      ],
    },
  }

  const t = content[lang]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get_rides`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })

        if (response.status === 200) {
          const data = await response.json()
          setRides(data)
          console.log(data);
        } else {
          router.push(`/${lang}/unauthorized`)
        }
      } catch (error) {
        console.error("Error fetching rides:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [lang, router])

  const handleBookRide = () => {
    router.push(`/${lang}`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin"></div>
          <p className="text-black font-lg text-3xl">Loading ...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {Array.isArray(rides) && rides && (
        <Suspense>
          <div className="flex justify-start items-center flex-col gap-9 bg-stone-100 h-max min-h-screen pt-26">
            <NavbarStatic
              home={dict.home}
              contactUs={dict.contactUs}
              loginTitle={dict.loginTitle}
              bookingTitle={dict.bookingTitle}
              logoutTitle={dict.logoutTitle}
              loggedIn={true}
              lang={lang}
            />

            {rides.length < 1 ? (
              <div className="flex items-center justify-center min-h-[500px] p-6">
                <div className="max-w-md w-full text-center">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m6.75 4.5v-3.375a1.125 1.125 0 011.125-1.125h2.25a1.125 1.125 0 011.125 1.125v3.375m6-6V9.75a1.125 1.125 0 00-1.125-1.125H14.25A1.125 1.125 0 0013.125 9.75v1.125m7.5 0a1.125 1.125 0 00-1.125-1.125H19.5m-6.75 0V9.75a1.125 1.125 0 011.125-1.125h1.5a1.125 1.125 0 011.125 1.125v1.125m-9 9v-1.5a1.125 1.125 0 011.125-1.125h1.5A1.125 1.125 0 019.75 15v2.25"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
                    <p className="text-lg text-yellow-700 font-medium mb-4">{t.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{t.description}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <div className="grid grid-cols-1 gap-3">
                      {t.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center gap-3 text-sm text-gray-700">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleBookRide}
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-800 hover:to-yellow-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:ring-offset-2 cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t.buttonText}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Decorative elements */}
                  <div className="mt-8 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-yellow-200 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-20 w-full space-y-7">
                {rides.map((ride) => {
                  const isReturn = ride.return_ride;

                  const pickupr = isReturn
                    ? ride.booking.dropoff_location
                    : ride.booking.pickup_location;

                  const destinationr = isReturn
                    ? ride.booking.pickup_location
                    : ride.booking.dropoff_location;

                  const dater = isReturn
                    ? ride.booking.datetime_return.split("T")[0]
                    : ride.booking.datetime_pickup.split("T")[0];

                  const timer = isReturn
                    ? ride.booking.datetime_return.split("T")[1].replace("Z", "")
                    : ride.booking.datetime_pickup.split("T")[1].replace("Z", "");

                  return (
                    <Ride
                      key={`ride-${ride.id}`}
                      id={ride.booking.id}
                      pickupText={pickup}
                      destinationText={destination}
                      pickup={pickupr}
                      destination={destinationr}
                      date={dater}
                      time={timer}
                      status={ride.booking.status}
                      price={ride.price}
                      ride={rideText}
                    />
                  );
                })}

              </div>
            )}
          </div>
        </Suspense>
      )}
    </>
  )
}

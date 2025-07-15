import React from 'react'
import { getDictionary } from '../dictionaries'
import Navbar from '../home/nav'
import Ride from './ride'
import BookingForm from './form'

export default async function Booking({params}) {
    const {lang} = await params
    const dict = await getDictionary(lang) // en
  return (
    <div className='flex justify-start items-center flex-col gap-9 bg-stone-100 h-max min-h-screen'>
        <Navbar home={dict.lang.home} contactUs={dict.lang.contactUs} loginTitle={dict.lang.loginTitle} bookingTitle={dict.lang.bookingTitle}/>
        <div className='flex gap-3 justify-center md:justify-start mx-15 text-white mt-22'>
            <button className='bg-black rounded-3xl px-6 py-2 w-25 min-w-max h-max shadow-lg hover:scale-105 hover:bg-black hover:text-white transition'>All</button>
            <button className='text-black border-2 rounded-3xl px-6 py-2 w-25 min-w-max h-max hover:scale-105 hover:text-white hover:bg-black transition'>Pending</button>
            <button className='text-black border-2 rounded-3xl px-6 py-2 w-25 min-w-max h-max hover:scale-105 hover:text-white hover:bg-black transition'>Upcoming</button>
        </div>
        <BookingForm pickup={dict.lang.pickupLocation} destination={dict.lang.destination}/>
    </div>
  )
}

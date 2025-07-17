import React from 'react'
import { getDictionary } from '../../dictionaries'
import BookingForm from './form'

export default async function Booking({params}) {
    const {lang} = await params
    const dict = await getDictionary(lang) // en
  return (
    <BookingForm pickup={dict.lang.pickupLocation} destination={dict.lang.destination} dict={dict.lang}/>
  )
}

import {React} from 'react'
import { getDictionary } from '../dictionaries'
import PickupForm from './form';
import PickupFor from './pickupform';
import Navbar from '../home/nav';

export default async function PickupPage({params}) {
    const {lang} = await params;
    const dict = await getDictionary(lang);

      return (
      <div className='bg-gray-100 w-[100vw] h-lvh overflow-x-hidden'>
        <Navbar home={dict.lang.home} contactUs={dict.lang.contactUs} loginTitle={dict.lang.loginTitle} bookingTitle={dict.lang.bookingTitle} logoutTitle={dict.lang.logoutTitle} successLogout={dict.lang.LogoutSuccessful} lang={lang} bg="white"/>
        <PickupFor pick={dict.lang.pickupTripNow} oneWay={dict.lang.oneWay} perHour={dict.lang.perHour} pickupLocation={dict.lang.pickupLocation} destination={dict.lang.destination} getOffer={dict.lang.getOffer} login={dict.login} signup={dict.signup} pickdict={dict.pick} lang={lang}/>
    </div>
  )
}

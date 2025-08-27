import { getDictionary } from '../dictionaries'
import Navbar from "../home/nav"
import Card from './card';

export default async function PickupDetailsPage({params}) {
  const {lang} = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <Navbar home={dict.lang.home} contactUs={dict.lang.contactUs} loginTitle={dict.lang.loginTitle} bookingTitle={dict.lang.bookingTitle} logoutTitle={dict.lang.logoutTitle} successLogout={dict.lang.LogoutSuccessful} lang={lang} bg="white"/>
      <Card pickupDict={dict.pick}/>
    </div>
  )
}
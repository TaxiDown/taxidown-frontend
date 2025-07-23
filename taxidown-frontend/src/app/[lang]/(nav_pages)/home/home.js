import Navbar from './nav'
import Footer from './footer'
import GetFleets from './getfleets'
import Pick from './pick'
import { getDictionary } from '../../dictionaries'
import OurServices from './ourServices'
import DriverProfessionals from './drivers'

export default async function HomePage({params}) {
  const {lang} = await params;
  const dict = await getDictionary(lang); // en
  return (
    <div className=' w-[100vw]'>
        <Navbar home={dict.lang.home} contactUs={dict.lang.contactUs} loginTitle={dict.lang.loginTitle} bookingTitle={dict.lang.bookingTitle} logoutTitle={dict.lang.logoutTitle} successLogout={dict.lang.LogoutSuccessful} lang={lang}/>
        <div className='w-full md:h-screen h-[650px] bg-[url(/home2.png)] bg-cover relative bg-center flex items-center justify-center md:flex-none'>
            <Pick pick={dict.lang.pickupTripNow} oneWay={dict.lang.oneWay} perHour={dict.lang.perHour} pickupLocation={dict.lang.pickupLocation} destination={dict.lang.destination} getOffer={dict.lang.getOffer} login={dict.login} signup={dict.signup} pickdict={dict.pick} lang={lang}/>
        </div>

        <OurServices />
        <GetFleets />
        <div className='flex flex-col gap-13 justify-center items-center py-20 bg-[#f8f8f8]'>
            <div className="text-center mb-[-15px]">
                <h1 className='text-[50px] truculenta font-medium'>Drivers professionals</h1>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                    Our own team of professional drivers with excellent driving skills, carefully selected.            
                </p>
            </div>
            <DriverProfessionals 
            path={"/driver.png"} 
            title= {"Professional Drivers"} 
            content={"All our drivers are professionally trained, courteous, and well-acquainted with the routes to ensure your safety and comfort."}
            />
            <DriverProfessionals 
            flip={"md:flex-row-reverse lg:pl-20 gap:15"}
            path={"/driver.png"} 
            title= {"Professional Drivers"} 
            content={"All our drivers are professionally trained, courteous, and well-acquainted with the routes to ensure your safety and comfort."}
            />
            <DriverProfessionals 
            path={"/driver.png"} 
            title= {"Professional Drivers"} 
            content={"All our drivers are professionally trained, courteous, and well-acquainted with the routes to ensure your safety and comfort."}
            />
        </div>
        <Footer />
    </div>
  )
}

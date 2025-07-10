import {React} from 'react'
import Navbar from './nav'
import Footer from './footer'
import Pickup from './pickup'
import GetFleets from './getfleets'
import Pick from './pick'
import { getDictionary } from '../dictionaries'



export default async function Home({params}) {
  const { lang } = await params
  const dict = await getDictionary(lang) // en
  return (
    <div className=' w-[100vw]'>
        <Navbar home={dict.lang.home} contactUs={dict.lang.contactUs} loginTitle={dict.lang.loginTitle}/>
        <div className='lg:w-full lg:h-screen lg:bg-[url(/home2.png)] lg:bg-cover '>
            <Pick pick={dict.lang.pickupTripNow} oneWay={dict.lang.oneWay} perHour={dict.lang.perHour} pickupLocation={dict.lang.pickupLocation} destination={dict.lang.destination} getOffer={dict.lang.getOffer}/>
        </div>
        <div className='flex flex-col justify-center items-center '>
            <h1 className='text-[50px] truculenta font-medium m-6 mt-8'>Our features</h1>
            <div className='pt-8 p-20 flex flex-col gap-10 w-full'>
                <div className='w-[500px] flex w-full h-[60vh] gap-30 bg-white backdrop-blur-md shadow-custom rounded-xl p-10'>
                    <img src='/driver.png' width='500' className='rounded-3xl'/>
                    <div className='flex items-left justify-center flex-col gap-3 '>
                        <h1 className='text-[35px]'>Lorem Ipsum</h1>
                        <div className='text-[23px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
                    </div>
                </div>
                <div className='w-[500px] flex w-full h-[60vh] gap-30 bg-white backdrop-blur-md shadow-custom rounded-xl p-10'>
                    <div className='flex items-left justify-center flex-col gap-3 '>
                        <h1 className='text-[35px]'>Lorem Ipsum</h1>
                        <div className='text-[23px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
                    </div>
                    <img src='/driver.png' width='500' className='rounded-3xl'/>
                </div>
                <div className='w-[500px] flex w-full h-[60vh] gap-30 bg-white backdrop-blur-md shadow-custom rounded-xl p-10'>
                    <img src='/driver.png' width='500' className='rounded-3xl'/>
                    <div className='flex items-left justify-center flex-col gap-3 '>
                        <h1 className='text-[35px]'>Lorem Ipsum</h1>
                        <div className='text-[23px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
                    </div>
                </div>  
            </div>
            <div className='text-white bg-[url(/car2.png)] h-[100vh] bg-cover bg-center w-full relative flex flex-col items-center justify-center'>
                <div className="absolute inset-0 bg-black/70 z-0"></div>
                <div className="z-10 flex flex-col items-center">
                    <h1 className='text-[45px] text-white font-bold'>Our Fleet</h1>
                    <GetFleets />
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

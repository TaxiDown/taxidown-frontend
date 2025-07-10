import React from 'react'
import Link from 'next/link'

export default function Navbar({home, contactUs, loginTitle}) {
  return (
    <div className='lg:h-13 bg-transperent flex justify-between shadow-md items-center md:pl-10 md:pr-10 pr-5 pl-5 bg-white/20 backdrop-blur-sm fixed w-full z-40 top-0 left-0 h-15'>
        <h3 className='text-[22px] font-bold'>TaxiDrive</h3>
        <div className='flex md:gap-10 md:mr-7 gap-5'>
            <Link href='home' className='text-yellow-1000 md:text-[19px] text-[17px] font-medium lg:font-bold hover:text-yellow-600 hover:scale-105'>{home}</Link>   
            <Link href='/' className='text-yellow-1000 md:text-[19px] text-[17px] font-medium lg:font-bold hover:text-yellow-600 hover:scale-105'>{contactUs}</Link>        
            <Link href='/login' className='text-yellow-1000 md:text-[19px] text-[17px] font-medium lg:font-bold hover:text-yellow-600 hover:scale-105'>{loginTitle}</Link>             
        </div>
    </div>
  )
}

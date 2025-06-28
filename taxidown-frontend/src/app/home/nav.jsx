import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='h-15 bg-transperent flex justify-between shadow-md items-center md:pl-10 md:pr-10 pr-5 pl-5'>
        <h3 className='text-[22px] font-bold'>TaxiDrive</h3>
        <div className='flex md:gap-10 md:mr-7 gap-5'>
            <Link href='home' className='text-yellow-1000 md:text-[19px] text-[17px] font-medium hover:text-yellow-600 hover:scale-105'>Home</Link>   
            <Link href='/' className='text-yellow-1000 md:text-[19px] text-[17px] font-medium hover:text-yellow-600 hover:scale-105'>Contact us</Link>        
            <Link href='/login' className='text-yellow-1000 md:text-[19px] text-[17px] font-medium hover:text-yellow-600 hover:scale-105'>Login</Link>             
        </div>
    </div>
  )
}

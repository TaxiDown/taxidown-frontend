import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='left-0 bottom-0 w-[100vw] h-[300px] bg-black text-white flex md:flex-row flex-col gap-4 p-20 justify-center items-center'>
        <div className='w-[30vw] text-[45px] font-medium min-w-max'>TaxiDrive</div>
        <div className='flex justify-between md:w-[50vw] gap-5'>
            <div className='flex flex-col md:text-[25px] text-[20px] font-semibold'>
                Navigations
                <Link href='home' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Home</Link>   
                <Link href='/' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Contact us</Link>        
                <Link href='/login' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Login</Link> 
            </div>
            <div className='flex flex-col md:text-[25px] text-[20px] font-semibold'>
                Navigations
                <Link href='home' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Home</Link>   
                <Link href='/' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Contact us</Link>        
                <Link href='/login' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Login</Link> 
            </div>
            <div className='flex flex-col md:text-[25px] text-[20px] font-semibold'>
                Navigations
                <Link href='home' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Home</Link>   
                <Link href='/' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Contact us</Link>        
                <Link href='/login' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Login</Link> 
            </div>
        </div>
    </div>
  )
}

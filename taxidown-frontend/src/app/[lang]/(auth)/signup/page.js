import Link from 'next/link'
import React from 'react'
import Signupform from './form.jsx'
import { getDictionary } from '../dictionaries'


export default async function SignupPage({params}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
   
  return (
    <div className='flex items-center h-screen w-screen justify-between '>
        <div className='text-center flex justify-center items-center flex-col lg:w-[33vw] md:w-[40vw] shadow-2xl h-[100vh] bg-[#fcfcfa] w-[100vw]'>
            <h1 className='text-[37px] truculenta font-medium mt-8 p-0 bg-gradient-to-r from-black via-red-700 to-yellow-400 bg-clip-text text-transparent'>TaxiDrive</h1>
            <h3 className='text-[27px] truculenta font-bold mb-6 font-black'>Create Your Account</h3>
            <Signupform />
            <div className='text-[14px] mt-1'>Already have an account?  <Link href='login' className='text-yellow-500 hover:text-yellow-600'>Login</Link>
            </div>
        </div>
        <div className='md:relative lg:w-[67vw] md:w-[60vw] md:h-[100vh] md:bg-[url(/image.png)] md:bg-cover md:flex hidden '>
            <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
    </div>
  )
}
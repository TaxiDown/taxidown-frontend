import Link from 'next/link'
import React from 'react'
import Loginform from './form.jsx'
import { getDictionary } from '../../dictionaries.js'


export default async function LoginPage({params}) {
  const { lang } = await params
  const dict = await getDictionary(lang) 
  return (
    <div className='flex items-center h-screen w-screen justify-between '>
        <div className='text-center flex justify-center items-center flex-col lg:w-[33vw] md:w-[40vw] shadow-2xl h-[100vh] bg-[#fcfcfa] w-[100vw]'>
        <h1 className='text-[50px] truculenta font-medium m-6 mt-8'>TaxiDrive</h1>
            <Loginform loginTitle={dict.auth.loginTitle} em={dict.auth.email} pass={dict.auth.password} forgotPassword={dict.auth.forgotPassword}/>
            <div className='text-[13px] mt-2'>
                {dict.auth.dontHaveAccount}  <Link href='/en/signup' className='text-yellow-500 hover:text-yellow-600'>
                {dict.auth.createAccount}</Link>
            </div>
        </div>
        <div className='md:relative lg:w-[67vw] md:w-[60vw] md:h-[100vh] md:bg-[url(/image.png)] md:bg-cover md:flex hidden '>
            <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
    </div>
  )
}
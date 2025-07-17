'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavbarStatic({ home, contactUs, loginTitle, bookingTitle, logoutTitle, loggedIn }) {
    const [loggedOut, setLogedOut] = useState(false);
    const logout = async () =>{
        try{
            const response = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            });
            if (response.ok) {
                setLogedOut(true);
                setTimeout(() => {
                  setLogedOut(false);
                  window.location.reload();
                }, 3000);            
            }        
        }catch(err){
        }
    }
  return (
    <>{
        loggedOut && 
        <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center bg-black/50 h-full w-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full h-100">
            <h2 className="text-green-600 text-xl font-semibold mb-2">Logout successful.</h2>
          </div>
        </div>
      }
    <div className='text-black lg:h-13 bg-transperent flex justify-between shadow-md items-center md:pl-10 md:pr-10 pr-5 pl-5 bg-white/20 backdrop-blur-sm fixed w-full z-40 top-0 left-0 h-15'>
      <h3 className='text-[22px] font-bold'>TaxiDown</h3>
      <div className='flex md:gap-10 md:mr-7 gap-5'>
        <Link href='/en' className='text-yellow-1000 md:text-[19px] text-[17px] font-medium lg:font-bold hover:text-yellow-600 hover:scale-105'>{home}</Link>
        <Link href='/en/contactus' className='text-yellow-1000 md:text-[19px] text-[17px] font-medium lg:font-bold hover:text-yellow-600 hover:scale-105'>{contactUs}</Link>
        {
          loggedIn ? (
            <>
              <button onClick={logout} className='text-yellow-1000 md:text-[19px] text-[17px] font-medium lg:font-bold hover:text-yellow-600 hover:scale-105'>{logoutTitle}</button>
            </>
          ) : (
            <Link href='/en/login' className='text-yellow-1000 md:text-[19px] text-[17px] font-medium lg:font-bold hover:text-yellow-600 hover:scale-105'>{loginTitle}</Link>
          )
        }
      </div>
    </div>
    </>
  );
}

'use client'
import React, { useState } from 'react'

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    function isValidEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/i.test(email);
    }

    const onsubmit = async(e)=>{
        e.preventDefault();
        if (!isValidEmail(email)) {
            setValidEmail(false);
            return;
        }else
            setValidEmail(true);

        const response = await fetch(`/api/forgot_password`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:email})
        });
    }
  return (
    <form onSubmit={onsubmit} className='flex items-center justify-center h-screen bg-gray-100 bg-[url(/image.png)] relative'>
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className='z-10 bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-max py-13 pb-10 px-15 flex justify-center flex-col items-center gap-2'>
            <h1 className={`text-3xl font-bold mb-7`}>Reset Password</h1>
            <div className={`input-wrapper flex-col ${!validEmail ? 'red-wrapper':""}`}>
                <input type="text" 
                    onChange = {(e) => {
                        setEmail(e.target.value);
                        setValidEmail(true);
                    }}
                    value = {email}
                    id="email"
                    className='input'
                    required
                />
                <label htmlFor="email" className="label"
                >Email*</label>
                {!validEmail && <span className='text-center m-auto flex items-center justify-center text-red-600 w-full'>Invalid Email</span>}
            </div>
            <button type="submit" className={email ? 'cursor-pointer px-5 bg-black text-white rounded-sm text-[19px] w-max h-12 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black mb-3 mt-1' : 'cursor-not-allowed bg-[#ddd] text-[#888] rounded-sm text-[19px] px-5 w-max h-12 border-2 border-[#ccc] mb-2 mt-1'}>
            Send Reset Email
            </button>
        </div>
    </form>
  )
}

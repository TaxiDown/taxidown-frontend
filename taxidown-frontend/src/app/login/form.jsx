'use client'
import React, { useState } from 'react'
import { Eye, EyeOff } from "lucide-react";

export default function Loginform() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    
    const onSubmit = async(e) =>{
        e.preventDefault();
    }
  return (
    <form onSubmit={onSubmit} >
        <div className='input-wrapper'>
            <input type="text" 
                onChange = {(e) => setEmail(e.target.value)}
                value = {email}
                id="email"
                className='input'
                required
            />
            <label htmlFor="email" className="label"
            >Email*</label>
        </div>
        
        <div className='input-wrapper'>
            <input type={showPassword ? "text" : "password"} 
                onChange = {(e) => setPassword(e.target.value)}
                value = {password}
                id="password"
                className='input'
                required
            />
            <label htmlFor="password" className="label"
            >Password*</label>
            {password && 
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='show button'
                >
                    {showPassword ? <EyeOff style={{width:'22px'}}/> : <Eye style={{width:'22px'}}/>}
                </button>
            }
        </div>
        <button type="submit" className={email && password ? 'cursor-pointer bg-black text-white rounded-sm text-[19px] w-25 h-12 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black mb-3 mt-1' : 'cursor-not-allowed bg-[#ddd] text-[#888] rounded-sm text-[19px] w-25 h-12 border-2 border-[#ccc] mb-2 mt-1'}>
         Login
        </button>
        
    </form>
  )
}

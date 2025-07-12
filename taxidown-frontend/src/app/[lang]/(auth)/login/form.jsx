'use client'
import React, { useState, Suspense } from 'react'
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Login from '@/app/actions/login';
import Link from 'next/link';


export default function Loginform({loginTitle, dontHaveAccount, createAccount, forgotPassword, pass, em}) {
    const router = useRouter();
    const [code, setCode] = useState(0)
    const [response, setresponse] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
   
    
    const onSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email: email, password: password }),
        });
        setCode(response.status);
        console.log(response);
        switch (response.status) {
            case 200 :
              setresponse('Logged in successfully!');
              setTimeout(() => {
                router.push("/home");
              }, 5000);
              break;
      
            case 401 :
              setresponse('Missing fields');
              break;
      
            case 400 :
              setresponse('Invalid credentials');
              break;
      
            case 404 :
              setresponse('🚫 API not found (404). Check your route.');
              break;
      
            case 500 :
              setresponse(`You are \nalready logged In!`);
              break;
      
            default:
              console.error(`❓ Unhandled status ${response}`);
              break;
          }
    }
  return (
    <form onSubmit={onSubmit} >
        <div className='input-wrapper'>
            <input type="text" 
                onChange = {(e) => {setEmail(e.target.value);
                  setresponse('');
                }}
                value = {email}
                id="email"
                className='input'
                required
            />
            <label htmlFor="email" className="label"
            >{em}*</label>
        </div>
        
        <div className='input-wrapper'>
            <input type={showPassword ? "text" : "password"} 
                onChange = {(e) => {setPassword(e.target.value);
                setresponse('');
              }}
                value = {password}
                id="password"
                className='input'
                required
            />
            <label htmlFor="password" className="label"
            >{pass}*</label>
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
        <div className='flex items-center justify-center flex-col'>
          <Link href='/en/forgot_password' className=' cursor-pointer w-full text-right text-[13px] mb-1 mt-[-15px] px-2 text-neutral-900 hover:text-yellow-600'>{forgotPassword}</Link>
          <button type="submit" className={email && password ? 'cursor-pointer bg-black text-white rounded-sm text-[19px] w-25 h-12 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black mb-3 mt-1 min-w-max px-3' : 'cursor-not-allowed bg-[#ddd] text-[#888] rounded-sm text-[19px] w-25 h-12 border-2 border-[#ccc] mb-2 mt-1 min-w-max px-3'}>
          {loginTitle}
          </button>
        </div>
        {response &&
          <div className={`mt-3 text-[18px] whitespace-pre-line ${
            code == 200 ? 'text-green-500' : 'text-red-500'
          }`}>{response}</div>
        }
        
    </form>
  )
}

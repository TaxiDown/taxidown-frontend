'use client';
import React, { useState } from 'react';
import Loginform from '../../(auth)/login/form';
import Link from 'next/link';
import Signupform from '../../(auth)/signup/form';
import SignupLogin from './form';
import {X} from "lucide-react";

export default function PickLogin({ login, signup, closeModal }) {
  const [isLogin, setLogin] = useState(false);
  const [isSignup, setSignup] = useState(false);

  return (
    <div>
      <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center bg-black/60 h-full w-screen">
        {isLogin ? (
          <div className="relative bg-white rounded-md text-center flex justify-center items-center flex-col w-[400px] shadow-2xl h-[500px] bg-[#fcfcfa]">
            <button className='cursor-pointer absolute top-7 right-7' onClick={() => {closeModal();}}><X /></button>
            <h1 className="text-[50px] truculenta font-medium m-6 mt-8">Login</h1>
            <Loginform
              loginTitle={login.loginTitle}
              em={login.email}
              pass={login.password}
              forgotPassword={login.forgotPassword}
              onSuccess={() => {
                setLogin(false);
                setSignup(false);
                closeModal();
              }}
            />
            <div className="text-[13px] mt-2">
              {login.dontHaveAccount}{' '}
              <Link
                href="/en/signup"
                className="text-yellow-500 hover:text-yellow-600"
              >
                {login.createAccount}
              </Link>
            </div>
          </div>
        ) : isSignup ? (
          <div className="relative bg-white rounded-md text-center flex justify-center items-center flex-col w-[400px] shadow-2xl h-[550px] min-h-max bg-[#fcfcfa]">
            <button className='cursor-pointer absolute top-7 right-7' onClick={() => {closeModal();}}><X /></button>
            <h1 className="text-[50px] truculenta font-medium m-6 mt-8">{signup.signupTitle}</h1>
            <SignupLogin 
            signup={signup} 
            onSuccess={() => {
                setLogin(false);
                setSignup(false);
                closeModal();
              }}/>
            <div className="text-[13px] mt-2">
              {signup.alreadyHaveAccount}{' '}
              <Link
                href="/en/signup"
                className="text-yellow-500 hover:text-yellow-600"
              >
                {signup.loginTitle}
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative p-6 rounded-lg shadow-lg text-center max-w-sm w-full bg-stone-100 py-15">
            <button className='cursor-pointer absolute top-5 right-5' onClick={() => {closeModal();}}><X className='text-sm'/></button>
            <h2 className="text-2xl font-semibold mb-6">You have to login first!</h2>
            <div className="flex flex-col justify-start text-left mb-1">
              <button
                onClick={() => setSignup(true)}
                className="h-12 text-black border border-stone-500 rounded-lg text-lg cursor-pointer transition delay-150 duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white"
              >
                Create an account
              </button>
            </div>
            or
            <div className="flex flex-col justify-start text-left mt-1">
              <button
                onClick={() => setLogin(true)}
                className="h-12 text-black border border-stone-500 rounded-lg text-lg cursor-pointer transition delay-150 duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white"
              >
                Login to your account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

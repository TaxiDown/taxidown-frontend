// app/[lang]/reset-password/ResetClient.js
'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetClient({ dict, lang }) {
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const uid = searchParams.get('uid');

  const validatePassword = (password) => {
    const newValidations = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setValidations(newValidations);
    return Object.values(newValidations).every(Boolean);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/reset_password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        uid,
        new_password1: password,
        new_password2: confirmpassword,
      }),
    });
    setStatus(response.status);
    return response.status;
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center justify-center h-screen bg-gray-100 bg-[url(/image.png)] relative">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="z-10 bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-max py-13 pb-10 px-15 flex justify-center flex-col items-center gap-2">
        <h1 className="text-3xl font-bold mb-7">{dict.resetPassword.title}</h1>

        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            value={password}
            id="password"
            className="input"
            name="password"
            required
          />
          <label htmlFor="password" className="label">
            {dict.resetPassword.passwordLabel}
          </label>
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="show button"
            >
              {showPassword ? <EyeOff style={{ width: '22px' }} /> : <Eye style={{ width: '22px' }} />}
            </button>
          )}
        </div>

        {!Object.values(validations).every(Boolean) ? (
          <>
            {password && (
              <ul className="alert-container">
                <li className={validations.length ? 'true' : 'false'}>{dict.resetPassword.validations.length}</li>
                <li className={validations.uppercase ? 'true' : 'false'}>{dict.resetPassword.validations.uppercase}</li>
                <li className={validations.lowercase ? 'true' : 'false'}>{dict.resetPassword.validations.lowercase}</li>
                <li className={validations.number ? 'true' : 'false'}>{dict.resetPassword.validations.number}</li>
                <li className={validations.special ? 'true' : 'false'}>{dict.resetPassword.validations.special}</li>
              </ul>
            )}
          </>
        ) : (
          <div className="input-wrapper flex-col">
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmpassword}
              id="confirmPassword"
              className="input"
              name="confirmpassword"
              required
            />
            <label htmlFor="confirmPassword" className="label">
              {dict.resetPassword.confirmLabel}
            </label>
            {confirmpassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show button"
              >
                {showPassword ? <EyeOff style={{ width: '22px' }} /> : <Eye style={{ width: '22px' }} />}
              </button>
            )}
            {password !== confirmpassword && confirmpassword && (
              <span className="red">{dict.resetPassword.matchError}</span>
            )}
          </div>
        )}

        <button
          type="submit"
          className={
            password
              ? 'cursor-pointer px-5 bg-black text-white rounded-sm text-[19px] w-max h-12 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black mb-3 mt-1'
              : 'cursor-not-allowed bg-[#ddd] text-[#888] rounded-sm text-[19px] px-5 w-max h-12 border-2 border-[#ccc] mb-2 mt-1'
          }
        >
          {dict.resetPassword.submit}
        </button>
      </div>
    </form>
  );
}

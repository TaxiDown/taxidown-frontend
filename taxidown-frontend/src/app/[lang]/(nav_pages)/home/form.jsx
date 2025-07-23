'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupLogin({ signup, onSuccess }) {
  const userData = {
    email: "",
    password: "",
    password2: "",
    firstname: "",
    lastname: "",
    phone: "",
  };

  const router = useRouter();
  const [successful, setSuccessful] = useState(false);
  const [response, setresponse] = useState('');
  const [code, setCode] = useState(0);
  const [data, updateData] = useState(userData);
  const [confirmationPassword, setConfirmPassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const validatePassword = (password) => {
    const result = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setValidations(result);
    return Object.values(result).every(Boolean);
  };

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/i.test(email);

  const handelChange = (e) => {
    setresponse('');
    updateData({ ...data, [e.target.name]: e.target.value });

    if (e.target.name === 'password') {
      if (!validatePassword(e.target.value)) setConfirmPassword('');
    }

    if (e.target.name === 'email') setValidEmail(true);
  };

  const confirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(data.email)) {
      setValidEmail(false);
      prevPage();
      return;
    }

    setValidEmail(true);

    const response = await fetch('/api/combined_auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: data.email,
        password1: data.password,
        password2: confirmationPassword,
        first_name: data.firstname,
        last_name: data.lastname,
        phone_number: data.phone,
      }),
    });

    setCode(response.status);

    const messages = {
      200: signup.success,
      401: signup.missingFields,
      400: signup.invalidCredentials,
      404: signup.notFound,
      500: signup.serverError,
    };

    setresponse(messages[response.status] || '');
    if (response.status === 200) {
      setTimeout(() => onSuccess(), 7000);
    }
  };

  const [page, changePage] = useState(1);
  const nextPage = () => page < 2 && changePage(page + 1);
  const prevPage = () => page > 1 && changePage(page - 1);

  return (
    <>
      {successful && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-green-600 text-xl font-semibold mb-2">
              {signup.accountSuccessTitle}
            </h2>
            <p className="text-gray-600">{signup.accountSuccessText}</p>
          </div>
        </div>
      )}
      <form onSubmit={onSubmit} className="mb-3">
        {page === 1 ? (
          <>
            <div className={`input-wrapper flex-col ${!validEmail ? 'red-wrapper' : ''}`}>
              <input type="text" name="email" onChange={handelChange} value={data.email} id="email" className="input" required />
              <label htmlFor="email" className="label">{signup.email}*</label>
              {!validEmail && (
                <span className="text-center m-auto flex items-center justify-center text-red-600 w-full">
                  {signup.invalidEmail}
                </span>
              )}
            </div>

            <div className="input-wrapper">
              <input type={showPassword ? 'text' : 'password'} name="password" onChange={handelChange} value={data.password} id="password" className="input" required />
              <label htmlFor="password" className="label">{signup.password}*</label>
              {data.password && (
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="show button">
                  {showPassword ? <EyeOff style={{ width: '22px' }} /> : <Eye style={{ width: '22px' }} />}
                </button>
              )}
            </div>

            {!Object.values(validations).every(Boolean) ? (
              data.password && (
                <ul className="alert-container">
                  <li className={validations.length ? 'true' : 'false'}>{signup.passwordLength}</li>
                  <li className={validations.uppercase ? 'true' : 'false'}>{signup.passwordUpper}</li>
                  <li className={validations.lowercase ? 'true' : 'false'}>{signup.passwordLower}</li>
                  <li className={validations.number ? 'true' : 'false'}>{signup.passwordNumber}</li>
                  <li className={validations.special ? 'true' : 'false'}>{signup.passwordSpecial}</li>
                </ul>
              )
            ) : (
              <div className="input-wrapper">
                <input type={showPassword ? 'text' : 'password'} name="confirmpassword" onChange={confirmPassword} value={confirmationPassword} id="confirmPassword" className="input" required />
                <label htmlFor="confirmPassword" className="label">{signup.confirmPassword}*</label>
                {confirmationPassword && (
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="show button">
                    {showPassword ? <EyeOff style={{ width: '22px' }} /> : <Eye style={{ width: '22px' }} />}
                  </button>
                )}
                {data.password !== confirmationPassword && confirmationPassword && (
                  <span className="red">{signup.passwordMismatch}</span>
                )}
              </div>
            )}

            <button type="button" onClick={nextPage} className={data.password && data.email && data.password === confirmationPassword ? 'mt-2 cursor-pointer bg-black text-white rounded-sm text-[18px] p-6 pt-[11px] pb-[11px] w-30 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black' : 'mt-2 cursor-not-allowed bg-[#ddd] text-[#888] rounded-sm text-[18px] p-6 pt-[11px] pb-[11px] w-30 border-2 border-[#ccc]'}>
              {signup.continue}
            </button>
          </>
        ) : (
          <>
            <div className="input-wrapper">
              <input type="text" name="firstname" onChange={handelChange} value={data.firstname} id="firstname" className="input" required />
              <label htmlFor="firstname" className="label">{signup.fname}*</label>
            </div>

            <div className="input-wrapper">
              <input type="text" name="lastname" onChange={handelChange} value={data.lastname} id="lastname" className="input" required />
              <label htmlFor="lastname" className="label">{signup.lname}*</label>
            </div>

            <div className="input-wrapper">
              <input type="text" name="phone" onChange={handelChange} value={data.phone} id="phone" className="input" required />
              <label htmlFor="phone" className="label">{signup.phone}*</label>
            </div>

            <div className="mt-3 flex flex-col gap-2 items-center justify-items-center max">
              <button type="submit" className={data.firstname && data.lastname && data.phone ? 'cursor-pointer bg-black text-white rounded-sm text-[17px] p-3 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black w-max' : 'cursor-not-allowed bg-[#ddd] text-[#888] rounded-sm text-[16px] p-3 border-2 border-[#ccc] w-max'}>
                {signup.createAccount}
              </button>
              <button type="button" onClick={prevPage} className="cursor-pointer bg-[#f5f5f5] text-[#262626] rounded-sm text-[19px] p-5 pt-2 pb-2 w-35 border border-[#ccc] transition-transform duration-300 hover:scale-105 hover:bg-[#e0e0e0] hover:border-[#bbb]">
                {signup.back}
              </button>
            </div>
          </>
        )}
        {response && (
          <div className={`mt-3 text-[18px] whitespace-pre-line ${code === 200 ? 'text-green-500' : 'text-red-500'}`}>
            {response}
          </div>
        )}
      </form>
    </>
  );
}

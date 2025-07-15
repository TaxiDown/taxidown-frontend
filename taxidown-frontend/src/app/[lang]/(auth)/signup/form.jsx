'use client'
import React, { useState } from 'react'
import { Eye, EyeOff, LogIn } from "lucide-react";
import CreateAccount from '@/app/actions/createAccount';
import { useRouter } from 'next/navigation';


export default function Signupform() {

  const userData ={
    email: "",
    password: "",
    password2:"",
    firstname: "",
    lastname: "",
    phone: "",
  }
  const router = useRouter();
  const [response, setresponse] = useState('')
  const [code, setCode] = useState(0)
  const [data, updateData] = useState(userData);
  const [confirmationPassword, setConfirmPassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);

  const handelChange = (e)=>{
    setresponse('')
    updateData({
      ...data,
      [e.target.name]: e.target.value,
    })
    if(e.target.name == "password"){
      if(!validatePassword(e.target.value))
        setConfirmPassword('')
    }
    if(e.target.name == 'email')
      setValidEmail(true);
  }

  const confirmPassword = (e)=>{
    setConfirmPassword(e.target.value)
  }
  function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/i.test(email);
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = data.email;
    const password = data.password;
    const password2 = confirmationPassword;
    const firstname = data.firstname;
    const lastname = data.lastname;
    const phone = data.phone;

    console.log(isValidEmail(email));
    if (!isValidEmail(email)) {
      setValidEmail(false);
      prevPage();
      return;
    }else
      setValidEmail(true);

    const res = await CreateAccount({email, password, password2, firstname, lastname, phone});
    setCode(res);
    switch (res) {
      case 201 :
        setresponse(`Account created successfully! \n You will be redirected to the login page.`);
        setTimeout(() => {
          router.push("en/login");
        }, 1000);
        break;

      case 400:
        setresponse('This email is already used');
        break;

      case 404 :
        console.error('🚫 API not found (404). Check your route.');
        break;

      case 500 :
        setresponse(`Server error.\nplease, try again`);
        break;

      default:
        console.error(`❓ Unhandled status ${res}`);
        break;
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [validations, setValidations] = useState({
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      special: false,
  });
  
  const validatePassword = (password) => {
    setValidations({
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
    return validations.length && validations.lowercase && validations.uppercase && validations.number && validations.special
  };


  const [page, changePage] = useState(1);
  const nextPage = (e)=>{
    if (page < 2 ){
      changePage(page + 1)
    }
  }
  const prevPage = (e)=>{
    if (page > 1){
      changePage(page - 1)
    }
  }

return (
  <form onSubmit={onSubmit} className='mb-3'>
      {page == 1 &&
      <>
      <div className={`input-wrapper flex-col ${!validEmail ? 'red-wrapper':""}`}>
          <input type="text" 
              name = "email"
              onChange = {handelChange}
              value = {data.email}
              id="email"
              className='input'
              required
          />
          <label htmlFor="email" className="label"
          >Email*</label>
          {!validEmail && <span className='text-center m-auto flex items-center justify-center text-red-600 w-full'>Invalid Email</span>}

      </div>
      
      <div className='input-wrapper'>
          <input type={showPassword? "text" : "password"} 
              onChange = {handelChange}
              value = {data.password}
              id="password"
              className='input'
              name =  'password'
              required
          />
          <label htmlFor="password" className="label"
          >Password*</label>
          {data.password && 
          <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className='show button'
          >
              {showPassword ? <EyeOff style={{width:'22px'}}/> : <Eye style={{width:'22px'}}/>}
          </button>
          }          
      </div>
      {!Object.values(validations).every(Boolean) ?
      <>
      {data.password && 
      <ul className='alert-container'>
      <li className={validations.length ? "true" : "false"}>Must be at least 8 characters long</li>
      <li className={validations.uppercase ? "true" : "false"}>Includes at least one uppercase</li>
      <li className={validations.lowercase ? "true" : "false"}>Includes at least one lowercase</li>
      <li className={validations.number ? "true" : "false"}>Contains numbers</li>
      <li className={validations.special ? "true" : "false"}>special characters</li>
      </ul>} </>
      :
      <div className='input-wrapper'>
        <input type={showPassword? "text" : "password"}
            onChange = {confirmPassword}
            value = {confirmationPassword}
            id="confirmPassword"
            className='input'
            name = 'confirmpassword'
            required
        />
        <label htmlFor="confirmPassword" className="label"
        >Confirm Password*</label>
        {confirmationPassword && 
        <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className='show button'
        >
            {showPassword ? <EyeOff style={{width:'22px'}}/> : <Eye style={{width:'22px'}}/>}
        </button>
        }
        {
        data.password != confirmationPassword && confirmationPassword ?
        <span className='red'>passwords must be matched</span>:<></>
        }
      </div>
      }
      <button className={data.password && data.email && data.password == confirmationPassword ? 'mt-2 cursor-pointer bg-black text-white rounded-sm text-[18px] p-6 pt-[11px] pb-[11px] w-30 transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black' : 'mt-2 cursor-not-allowed bg-[#ddd] text-[#888] rounded-sm text-[18px] p-6 pt-[11px] pb-[11px]  w-30 border-2 border-[#ccc]'} onClick={nextPage}>
        Continue
      </button>
      </>
    || page ==2 &&
    <>
    
    <div className='input-wrapper'>
          <input type="text" 
              onChange = {handelChange}
              value = {data.firstname}
              id="firstname"
              className='input'
              name = 'firstname'
              required
          />
          <label htmlFor="firstname" className="label"
          >First Name*</label>
      </div>
      
      <div className='input-wrapper'>
          <input type="input" 
              onChange = {handelChange}
              value = {data.lastname}
              id="lastname"
              className='input'
              name = 'lastname'
              required
          />
          <label htmlFor="lastname" className="label"
          >Last Name*</label>
          
      </div>
      <div className='input-wrapper'>
          <input type="text" 
              onChange = {handelChange}
              value = {data.phone}
              id="phone"
              className='input'
              name = 'phone'
              required
          />
          <label htmlFor="phone" className="label"
          >Phone Number*</label>
      </div>
      <div className='mt-3 flex flex-col gap-2 items-center justify-items-center max'>
        <button className={data.firstname && data.lastname && data.phone ? 'cursor-pointer bg-black text-white rounded-sm text-[17px] p-3 w-max transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black w-max' : 'w-max cursor-not-allowed bg-[#ddd] text-[#888] rounded-sm text-[16px] p-3 w-max border-2 border-[#ccc]'} type='submit'>
        Create Account
        </button>
        <button className='cursor-pointer bg-[#f5f5f5] text-[#262626] rounded-sm text-[19px] p-5 pt-2 pb-2 w-35 border border-[#ccc] transition-transform duration-300 hover:scale-105 hover:bg-[#e0e0e0] hover:border-[#bbb]' onClick={prevPage}>
          Back
        </button>
      </div>
      
    </>
    }
    {response &&
      <div className={`mt-3 text-[18px] whitespace-pre-line ${
        code == 201 ? 'text-green-500' : 'text-red-500'
      }`}>{response}</div>
    } 
  </form>
)
}


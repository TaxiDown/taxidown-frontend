// components/Footer.js
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white px-8 py-12 md:h-120 flex flex-col justify-end gap-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-12 gap-5">
        <div className='text-center'>
          <div className='w-[30vw] text-[45px] font-medium min-w-max w-full'>TaxiDown</div>
          <p className='w-2/3 md:w-full m-auto'>Committed to safe, reliable, and professional transportation services tailored to your needs.</p>
        </div>
        <div className='flex md:justify-end md:w-[50vw] md:gap-30 gap-10 justify-center'> 
            <div className='flex flex-col md:text-[25px] text-[20px] font-semibold text-center'>
                Navigations
                <Link href='home' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Home</Link>   
                <Link href='/' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Contact us</Link>        
                <Link href='/en/login' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Login</Link> 
            </div>
            <div className='flex flex-col md:text-[25px] text-[20px] font-semibold text-center'>
                Navigations
                <Link href='home' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Home</Link>   
                <Link href='/' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Contact us</Link>        
                <Link href='/login' className='text-yellow-1000 md:text-[18px] text-[15px] hover:text-yellow-600 hover:scale-105'>Login</Link> 
            </div>
          </div>
        </div>

      <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2025 ALL RIGHTS RESERVED</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#">PRIVACY POLICY</a>
          <a href="#">DISCLAIMER</a>
          <a href="#">TERMS OF USE</a>
        </div>
      </div>
    </footer>
  );
}

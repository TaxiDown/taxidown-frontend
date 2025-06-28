import React from 'react'
import Navbar from './nav'
import Footer from './footer'
import Pickup from './pickup'



export default function Home() {
 
  return (
    <div className=' w-[100vw]'>
        <Navbar />
        <Pickup/>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-[50px] truculenta font-medium m-6 mt-8'>Our features</h1>
            <div className='pt-8 p-20 grid lg:grid-cols-2 gap-10'>
                <div className='w-[500px]'>
                    <h1 className='text-[30px]'>Lorem Ipsum</h1>
                    <div className='text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
                </div>
                <div className='w-[500px]'>
                    <h1 className='text-[30px]'>Lorem Ipsum</h1>
                    <div className='text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
                </div>
                <div className='w-[500px]'>
                    <h1 className='text-[30px]'>Lorem Ipsum</h1>
                    <div className='text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
                </div>
                <div className='w-[500px]'>
                    <h1 className='text-[30px]'>Lorem Ipsum</h1>
                    <div className='text-[20px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

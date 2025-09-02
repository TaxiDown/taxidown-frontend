'use client'
import React, { useEffect, useState } from 'react'
import Fleet from './fleet';

export default function GetFleets() {
    const [fleets, setFleets] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch(`/api/get_fleets`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            if(response.ok){
                const data = await response.json();
                setFleets(data);
            }
        }
        fetchData();
    },[])
  return (
    <>
    {Array.isArray(fleets) && fleets &&
    <div className='text-white bg-[url(/car2.png)] h-[50vh] bg-cover bg-center w-full relative flex flex-col items-center justify-center pt-20 min-h-max'>
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <div className="z-10 flex flex-col items-center">
            <h1 className='text-[45px] text-white font-bold'>Our Fleet</h1>     
            <div className="py-10 px-4">        
                <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
                    {fleets.map((fleet) => (
                        <Fleet key={fleet.id} image={fleet.image_path} title={fleet.name_category} />
                    ))}
                </div>
            </div>
        </div>
    </div>
    }
    </>

  )
}

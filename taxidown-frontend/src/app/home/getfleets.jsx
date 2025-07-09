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
                credentials: 'include',
            })
            if(response.ok){
                const data = await response.json();
                setFleets(data);
            }
        }
        fetchData();
    },[])
  return (
    <div className='text-white text-center'>
        {fleets.map((fleet)=>{
            return <Fleet key={fleet.id} image={fleet.image_path} title={fleet.name_category}/>
        })}
    </div>
  )
}

'use server'
import React from 'react'
import Fleet from '../home/fleet';

export default async function GetFleets() {
    const response = await fetch(`http://127.0.0.1:8000/api/vehicles/vehicle-categories/`, {
        credentials: 'include',
        method: 'GET',
        headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        
      });
    const fleets = await response.json();
    console.log(response)
    if (response.status != 200)
        return
    return (
        <div>
            {
                fleets.map((viecle)=>(
                    <Fleet title={viecle.name_category} key={viecle.id} image={viecle.image_path}/>
                ))
            }
        </div>
    )
}

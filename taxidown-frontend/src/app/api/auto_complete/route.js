'use server'
import {NextResponse} from 'next/server'

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const pickup = searchParams.get('pickup');
    const dropoff = searchParams.get('dropoff');
    const field = searchParams.get('field');
    const ride = searchParams.get('ride_type');
    let status = null;

    try{
        const response = await fetch(`${process.env.API_URL}/api/vehicles/locations/autocomplete/?pickup=${pickup}&dropoff=${dropoff}&field=${field}&ride_type=${ride}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        })
        status = response.status
        const locations =  await response.json();
        console.log(locations)
        if(response.status==200){
            const res = NextResponse.json(locations);
            return res
    }}catch(err){
        return NextResponse.json({ message: `Error ${err}` })
    }
}

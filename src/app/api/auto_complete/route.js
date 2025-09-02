'use server'
import {NextResponse} from 'next/server'

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('searchQuery');
    const dropoff = searchParams.get('dropoff');
    const field = searchParams.get('field');
    const ride = searchParams.get('ride_type');
    let status = null;

    try{
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=5&country=ES`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        })
        status = response.status
        const locations =  await response.json();
        if(response.status==200){
            const res = NextResponse.json(locations.features);
            return res
    }}catch(err){
        return NextResponse.json({ message: `Error ${err}` })
    }
}

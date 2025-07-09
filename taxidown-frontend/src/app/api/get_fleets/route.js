'use server';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const access = cookieStore.get('access')?.value;
    const refresh = cookieStore.get('refresh')?.value;
    const cookieHeader = `${access && `access=${access};`} refresh=${refresh}`;
    let status = null;
    
    try{
        const response = await fetch(`${process.env.API_URL}api/vehicles/vehicle-categories/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieHeader,
            },
        });
        status = response.status
        const fleets =  await response.json();
        
        if(response.status==200){
            const cookieHeader = response.headers.get('Set-Cookie')
            const res = NextResponse.json(fleets);
            res.headers.set('Set-Cookie', cookieHeader)
            return res
        }


    }catch(err){
        return NextResponse.json({ message: `Error ${err}` }, { status: status })
    }
}

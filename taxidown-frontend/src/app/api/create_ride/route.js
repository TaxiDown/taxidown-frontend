'use server'
import {NextResponse} from 'next/server'
import { cookies } from "next/headers";

export async function POST(request) {
    const body = await request.json();
    const cookieStore = await cookies();
    const access = cookieStore.get('access')?.value;
    const refresh = cookieStore.get('refresh')?.value;
    const cookieHeader = `${access && `access=${access};`} refresh=${refresh}`;
    let status = null;

    try{
        const response = await fetch(`${process.env.API_URL}/api/trips/bookings/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
            },
            body: JSON.stringify(body),
        });
        status = response.status
        return NextResponse.json({ message: status} , {status: status})
    }catch(err){
            return NextResponse.json({ message: err }, { status: status })
    }
}

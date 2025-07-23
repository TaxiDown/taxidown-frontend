'use server';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { RefreshAccessToken } from '@/app/actions/validate_token';

export async function POST(request) {
    const body = await request.json();
    let status = null;
    
    try{
        const res = await fetch(`${process.env.API_URL}api/trips/bookings/get-pricing/`,{
            cache: "no-store",
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
            'Content-Type': 'application/json',
            },
        });
        status = res.status
        if (res.status==200){
            const response = NextResponse.json(res.results);
            return response
        }else 
            return NextResponse.json({ message: 'error' }, { status: status })
    }catch(err){
        return NextResponse.json({ message: err }, { status: status })
    }    
}

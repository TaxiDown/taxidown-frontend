'use server';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { RefreshAccessToken } from '@/app/actions/validate_token';

export async function GET() {
    const cookieStore = await cookies();
    let access = cookieStore.get('access')?.value;
    const refresh = cookieStore.get('refresh')?.value;
    let cookieHeader = `${access && `access=${access};`} refresh=${refresh}`;
    let status = null;

    if (!access && refresh) {
        const result = await RefreshAccessToken(refresh);
        access = result.access;
        status = result.status;
    
        if (status === 200 && access) {
          cookieHeader = `access=${access}; refresh=${refresh}`;
        } else {
          return NextResponse.json({ message: 'Unauthorized' }, { status : 401 });
        }
    }
    try{
        const response = await fetch(`${process.env.API_URL}/api/trips/rides/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieHeader,
            },
        });
        status = response.status
        const rides =  await response.json();
        
        if(response.status==200){
            const res = NextResponse.json(rides.results);
            res.headers.set('Set-Cookie', cookieHeader)
            return res
        }else{
            return NextResponse.json({ status: status })
        }
    }catch(err){
        return NextResponse.json({ message: `Error ${err}` }, { status: status })
    }

}

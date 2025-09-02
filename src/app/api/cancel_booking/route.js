'use server'
import {NextResponse} from 'next/server'
import { cookies } from "next/headers";
import { RefreshAccessToken } from '@/app/actions/validate_token';

export async function POST(request) {
    const body = await request.json();
    const cookieStore = await cookies();
    let access = cookieStore.get('access')?.value;
    let refresh = cookieStore.get('refresh')?.value;
    let cookieHeader = `${access && `access=${access};`} refresh=${refresh}`;

    if (!access && refresh) {
        const result = await RefreshAccessToken(refresh);
        access = result.access;
        refresh = result.refresh;
    
        if (result.status === 200 && access) {
          cookieHeader = result.setCookie;
        } else {
          return NextResponse.json({ message: 'Unauthorized' }, { status : 401 });
        }
    }if(access){
        try{
            const response = await fetch(`${process.env.API_URL}/api/trips/rides/${body.id}/cancel/`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Cookie': cookieHeader,
                },
                body: JSON.stringify(body),
            });
            if(response.ok){
                const res = NextResponse.json({status : 200 });
                res.headers.set('Set-Cookie', cookieHeader)
                return res
            }
            return NextResponse.json({status: response.status})
        }catch(err){
                return NextResponse.json({ message: err }, { status: response.status })
        }
    }else{
        return NextResponse.json({ message: 'Unauthorized' }, { status : 401 });
    }
}

'use server';
import { RefreshAccessToken } from "@/app/actions/validate_token";
import { cookies, headers  } from "next/headers";
import { NextResponse } from 'next/server';

export async function POST(){
  const cookieStore = await cookies();
  let access = cookieStore.get('access')?.value;
  const refresh = cookieStore.get('refresh')?.value;
  let cookieHeader = `token=${access}`;
  let status = null;

  if(access){
    try{
      const res = await fetch(`${process.env.API_URL}/api/auth/token/verify/`, {
        cache: "no-store",
        method: 'POST',
        body: JSON.stringify(cookieHeader),
        headers: {
        'Content-Type': 'application/json',
        },
      });
      console.log(res);
      status = res.status
      if (res.status==200){
        const response = NextResponse.json({ message: 'valid Token' , status : '200'});
        return response
      }else 
          return NextResponse.json({status : status});
    }
    catch (err) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: status })
    }
  }else if(!access && refresh){
    const result = await RefreshAccessToken(refresh);
    access = result.access;
    status = result.status;
    if (status === 200 && access) {
      cookieHeader = `access=${access}; refresh=${refresh}`;
      const res = NextResponse.json({status : 200 });
      res.headers.set('Set-Cookie', cookieHeader)
      return res
    }else {
      return NextResponse.json({ message: 'Unauthorized' }, { status });
    }
  }else 
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}
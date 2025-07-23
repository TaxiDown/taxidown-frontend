'use server'
import {NextResponse} from 'next/server'


export async function POST(request) {
    const body = await request.json();
    let status = null;
  try{
    const response = await fetch(`http://127.0.0.1:8000/api/auth/password/reset/confirm`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(body),
    });
    status = response.status
    return NextResponse.json({ message: status} , {status: status})

  }catch(err){
        return NextResponse.json({ message: err }, { status: status })
  }
}

'use server';
import { cookies } from "next/headers";

export default async function Login({email, password}) {
    const cookiesStore = await cookies();
    
    try{
      const res = await fetch(`http://127.0.0.1:8000/api/auth/login/?name='rest_login'/`, {
        method: 'POST',
        body: JSON.stringify({
            'email': email,
            'password': password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
      });
      if (res.status=='200'){
        const response = res.json()
        const accessToken = response.access
        const refreshToken = response.refresh

        cookiesStore.set({
            name: "access-token", 
            value: accessToken,
            httpOnly: true, 
            path: "/", 
            maxAge: 60 * 15,
            secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
            sameSite: "strict", // Recommended for CSRF protection
          });

          cookiesStore.set({
            name: 'refresh-token',
            value: refreshToken,
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
          });
      }
      return res.status
    }
    catch (err) {
        return res.status
    }
  }
  
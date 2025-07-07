'use client'
import React, { useEffect } from 'react'

export default function Pick() {


 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/login/`, {
        method: 'POST',
        body: JSON.stringify({
          email: "momo@gmail.com",
          password: "b7brawda",
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Needed if backend uses cookies
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  fetchData(); // Call the async function
}, []);
    
  return (
    <div>
        
    </div>
  )
}

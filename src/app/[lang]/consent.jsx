"use client"

import { useState, useEffect } from "react"

export default function Consent() {
  const [hasCookie, setHasCookie] = useState(true)

  useEffect(() => {
    setHasCookie(document.cookie.includes("consent=true"))
  }, [])

  const acceptCookie = () => {
    document.cookie = "consent=true; path=/; max-age=31536000"
    setHasCookie(true)
  }

  if (hasCookie) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-8 bg-gray-100">
    <span className="text-dark text-base mr-16">
        This website uses cookies to improve user experience. By using our
        website you consent to all cookies in accordance with our Cookie
        Policy.
    </span>
    <button
        className="bg-green-500 py-2 px-8 rounded text-white"
        onClick={acceptCookie}
    >
        Accept
    </button>
    </div>
  )
}

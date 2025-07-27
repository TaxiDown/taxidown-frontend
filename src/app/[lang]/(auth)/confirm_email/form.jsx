'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ConfirmClient({ lang, dict }) {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get('key');

  useEffect(() => {
    const onSubmit = async () => {
      const response = await fetch('/api/confirm_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });
      setStatus(response.status.toString());
    };
    setIsLoading(false)
    if (key) onSubmit();
  }, [key]);

  const handleRedirect = () => {
    router.push(`/${lang}/login`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin"></div>
          <p className="text-black font-lg text-3xl">Loading ...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full p-12">
        <div className="flex items-center justify-center mb-5">
          <h1
            className={`text-3xl font-bold ${
              status === '200' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status === '200' ? dict.emailConfirmed : dict.invalidLink}
          </h1>
          {status === '200' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-2 mb-0 h-10 w-10 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        <p className="text-gray-700 text-xl whitespace-pre-line font-lg">
          {status === '200'
            ? dict.confirmed
            : dict.invalid}
        </p>

        {status === '200' && (
          <button
            onClick={handleRedirect}
            className="mt-5 px-5 py-3 bg-black text-lg text-white rounded transition-transform duration-300 hover:scale-103 hover:bg-white hover:border-2 hover:border-black hover:text-black cursor-pointer"
          >
            {dict.goLogin}
          </button>
        )}
      </div>
    </div>
  );
}

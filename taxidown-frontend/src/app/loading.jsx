import React from 'react'

export default function Loading() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-xl w-[50vw] h-[50vh] text-center">
          {/* Spinner animation */}
          <div className="relative flex items-center justify-center mb-6">
            {/* Outer circle for the spinner track */}
            <div className="w-18 h-18 rounded-full border-4 border-gray-200"></div>
            {/* Inner spinning circle */}
            <div className="absolute w-18 h-18 rounded-full border-4 border-yellow-600 border-t-transparent animate-spin"></div>
          </div>
          {/* Loading message */}
          <h2 className="text-4xl font-semibold text-gray-800 mb-2">Loading ...</h2>
        </div>
    </div>
  );
}

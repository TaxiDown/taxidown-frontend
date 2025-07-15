// components/SuccessModal.jsx
export default function SuccessModal({ show }) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center bg-black/50 h-[650px] w-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
          <h2 className="text-green-600 text-xl font-semibold mb-2">Ride Created Successfully!</h2>
          <p className="text-gray-600">Your ride was created and is now active.</p>
        </div>
      </div>
    );
  }
  
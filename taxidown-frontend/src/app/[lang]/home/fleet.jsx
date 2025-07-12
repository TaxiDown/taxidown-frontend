// components/Fleet.js
export default function Fleet({ image, title }) {
  const fallbackImage = "https://placehold.co/600x400/000000/FFFFFF/png"; // Place this image in the public/ folder

  return (
    <div className="w-[280px] rounded-xl shadow hover:scale-105 transition duration-300 bg-white/20 backdrop-blur-md text-white">
      {/*<img
        src={image || fallbackImage}
        onError={(e) => (e.target.src = fallbackImage)}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
      />*/}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </div>
  );
}

// components/Fleet.js
export default function Fleet({ image, title }) {
  const fallbackImage = "https://placehold.co/600x400/000000/FFFFFF/png"; // Place this image in the public/ folder

  return (
    <div className="w-[230px] rounded-2xl shadow hover:scale-105 transition duration-300 bg-white/20 backdrop-blur-md text-white flex justify-center items-center gap-2">
      {/*<img
        src={image || fallbackImage}
        onError={(e) => (e.target.src = fallbackImage)}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
      />*/}
        {image && (
          <div className="w-15 h-15 flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain rounded"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
  );
}

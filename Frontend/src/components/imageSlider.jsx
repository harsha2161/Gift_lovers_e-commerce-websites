import { useState } from "react";

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length == 0) 
  return null;

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Main Image Container */}
      <div className="w-full aspect-square md:aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden shadow-lg relative group h-[350px]">
        
        <img src={images[currentIndex]} alt="product main"
        className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"/>
      </div>

      {/* Thumbnails */}
      <div className="w-full flex items-center justify-start md:justify-center gap-3 overflow-x-auto py-2 px-1 scrollbar-hide">
        {images.map((image, index) => (
          
          <button key={index} onClick={() => setCurrentIndex(index)}
          className={`relative flex-shrink-0 w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-2xl overflow-hidden transition-all duration-300 
            ${index === currentIndex
              ? "ring-4 ring-emerald-500 shadow-md scale-105 z-10"
              : "ring-1 ring-gray-200 hover:ring-emerald-300 hover:opacity-90 opacity-70"
              }`}>
            <img src={image} alt={`thumbnail ${index + 1}`} className="w-full h-full object-scale-down"/>
          </button>
        ))}

      </div>
    </div>
  )
}
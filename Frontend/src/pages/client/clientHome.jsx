import axios from "axios";

import { useState, useEffect } from "react";
import ProductsCard from "../../components/ProductsCards";

export default function ClientHomePage() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  
  const slides = [
   "https://cdn.pixabay.com/photo/2021/07/14/18/34/poppy-6466826_1280.jpg",
   "https://pixabay.com/images/download/ha11ok-poppyseed-2557339_1920.jpg",
  ];

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000); 
        return () => clearInterval(timer);

    }, [slides.length]);

  
    useEffect(
        () => {
             if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/").then(
                    (res) =>{
                        console.log(res.data)
                        setProducts(res.data)
                        setIsLoading(false)
                    }    
                )
                }
            }, [isLoading]
       
    )

  return (
    <div className="min-h-screen w-full flex flex-col font-sans">
      
      <div className="relative h-screen w-full overflow-hidden">
        
        {slides.map((slide, index) => (
          <div key={index}className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide}
              alt={`Hero Slide ${index + 1}`}
              className="w-full h-full object-cover opacity-50" 
            />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Show your love with gifts.
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-2xl text-gray-200">
           Discover our beautiful collection of meaningful gifts, lovingly crafted to express your deepest affection.
          </p>
          
          <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 text-lg shadow-lg">
            Shop Now
          </button>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>




      <div className="w-full py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Best Sellers</h2>
            <p className="text-gray-500 text-lg">Our most popular products, loved by customers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 flex justify-center items-center">
              {
                             products.slice(1,5).map(
                              (item) => (
                                <ProductsCard key={item.productId} product={item} />
                                )
                              )
                            }
          </div>

        </div>
      </div>

    </div>
  );
}
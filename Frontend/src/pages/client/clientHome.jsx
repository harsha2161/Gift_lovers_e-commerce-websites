import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsCard from "../../components/ProductsCards";
import { FaShippingFast, FaRegCreditCard, FaGem, } from "react-icons/fa";
import Loading from "../../components/loading";

export default function ClientHomePage() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const slides = [
    "https://i.pinimg.com/736x/c2/23/65/c223652535965ed48a327b027d62b834.jpg",
    "https://i.pinimg.com/736x/e1/70/ee/e170eed6eea3ead73fb39ae4af4ddbfc.jpg",
    "https://i.pinimg.com/736x/e4/a8/8e/e4a88e9224c520a8fd99848c946c1320.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(
      () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {

    if (isLoading) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then(
        (res) => {
          setProducts(res.data)

        }).catch((err) => {
          console.error("Error fetching products", err)

        }).finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gray-50">

      <div className="h-screen w-full overflow-hidden">

        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out 
          ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}>

            <img src={slide} alt={`Hero Slide ${index + 1}`} className="w-full h-full object-cover" />

          </div>
        ))}


        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50 px-4 text-center">
            <span className="text-emerald-300 font-semibold text-sm mb-4">Curated With Care</span>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-xl">Show your love <br /> with perfect gifts.</h1>
          
            <p className="text-lg md:text-2xl mb-10 max-w-2xl text-gray-200 drop-shadow-md">Discover our beautiful collection of meaningful gifts,
            lovingly crafted to express your deepest affection.</p>

            <Link to="/products" className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full hover:scale-105 
            transition-all duration-200 text-lg">
            Shop Now
            </Link>
        </div>


        </div>

      <div className="w-full bg-white py-16 px-6 border-b border-gray-100 relative z-30 -mt-8 rounded-t-[3rem] shadow-bgcolor2 ">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

            <div className="flex flex-col items-center p-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
                  <FaShippingFast size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
                <p className="text-gray-500">Express shipping options to get your gifts delivered exactly when you need them.</p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
                <FaGem size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-500">Every item is handpicked to ensure the highest quality standards for your loved ones.</p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
                <FaRegCreditCard size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-500">Your transactions are encrypted and 100% secure with multiple payment gateways.</p>
            </div>

          </div>
        </div>

      <div className="w-full py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>

              <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">Trending Now</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Best Sellers</h2>
              <p className="text-gray-500 text-lg max-w-xl">Our most popular products, loved by customers around the world. Find out what everyone is buying.</p>

            </div>

            <Link to="/products" className="mt-6 md:mt-0 px-6 py-3 border-2 border-emerald-600 text-emerald-600 
            font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-colors duration-300">
            View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 place-items-center">

            {isLoading ? (

              <div className="absolute">
                <Loading/>
              </div>

            ) : products.length > 0 ? (

              products.slice(0, 4).map((item) => (
                <ProductsCard key={item.productId} product={item} />
              ))
            ) : (
              <div className="col-span-full py-10 text-gray-500">No products available at the moment.</div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductsCard({ product }) {

  const isOutOfStock = product.stoke <= 0

  return (
    <Link to={"/overview/" + product.productId} className="group relative h-[360px] w-full max-w-[260px] bg-white rounded-2xl shadow-sm
    hover:shadow-xl hover:duration-300 mx-auto flex flex-col border border-gray-100">
      
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isOutOfStock ? (
          <span className="bg-error1 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-md">Out of Stock</span>
        ) : (
          <span className="bg-bgcolor2 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-md">
            In Stock
          </span>
        )}
      </div>

      <div className="h-[200px] w-full overflow-hidden bg-gray-50 relative">
        <img  src={product.img[0]} alt={product.productName} 
        className="h-full w-full object-cover transition-transform duration-100 group-hover:scale-110 p-2"/>
      </div>
          
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <h2 className="text-lg font-semibold text-text1">{product.productName}</h2>
        </div>
          
        <div className="flex items-center justify-between border-t border-gray-50 pt-3">
          
          <div className="flex flex-col">
            <span className=" text-text1  font-medium">Price</span>
            <h1 className="text-emerald-600 font-extrabold text-xl">
              Rs. {product.lablePrice}
            </h1>
          </div>

          <button className={`px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm 
          ${isOutOfStock ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
          :"bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md hover:scale-105 active:scale-95"
            }`}
            onClick={(e) => {
              if (isOutOfStock) e.preventDefault();
            }}>

            {isOutOfStock ? "Sold Out" : "Buy Now"}
          </button>
          
        </div>
      </div>
    </Link>
  );
}
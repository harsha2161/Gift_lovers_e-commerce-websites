import { useState } from "react";
import { addCart, getCart, removeFromCart, getTotle } from "../../utils/cart";
import { FaTrashAlt, FaShoppingCart, FaArrowRight, FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function ClientCart() {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Empty State
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] w-full flex flex-col justify-center items-center bg-gray-50 px-4">
        
        <div className="bg-white p-8 rounded-full shadow-sm mb-6">
          <FaShoppingCart className="text-6xl text-gray-300" />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our latest products and find something you love!
        </p>

        <button onClick={() => navigate("/products")}
        className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold 
        hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-lg transition-all">
          <FaArrowLeft />
          Continue Shopping
        </button>
      </div>
    )
  }

  return ( 
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">You have {totalItems} items in your cart</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((item) => (
              <div 
                key={item.productId} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 transition-all hover:shadow-md"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <img 
                    src={item.img} 
                    alt={item.productName} 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                {/* Details & Actions */}
                <div className="flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">
                  
                  {/* Info */}
                  <div className="flex flex-col flex-1">
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-1">
                      {item.productName}
                    </h2>
                    <p className="text-emerald-600 font-bold mb-4">
                      Rs. {item.lablePrice.toLocaleString()}
                    </p>

                    {/* Qty Controls */}
                    <div className="mt-auto flex items-center w-fit bg-gray-50 rounded-full border border-gray-200">
                     
                      <button onClick={() => {addCart(item, -1); setCart(getCart()); }}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-l-full transition-colors">
                        <FaMinus className="text-xs" />
                      </button>

                      <span className="w-10 text-center font-bold text-gray-800">{item.qty}</span>
                      
                      <button onClick={() => {addCart(item, 1); setCart(getCart()); }}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-r-full transition-colors">
                        <FaPlus className="text-xs" />
                      </button>

                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100 w-full sm:w-auto">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Line Total</p>
                      <p className="text-xl font-black text-gray-900">Rs. {(item.qty * item.lablePrice).toLocaleString()}</p>
                    </div>
                    
                    <button 
                      onClick={() => { removeFromCart(item.productId); setCart(getCart());}}
                      className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors mt-0 sm:mt-auto">
                      <FaTrashAlt />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 sticky top-24">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-gray-900">Rs. {getTotle().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span>Shipping Fee</span>
                  <span className="text-emerald-600 font-bold">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-black text-emerald-600">
                    Rs. {getTotle().toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 text-right mt-1">Inclusive of all taxes</p>
              </div>

              <Link  to="/payment" state={{ cart: cart }}className="block w-full">
                <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-xl 
                font-bold text-lg hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                 Proceed to Checkout
                  <FaArrowRight />
                </button>
              </Link>

              <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">

                 <span className="text-xs font-medium flex items-center gap-1">
                   <FaShoppingCart /> Secure Checkout
                 </span>
                 
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

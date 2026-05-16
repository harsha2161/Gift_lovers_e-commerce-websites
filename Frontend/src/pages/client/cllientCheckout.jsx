import { useState } from "react";
import { FaTrashAlt, FaLock, FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaMinus, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCart, removeFromCart, addCart, clearCart, getTotle } from "../../utils/cart.js";

export default function ClientCheckout() {
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    // Get cart data from Product Overview (Buy Now) or fallback to global Cart
    const [cart, setCart] = useState(location.state?.cart || getCart());
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.lablePrice * item.qty), 0);
    }


    function onRemoveItem(index) {
        // Sync with cart.js
        removeFromCart(cart[index].productId);
        // Update loca l state for UI
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
    }

    function changQty(index, delta) {
        const newQty = cart[index].qty + delta;
        if (newQty <= 0) {
            onRemoveItem(index);
        } else {
            // Sync with cart.js
            addCart(cart[index], delta);
            // Update local state for UI
            const newCart = cart.map((item, i) =>
                i === index ? { ...item, qty: newQty } : item
            );
            setCart(newCart);
        }
    }

    async function placeOrder() {

        if (address == "" || number == "") {
            toast.error("Please fill in your shipping details.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to place order.");
            navigate("/login")
            return;
        }

        setIsPlacingOrder(true);
        navigate("/payment", {
            state: {
                cart: cart,
                address: address,
                number: number
            }
        });
    };
    
    return (

        <div className="min-h-screen w-full bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900">Checkout</h1>
                    <p className="text-gray-500 mt-1">Complete your order below</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Shipping & Items */}
                    <div className="flex-1 flex flex-col gap-8">

                        {/* Shipping Form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-emerald-500" />
                                Shipping Information
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FaMapMarkerAlt className="text-gray-400" />
                                        </div>
                                        <input required type="text" placeholder="123 Main St, Apartment 4B" value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                                        text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"/>
                                    </div>

                                </div>

                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FaPhoneAlt className="text-gray-400" />
                                        </div>
                                        <input required type="tel" placeholder="+94 77 123 4567" value={number} onChange={(e) => setNumber(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 
                                        focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"/>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">{cart.length}</span>
                                Order Items
                            </h2>
                            <div className="space-y-4">

                                {cart.map((item, index) => (
                                    <div key={item.productId} className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">

                                        <div className="w-20 h-20 shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100">
                                            <img src={item.img} alt={item.productName} className="w-full h-full object-contain p-1" />
                                        </div>

                                        <div className="flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">

                                            <div className="flex flex-col">
                                                <h3 className="text-md font-bold text-gray-900 line-clamp-1">{item.productName}</h3>
                                                <p className="text-emerald-600 font-bold text-sm">Rs. {item.lablePrice.toLocaleString()}</p>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                                                {/* Qty Controls */}
                                                <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm">
                                                    <button onClick={() => changQty(index, -1)} className="w-8 h-8 flex items-center 
                                                    justify-center text-gray-500 hover:text-emerald-600 rounded-l-full">
                                                        <FaMinus className="text-[10px]" />
                                                    </button>

                                                    <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                                                    <button onClick={() => changQty(index, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-emerald-600 rounded-r-full">
                                                        <FaPlus className="text-[10px]" />
                                                    </button>
                                                </div>

                                                <button onClick={() => onRemoveItem(index)} className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[400px] shrink-0">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 sticky top-24">
                            <h2 className="text-xl font-black text-gray-900 mb-6">Payment Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-gray-600 font-medium text-sm">
                                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)} items)</span>
                                    <span className="text-gray-900">Rs. {calculateTotal().toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between items-center text-gray-600 font-medium text-sm">
                                    <span>Shipping Fee</span>
                                    <span className="text-emerald-600 font-bold">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-gray-200 pt-6 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold text-gray-800">Total</span>
                                    <span className="text-3xl font-black text-emerald-600">
                                        Rs. {calculateTotal().toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 text-right mt-1">Inclusive of all taxes</p>
                            </div>

                            <button onClick={placeOrder} disabled={isPlacingOrder}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${isPlacingOrder
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5"}`}>
                                <FaLock />
                                {isPlacingOrder ? "Processing..." : "Proceed to Payment"}
                            </button>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-gray-500"> By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

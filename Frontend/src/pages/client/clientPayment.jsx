import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaCreditCard, FaCcPaypal, FaMoneyBill } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { clearCart } from "../../utils/cart.js";

export default function ClientPayment() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely extract state with fallbacks to prevent crashes on direct navigation
    const [address] = useState(location.state?.address || "");
    const [number] = useState(location.state?.number || "");
    const [cart] = useState(location.state?.cart || []);

    const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
    const [isPaypal, setIsPaypal] = useState(false);

    // Redirect to cart/products if accessed without state
    useEffect(() => {
        if (!location.state?.cart || location.state.cart.length === 0) {
            toast.error("No items in checkout.");
            navigate("/products");
        }
    }, [location.state, navigate]);

    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.lablePrice * item.qty), 0);
    }

    function validateUserDetails() {
        if (!address || !number) {
            toast.error("Please fill in your shipping details.");
            return false;
        }
        return true;
    }

    // Consolidated order handler
    async function handlePlaceOrder(paymentMethod) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to place an order.");
            navigate("/login");
            return;
        }

        if (!validateUserDetails()) return;

        const isCOD = paymentMethod === "COD";
        isCOD ? setIsCashOnDelivery(true) : setIsPaypal(true);

        const orderInfo = {
            orderProducts: cart.map(item => ({
                productId: item.productId,
                quantity: item.qty
            })),
            phone: number,
            address: address,
            paymentMethod: paymentMethod // Good practice to send this to the backend
        };

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order`, orderInfo, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            clearCart();
            toast.success("Order placed successfully!");
            navigate("/"); 
        } catch (err) {
            console.error(err);
            toast.error("Error placing order. Please try again.");
        } finally {
            isCOD ? setIsCashOnDelivery(false) : setIsPaypal(false);
        }
    }

    // If cart is empty (handling the flash before redirect), return null
    if (cart.length === 0) return null;

    return (
        <div className="min-h-screen w-full bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                        <FaCreditCard className="text-emerald-500" /> Payment
                    </h1>
                    <p className="text-gray-500 mt-1">Review your details and place the final order</p>
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
                                        <input disabled type="text" placeholder={address} 
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                                        text-gray-800 outline-none"/>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FaPhoneAlt className="text-gray-400" />
                                        </div>
                                        <input disabled type="tel" placeholder={number} 
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                                        text-gray-800 outline-none"/>
                                    </div>
                                    
                                    <button className="mt-5 p-2 bg-emerald-600 text-white rounded-2xl pl-4 pr-4 font-bold hover:bg-emerald-700 transition-colors"
                                    onClick={() => navigate("/checkout")}>Back to Edit</button>
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
                                {cart.map((item) => (
                                    <div key={item.productId} className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                                        <div className="w-20 h-20 shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100">
                                            <img src={item.img} alt={item.productName} className="w-full h-full object-contain p-1" />
                                        </div>
                                        <div className="flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">
                                            <div className="flex flex-col">
                                                <h3 className="text-md font-bold text-gray-900 line-clamp-1">{item.productName}</h3>
                                                <p className="text-emerald-600 font-bold text-sm">Rs. {item.lablePrice.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <h1 className="font-bold text-gray-700">Qty: {item.qty}</h1>
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

                            <div className="flex flex-col gap-3">
                                <button onClick={() => handlePlaceOrder("PAYPAL")} disabled={isPaypal || isCashOnDelivery}
                                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${isPaypal
                                        ? "bg-gray-400 text-white cursor-not-allowed"
                                        : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5"}`}>
                                    <FaCcPaypal className="text-2xl"/>
                                    {isPaypal ? "Processing..." : "Place Order With PayPal"}
                                </button>

                                <button onClick={() => handlePlaceOrder("COD")} disabled={isCashOnDelivery || isPaypal}
                                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${isCashOnDelivery
                                        ? "bg-gray-400 text-white cursor-not-allowed"
                                        : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5"}`}>
                                    <FaMoneyBill className="text-2xl" />
                                    {isCashOnDelivery ? "Processing..." : "Cash on Delivery"}
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-gray-500">By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
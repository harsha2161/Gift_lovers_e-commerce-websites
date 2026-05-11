import { useState } from "react";
import { FaShoppingCart, FaUserCircle, FaHeart, FaGift } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // MOCK STATE
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [cartCount, setCartCount] = useState(3); 

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
  };

  return (
    <header className="w-full shadow-md bg-white relative z-40 font-sans">
      
      {/* ================= TOP ACCENT BAR ================= */}
      <div className="bg-gray-800 text-white text-xs md:text-sm w-full py-2 px-4 flex flex-col md:flex-row justify-between items-center text-center">
        <p className="flex items-center gap-2 font-medium tracking-wide uppercase">
          Free shipping on orders over $50!
        </p>
        <p className="hidden md:block opacity-90">Need help? Call us: 0765837107</p>
      </div>

      {/* ================= MAIN HEADER CONTENT ================= */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-[85px]">
        
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <GiHamburgerMenu
            className="text-3xl text-gray-800 cursor-pointer hover:text-green-600 transition-colors"
            onClick={() => setIsDrawerOpen(true)}
          />
        </div>

        {/* Logo */}
        <div 
          className="flex justify-center md:justify-start flex-1 md:flex-none cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2 group-hover:scale-105 transition-transform">
            Gift<span className="text-green-600">Lovers</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to={"/"} className="font-semibold text-gray-700 hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link to={"/products"} className="font-semibold text-gray-700 hover:text-green-600 transition-colors">
            Products
          </Link>
          <Link to={"/search"} className="font-semibold text-gray-700 hover:text-green-600 transition-colors">
            Search
          </Link>
          <Link to={"/contacts"} className="font-semibold text-gray-700 hover:text-green-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          
          <Link to="/cart" className="relative text-gray-800 hover:text-green-600 transition-colors flex items-center">
            <FaShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4 border-l pl-4 border-gray-200">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium transition-colors">
                  <FaUserCircle className="text-2xl text-green-500" />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-400 hover:text-red-600 font-medium transition-colors"
                >
                  <IoLogOutOutline className="text-2xl" />
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold transition-colors shadow-sm">
                <IoLogInOutline className="text-xl" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE SIDE DRAWER ================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          <div className="relative w-[80%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col">
            
            {/* Drawer Header */}
            <div className="w-full h-[85px] border-b border-green-100 flex justify-between items-center px-6 bg-green-50">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                Gift<span className="text-green-600">Lovers</span>
              </h2>
              <IoMdClose
                className="text-3xl text-gray-800 cursor-pointer hover:text-green-600 transition-colors bg-white p-1 rounded-full shadow-sm"
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>

            {/* Drawer Links */}
            <nav className="flex flex-col flex-1 py-4 px-6 gap-2 overflow-y-auto">
              <Link to="/" onClick={() => setIsDrawerOpen(false)} className="text-[18px] font-bold py-4 border-b border-gray-100 text-gray-700 hover:text-green-600">
                Home
              </Link>
              <Link to="/occasions" onClick={() => setIsDrawerOpen(false)} className="text-[18px] font-bold py-4 border-b border-gray-100 text-gray-700 hover:text-green-600">
                Shop Occasions
              </Link>
              <Link to="/bestsellers" onClick={() => setIsDrawerOpen(false)} className="text-[18px] font-bold py-4 border-b border-gray-100 text-gray-700 hover:text-green-600">
                Best Sellers
              </Link>
              <Link to="/contacts" onClick={() => setIsDrawerOpen(false)} className="text-[18px] font-bold py-4 border-b border-gray-100 text-gray-700 hover:text-green-600">
                Contact Us
              </Link>

              {/* Mobile Auth */}
              <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-200">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-4">
                    <Link to="/profile" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-3 text-[18px] font-bold text-gray-800 hover:text-green-600 bg-green-50 p-3 rounded-xl">
                      <FaUserCircle className="text-2xl text-green-500" /> My Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 text-[18px] font-bold text-gray-500 hover:text-red-700 p-3">
                      <IoLogOutOutline className="text-2xl" /> Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsDrawerOpen(false)} className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-full text-[18px] font-bold shadow-md hover:bg-green-700">
                    <IoLogInOutline className="text-2xl" /> Sign In / Register
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}